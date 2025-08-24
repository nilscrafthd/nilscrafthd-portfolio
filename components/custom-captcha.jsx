"use client"

import { useState, useEffect } from "react"

export default function CustomCaptcha({ onVerify, verified }) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [step, setStep] = useState(0)
  const [challenge, setChallenge] = useState(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [autoVerifyTimer, setAutoVerifyTimer] = useState(null)
  const [captchaAttempt, setCaptchaAttempt] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const challenges = [
    {
      question: "Click the button to verify you're human",
      type: "click",
      answer: "click",
    },
    {
      question: "What is 5 + 7?",
      type: "math",
      answer: "12",
    },
    {
      question: "What is 3 × 4?",
      type: "math",
      answer: "12",
    },
    {
      question: "What is 15 - 8?",
      type: "math",
      answer: "7",
    },
    {
      question: "Type 'human' to continue",
      type: "text",
      answer: "human",
    },
    {
      question: "Type 'verify' to continue",
      type: "text",
      answer: "verify",
    },
    {
      question: "Type 'robot' backwards",
      type: "text",
      answer: "tobor",
    },
    {
      question: "Select the cat emoji",
      type: "emoji",
      options: ["🐶", "🐱", "🐭", "🐹"],
      answer: "🐱",
    },
    {
      question: "Select the heart emoji",
      type: "emoji",
      options: ["💙", "❤️", "🖤", "💚"],
      answer: "❤️",
    },
    {
      question: "Select the star emoji",
      type: "emoji",
      options: ["⭐", "🌟", "✨", "💫"],
      answer: "⭐",
    },
    {
      question: "Select the thumbs up",
      type: "emoji",
      options: ["👍", "👎", "✋", "👌"],
      answer: "👍",
    },
    {
      question: "How many letters are in 'HELLO'?",
      type: "math",
      answer: "5",
    },
    {
      question: "What comes after 9?",
      type: "math",
      answer: "10",
    },
    {
      question: "Type the first letter of the alphabet",
      type: "text",
      answer: "a",
    },
    {
      question: "Type 'yes' if you are human",
      type: "text",
      answer: "yes",
    },
  ]

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if 24 hours have passed and reset if needed
  const checkAndResetCaptchaData = () => {
    if (!isClient) return 0

    const now = Date.now()
    const storedData = localStorage.getItem("captchaData")

    if (storedData) {
      try {
        const { timestamp, attempt } = JSON.parse(storedData)
        const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

        if (now - timestamp > twentyFourHours) {
          // Reset after 24 hours
          localStorage.setItem(
            "captchaData",
            JSON.stringify({
              timestamp: now,
              attempt: 0,
            }),
          )
          return 0
        } else {
          // Return stored attempt if within 24 hours
          return attempt
        }
      } catch (error) {
        // If data is corrupted, reset
        localStorage.setItem(
          "captchaData",
          JSON.stringify({
            timestamp: now,
            attempt: 0,
          }),
        )
        return 0
      }
    } else {
      // First time, create new data
      localStorage.setItem(
        "captchaData",
        JSON.stringify({
          timestamp: now,
          attempt: 0,
        }),
      )
      return 0
    }
  }

  // Update captcha attempt counter
  const updateCaptchaAttempt = (newAttempt) => {
    if (!isClient) return

    const now = Date.now()
    localStorage.setItem(
      "captchaData",
      JSON.stringify({
        timestamp: now,
        attempt: newAttempt,
      }),
    )
  }

  // Get time until reset
  const getTimeUntilReset = () => {
    if (!isClient) return null

    const storedData = localStorage.getItem("captchaData")
    if (storedData) {
      try {
        const { timestamp } = JSON.parse(storedData)
        const twentyFourHours = 24 * 60 * 60 * 1000
        const timeLeft = twentyFourHours - (Date.now() - timestamp)

        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (60 * 60 * 1000))
          const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
          return { hours, minutes }
        }
      } catch (error) {
        return null
      }
    }
    return null
  }

  // Get challenge based on attempt number
  const getChallengeForAttempt = (attemptNumber) => {
    if (attemptNumber === 0) {
      // First attempt: Auto-verify (no challenge needed)
      return null
    } else if (attemptNumber === 1) {
      // Second attempt: Click challenge
      return challenges.find((c) => c.type === "click")
    } else {
      // Third+ attempt: Random puzzle
      const puzzleChallenges = challenges.filter((c) => c.type !== "click")
      return puzzleChallenges[Math.floor(Math.random() * puzzleChallenges.length)]
    }
  }

  useEffect(() => {
    if (!verified && isClient) {
      // Check and get current attempt (with 24h reset logic)
      const currentAttempt = checkAndResetCaptchaData()
      setCaptchaAttempt(currentAttempt)

      if (currentAttempt === 0) {
        // First attempt: Auto-verify after 1-2 seconds
        const timer = setTimeout(
          () => {
            if (!verified) {
              handleAutoVerify()
            }
          },
          Math.random() * 1000 + 1000,
        ) // 1-2 seconds

        setAutoVerifyTimer(timer)
      } else {
        // Second+ attempt: Show challenge
        const selectedChallenge = getChallengeForAttempt(currentAttempt)
        setChallenge(selectedChallenge)
      }
    }

    return () => {
      if (autoVerifyTimer) {
        clearTimeout(autoVerifyTimer)
      }
    }
  }, [verified, isClient])

  const handleAutoVerify = () => {
    setIsVerifying(true)

    setTimeout(() => {
      onVerify(true)
      setStep(2) // Success step
      setIsVerifying(false)

      // Increment attempt counter for next time
      const nextAttempt = captchaAttempt + 1
      updateCaptchaAttempt(nextAttempt)
    }, 800)
  }

  const handleVerify = (answer = userAnswer) => {
    setIsVerifying(true)

    setTimeout(
      () => {
        const isCorrect =
          answer === challenge.answer ||
          (challenge.type === "click" && answer === "click") ||
          (challenge.type === "text" && answer.toLowerCase() === challenge.answer.toLowerCase()) ||
          (challenge.type === "math" && answer.toString() === challenge.answer.toString())

        if (isCorrect) {
          onVerify(true)
          setStep(2) // Success step

          // Increment attempt counter for next time
          const nextAttempt = captchaAttempt + 1
          updateCaptchaAttempt(nextAttempt)
        } else {
          setStep(1) // Retry step
          setUserAnswer("")
        }
        setIsVerifying(false)
      },
      Math.random() * 800 + 400,
    ) // 0.4-1.2 seconds
  }

  const handleRetry = () => {
    setStep(0)
    const newChallenge = getChallengeForAttempt(captchaAttempt)
    setChallenge(newChallenge)
    setUserAnswer("")
  }

  // Show loading state while checking client-side
  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-800/50 border border-gray-600 rounded-xl">
        <div className="flex items-center gap-2 text-white">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-medium">Loading verification...</span>
        </div>
      </div>
    )
  }

  if (verified) {
    const timeUntilReset = getTimeUntilReset()

    return (
      <div className="flex items-center justify-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
        <div className="flex items-center gap-2 text-green-400">
          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div className="flex flex-col">
            <span className="font-medium">
              Verified Human ✨{captchaAttempt === 0 && <span className="text-xs ml-2">(Auto-verified)</span>}
              {captchaAttempt === 1 && <span className="text-xs ml-2">(Click verified)</span>}
              {captchaAttempt >= 2 && <span className="text-xs ml-2">(Puzzle solved)</span>}
            </span>
            {timeUntilReset && (
              <span className="text-xs text-green-300 opacity-75">
                Resets in {timeUntilReset.hours}h {timeUntilReset.minutes}m
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  // First attempt: Auto-verification in progress
  if (captchaAttempt === 0) {
    const timeUntilReset = getTimeUntilReset()

    return (
      <div className="space-y-4 p-4 bg-gray-800/50 border border-gray-600 rounded-xl">
        <div className="flex items-center gap-2 text-white">
          <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-medium">Human Verification</span>
            {timeUntilReset && (
              <span className="text-xs text-gray-400">
                Resets in {timeUntilReset.hours}h {timeUntilReset.minutes}m
              </span>
            )}
          </div>
          <div className="text-xs text-green-400 animate-pulse">First visit - Auto verifying...</div>
        </div>

        <div className="flex items-center justify-center py-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-gray-300 text-sm animate-pulse">Welcome! Automatically verifying you're human...</p>
            <p className="text-xs text-gray-500">This usually takes 1-2 seconds</p>
          </div>
        </div>
      </div>
    )
  }

  // Second+ attempt: Show challenge
  if (!challenge) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const timeUntilReset = getTimeUntilReset()

  return (
    <div className="space-y-4 p-4 bg-gray-800/50 border border-gray-600 rounded-xl">
      <div className="flex items-center gap-2 text-white">
        <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-medium">Human Verification</span>
          {timeUntilReset && (
            <span className="text-xs text-gray-400">
              Resets in {timeUntilReset.hours}h {timeUntilReset.minutes}m
            </span>
          )}
        </div>
        <div className="text-xs text-gray-400">
          {captchaAttempt === 1 ? "2nd visit - Click required" : `Visit #${captchaAttempt + 1} - Puzzle required`}
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm">{challenge.question}</p>

          {challenge.type === "click" && (
            <button
              onClick={() => handleVerify("click")}
              disabled={isVerifying}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  I'm Human
                </>
              )}
            </button>
          )}

          {(challenge.type === "math" || challenge.type === "text") && (
            <div className="space-y-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isVerifying && userAnswer && handleVerify()}
                placeholder="Enter your answer"
                className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleVerify()}
                disabled={isVerifying || !userAnswer}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                {isVerifying ? "Verifying..." : "Submit"}
              </button>
            </div>
          )}

          {challenge.type === "emoji" && (
            <div className="grid grid-cols-4 gap-2">
              {challenge.options.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleVerify(emoji)}
                  disabled={isVerifying}
                  className="aspect-square bg-gray-700 hover:bg-gray-600 rounded-lg text-2xl transition-all duration-300 disabled:opacity-50 hover:scale-110 transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center text-xs">
            <div>
              {captchaAttempt === 1 && (
                <span className="text-blue-400 animate-pulse">Second visit detected - Please click to verify</span>
              )}
              {captchaAttempt >= 2 && (
                <span className="text-orange-400 animate-pulse">
                  Multiple visits detected - Please solve the puzzle
                </span>
              )}
            </div>
            {timeUntilReset && (
              <span className="text-gray-500">
                Difficulty resets in {timeUntilReset.hours}h {timeUntilReset.minutes}m
              </span>
            )}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="text-center space-y-3">
          <div className="text-red-400 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Incorrect answer</span>
          </div>
          <button
            onClick={handleRetry}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 transform"
          >
            Try Again
          </button>
          {timeUntilReset && (
            <p className="text-xs text-gray-500">
              Difficulty resets in {timeUntilReset.hours}h {timeUntilReset.minutes}m
            </p>
          )}
        </div>
      )}
    </div>
  )
}
