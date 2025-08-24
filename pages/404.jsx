"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    // Glitch effect every 3 seconds
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => {
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <>
      <Head>
        <title>404 - Page Not Found | NilsCraftHD</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* 404 Title with Glitch Effect */}
          <div className="relative">
            <h1
              className={`text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 select-none transition-all duration-200 ${
                glitchActive ? "animate-pulse scale-105" : ""
              }`}
              style={{
                textShadow: glitchActive ? "2px 2px 0px #ff0000, -2px -2px 0px #00ffff" : "none",
                filter: glitchActive ? "hue-rotate(180deg)" : "none",
              }}
            >
              404
            </h1>

            {/* Glitch overlay */}
            {glitchActive && (
              <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500 opacity-30 animate-ping">
                404
              </div>
            )}
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Oops! Page Not Found</h2>
            <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
              The page you're looking for seems to have vanished into the digital void. Don't worry, even the best
              explorers sometimes take a wrong turn.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>

            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 group"
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
              Home Page
            </Link>
          </div>

          {/* Fun Fact */}
          <div className="mt-12 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-blue-300 text-sm">
              🧭 <strong>Looks like you took a wrong turn!</strong> Don't worry, even the best navigators sometimes end
              up in uncharted territory.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
