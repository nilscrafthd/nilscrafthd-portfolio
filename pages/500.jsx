"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"

export default function ServerError() {
  const [errorCode, setErrorCode] = useState("500")
  const [isRetrying, setIsRetrying] = useState(false)
  const [errorDetails, setErrorDetails] = useState({
    errorId: "",
    requestId: "",
    timestamp: "",
  })

  useEffect(() => {
    // Error code animation
    const codes = ["500", "ERR", "5XX", "500"]
    let index = 0
    const interval = setInterval(() => {
      setErrorCode(codes[index % codes.length])
      index++
    }, 2000)

    // Generate error details on client side to avoid hydration mismatch
    setErrorDetails({
      errorId: Math.random().toString(36).substring(2, 15),
      requestId: Math.random().toString(36).substring(2, 15),
      timestamp: new Date().toISOString(),
    })

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleRetry = async () => {
    setIsRetrying(true)
    // Simulate retry delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    window.location.reload()
  }

  const troubleshootingSteps = [
    { icon: "🔄", text: "Try refreshing the page" },
    { icon: "⏰", text: "Wait a few minutes and try again" },
    { icon: "🌐", text: "Check your internet connection" },
    { icon: "📧", text: "Contact support if the problem persists" },
  ]

  return (
    <>
      <Head>
        <title>500 - Server Error | NilsCraftHD</title>
        <meta name="description" content="Internal server error occurred." />
      </Head>

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Error Code with Animation */}
          <div className="relative">
            <h1 className="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 select-none animate-pulse">
              {errorCode}
            </h1>

            {/* Glowing effect */}
            <div className="absolute inset-0 text-8xl md:text-[10rem] font-black text-red-500/20 blur-sm animate-ping">
              {errorCode}
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
              <span className="animate-spin">⚠️</span>
              Server Error
              <span className="animate-spin">⚠️</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
              Our servers are experiencing some technical difficulties. Our team has been notified and is working to fix
              this issue.
            </p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-300 text-sm font-medium">System Status: Degraded</span>
            </div>
            <div className="h-4 w-px bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-300 text-sm font-medium">ETA: ~5 minutes</span>
            </div>
          </div>

          {/* Troubleshooting Steps */}
          <div className="space-y-4">
            <p className="text-gray-500 text-sm uppercase tracking-wider">What you can do</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {troubleshootingSteps.map((step, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:bg-gray-700/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-gray-300 text-sm">{step.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 group"
            >
              {isRetrying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Retrying...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </>
              )}
            </button>

            <Link
              href="/"
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 group"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-6 bg-gray-800/30 border border-gray-700/50 rounded-xl backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-3 flex items-center justify-center gap-2">
              <span>🛠️</span>
              Need Help?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              If this problem continues, please join our Discord server for support and assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://discord.gg/w8ADhqbFWg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord Server
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(`Error 500 - ${errorDetails.timestamp}`)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
              >
                Copy Error ID
              </button>
            </div>
          </div>

          {/* Error Details */}
          <details className="text-left">
            <summary className="text-gray-500 text-sm cursor-pointer hover:text-gray-400 transition-colors">
              Technical Details
            </summary>
            <div className="mt-4 p-4 bg-gray-900/50 border border-gray-700 rounded-lg font-mono text-xs text-gray-400">
              <div>Error ID: {errorDetails.errorId}</div>
              <div>Timestamp: {errorDetails.timestamp}</div>
              <div>Server: web-01</div>
              <div>Request ID: {errorDetails.requestId}</div>
            </div>
          </details>
        </div>
      </div>
    </>
  )
}
