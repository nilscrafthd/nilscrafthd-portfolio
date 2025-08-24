"use client"

import { useState, useEffect } from "react"
import swr from "../../lib/swr.jsx"

const texts = [
  { text: "Hello", flag: "us", color: "#3b82f6" },
  { text: "Hallo", flag: "de", color: "#ef4444" },
  { text: "Bonjour", flag: "fr", color: "#8b5cf6" },
  { text: "Hola", flag: "es", color: "#f59e0b" },
  { text: "Ciao", flag: "it", color: "#10b981" },
  { text: "안녕", flag: "kr", color: "#ec4899" }
]

export default function Hero() {
  const { data: _projects } = swr("https://nilscrafthd.github.io/projects.json", 600000)
  let projects = _projects ? _projects : null

  const [isSelected, setIsSelected] = useState(false)
  const [randomOne, setRandomOne] = useState(null)
  const [randomTwo, setRandomTwo] = useState(null)
  const [randomThree, setRandomThree] = useState(null)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  useEffect(() => {
    try {
      if (isSelected || !Array.isArray(projects)) return
      setIsSelected(true)

      for (let i = 0; i < 3; i++) {
        const selected = projects[Math.floor(Math.random() * projects.length)]
        projects = projects.filter((project) => project != selected)

        switch (i) {
          case 0:
            setRandomOne(selected)
            break
          case 1:
            setRandomTwo(selected)
            break
          case 2:
            setRandomThree(selected)
            break
        }
      }
    } catch {}
  }, [projects])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full pb-10 pt-5 sm:pt-0 min-h-[600px]">
      {/* Enhanced Background Elements */}
      <div className="absolute blur-3xl top-[10%] left-[5%] w-60 h-60 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/10 animate-pulse" />
      <div
        className="absolute blur-3xl top-[50%] left-[45%] w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-teal-500/5 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute blur-3xl top-[20%] right-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-orange-500/15 via-red-500/10 to-pink-500/5 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto px-4 flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-12">
        <div className="flex items-center relative z-10">
          <div className="text-center sm:text-right w-full">
            <div className="pb-2 flex items-center justify-center sm:justify-end">
              <div className="mr-2 relative">
                <div className="flex items-center space-x-2">
                  <h1
                    style={{ color: texts[currentTextIndex].color }}
                    className="leading-none text-5xl font-bold transition-all duration-500 transform hover:scale-110"
                  >
                    {texts[currentTextIndex].text}
                  </h1>
                  <div className="relative group cursor-pointer">
                    <img
                      src={`https://flagcdn.com/32x24/${texts[currentTextIndex].flag}.png`}
                      alt={texts[currentTextIndex].flag}
                      className="w-8 h-6 rounded shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              <h1 className="leading-none text-white font-bold text-5xl">there,</h1>
            </div>
            <h1 className="leading-none font-bold text-5xl mb-6">
              <span className="text-white">I'm </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                NilsCraftHD
              </span>
              <span className="text-white">.</span>
            </h1>

            <div className="space-y-4 w-4/5 lg:w-4/5 mx-auto sm:mr-0 sm:ml-auto">
              <p className="text-xl text-slate-300 leading-relaxed">
                Full-Stack Developer from Germany who loves creating innovative solutions.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                I enjoy building web applications, playing Minecraft with friends, and contributing to open source
                projects.
              </p>

              <div className="flex flex-wrap justify-center sm:justify-end gap-4 pt-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-300 font-medium">
                  🚀 Full-Stack Developer
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-4 py-2 text-sm text-green-300 font-medium">
                  🌍 Open Source
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-4 py-2 text-sm text-orange-300 font-medium">
                  ⛏️ Minecraft Enthusiast
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Version - Floating Cards */}
        <div className="hidden sm:block waving relative min-h-[400px] mt-10 md:mt-0">
          <div
            className={
              (!projects || !randomOne ? "animate-pulse" : "") +
              " w-80 h-20 absolute top-[10%] left-[5%] project-box-1 p-4 rounded-2xl perspective-left flex items-center space-x-3 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group"
            }
          >
            {randomOne ? (
              <>
                <img
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-600 group-hover:ring-blue-500/50 transition-all duration-300"
                  src={randomOne.logo || "/placeholder.svg"}
                  alt={randomOne.title}
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <h1 className="text-white text-lg leading-none font-semibold truncate group-hover:text-blue-300 transition-colors">
                    {randomOne.title}
                  </h1>
                  <a
                    href={randomOne.link}
                    target="_blank"
                    className="hover:underline font-medium text-sm text-slate-300 hover:text-blue-400 leading-none flex items-center space-x-1 transition-colors"
                    rel="noreferrer"
                  >
                    <span>Visit</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-slate-700/50" />
                <div className="space-y-2 flex-1">
                  <div className="w-24 h-4 rounded-lg bg-slate-700/50" />
                  <div className="w-16 h-3 rounded-lg bg-slate-700/50" />
                </div>
              </>
            )}
          </div>

          <div
            className={
              (!projects || !randomTwo ? "animate-pulse" : "") +
              " w-80 h-20 absolute top-[55%] left-[-5%] project-box-2 p-4 rounded-2xl perspective-right flex items-center space-x-3 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group"
            }
          >
            {randomTwo ? (
              <>
                <img
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-600 group-hover:ring-purple-500/50 transition-all duration-300"
                  src={randomTwo.logo || "/placeholder.svg"}
                  alt={randomTwo.title}
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <h1 className="text-white text-lg leading-none font-semibold truncate group-hover:text-purple-300 transition-colors">
                    {randomTwo.title}
                  </h1>
                  <a
                    href={randomTwo.link}
                    target="_blank"
                    className="hover:underline font-medium text-sm text-slate-300 hover:text-purple-400 leading-none flex items-center space-x-1 transition-colors"
                    rel="noreferrer"
                  >
                    <span>Visit</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-slate-700/50" />
                <div className="space-y-2 flex-1">
                  <div className="w-24 h-4 rounded-lg bg-slate-700/50" />
                  <div className="w-16 h-3 rounded-lg bg-slate-700/50" />
                </div>
              </>
            )}
          </div>

          <div
            className={
              (!projects || !randomThree ? "animate-pulse" : "") +
              " w-80 h-20 absolute top-[32%] left-[35%] project-box-3 p-4 rounded-2xl perspective-middle flex items-center space-x-3 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 group"
            }
          >
            {randomThree ? (
              <>
                <img
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-600 group-hover:ring-emerald-500/50 transition-all duration-300"
                  src={randomThree.logo || "/placeholder.svg"}
                  alt={randomThree.title}
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <h1 className="text-white text-lg leading-none font-semibold truncate group-hover:text-emerald-300 transition-colors">
                    {randomThree.title}
                  </h1>
                  <a
                    href={randomThree.link}
                    target="_blank"
                    className="hover:underline font-medium text-sm text-slate-300 hover:text-emerald-400 leading-none flex items-center space-x-1 transition-colors"
                    rel="noreferrer"
                  >
                    <span>Visit</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-slate-700/50" />
                <div className="space-y-2 flex-1">
                  <div className="w-24 h-4 rounded-lg bg-slate-700/50" />
                  <div className="w-16 h-3 rounded-lg bg-slate-700/50" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version - Stacked Cards */}
      <div className="sm:hidden mt-12 grid grid-cols-1 gap-4 px-4">
        {[randomOne, randomTwo, randomThree].map((project, index) => (
          <div
            key={index}
            className={
              (!projects || !project ? "animate-pulse" : "") +
              " w-full h-20 p-4 rounded-2xl flex items-center space-x-3 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-slate-700/50 transition-all duration-500"
            }
          >
            {project ? (
              <>
                <img
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-600"
                  src={project.logo || "/placeholder.svg"}
                  alt={project.title}
                />
                <div className="space-y-1 flex-1 min-w-0">
                  <h1 className="text-white text-lg leading-none font-semibold truncate">
                    {project.title}
                  </h1>
                  <a
                    href={project.link}
                    target="_blank"
                    className="hover:underline font-medium text-sm text-slate-300 hover:text-blue-400 leading-none flex items-center space-x-1 transition-colors"
                    rel="noreferrer"
                  >
                    <span>Visit</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-slate-700/50" />
                <div className="space-y-2 flex-1">
                  <div className="w-24 h-4 rounded-lg bg-slate-700/50" />
                  <div className="w-16 h-3 rounded-lg bg-slate-700/50" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <style jsx>
        {`
        @keyframes float1 {
            0% { transform: translateY(0px) rotate(3deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
            100% { transform: translateY(0px) rotate(3deg); }
        }
        
        @keyframes float2 {
            0% { transform: translateY(0px) rotate(-3deg); }
            50% { transform: translateY(-15px) rotate(-3deg); }
            100% { transform: translateY(0px) rotate(-3deg); }
        }
        
        @keyframes float3 {
            0% { transform: translateY(0px) rotate(2deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(2deg); }
        }
        `}
      </style>
    </div>
  )
}
