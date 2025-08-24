"use client"

import { useState } from "react"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

export default function Footer() {
  const [colorIndex, setColorIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const colors = [
    "#ef4444", // red-500
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
  ]

  return (
    <footer className="relative mt-20 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Enhanced Background Elements */}
      <div className="absolute blur-3xl top-[20%] left-[10%] w-60 h-60 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/5 animate-pulse" />
      <div
        className="absolute blur-3xl top-[40%] right-[15%] w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/5 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left mb-12">
          {/* Branding */}
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-60 group-hover:opacity-100 blur-sm transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-1 rounded-full">
                <img
                  src="https://cdn.linkgames.de/assets/a468d01e477d3d01084c04aac1964289.png"
                  alt="Discord Avatar"
                  className="w-12 h-12 rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                NilsCraftHD
              </span>
              <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>

          {/* Heart / Love */}
          <div
            className="flex items-center justify-center gap-2 text-slate-300 font-medium bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-full px-6 py-3 hover:border-purple-500/30 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="text-sm">Made with</span>
            <Tippy content="Klick mich!" theme="dark">
              <i
                className="fas fa-heart cursor-pointer transition-all duration-300"
                style={{
                  color: colors[colorIndex],
                  transform: isHovered ? "scale(1.3)" : "scale(1)",
                  filter: isHovered ? "drop-shadow(0 0 8px currentColor)" : "none",
                }}
                onClick={() => setColorIndex((prev) => (prev + 1) % colors.length)}
              />
            </Tippy>
            <span className="text-sm">in Germany</span>
          </div>

          {/* Socials */}
          <div className="flex items-center justify-center md:justify-end space-x-4">
            {[
              {
                href: "https://github.com/nils-afk",
                icon: "github",
                label: "GitHub",
                hoverColor: "hover:text-purple-400",
                bgGradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "hover:border-purple-500/50",
              },
              {
                href: "https://twitter.com/NilsCraftHD",
                icon: "twitter",
                label: "Twitter",
                hoverColor: "hover:text-blue-400",
                bgGradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "hover:border-blue-500/50",
              },
              {
                href: "https://discord.gg/uJy96gyVjk",
                icon: "discord",
                label: "Discord",
                hoverColor: "hover:text-indigo-400",
                bgGradient: "from-indigo-500/20 to-purple-500/20",
                borderColor: "hover:border-indigo-500/50",
              },
            ].map(({ href, icon, label, hoverColor, bgGradient, borderColor }) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 rounded-xl bg-gradient-to-br ${bgGradient} backdrop-blur-sm border border-slate-700/30 ${borderColor} ${hoverColor} transition-all duration-300 hover:scale-110 hover:shadow-lg transform-gpu`}
                aria-label={label}
              >
                <i
                  className={`fab fa-${icon} text-lg text-slate-400 group-hover:text-current transition-colors duration-300`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-slate-400">Built with</span>
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-slate-900 to-black border border-slate-700 px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1">
                <i className="fab fa-react text-blue-400"></i>
                Next.js
              </span>
              <span className="bg-gradient-to-r from-sky-500 to-sky-600 px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1">
                <i className="fas fa-wind text-white"></i>
                Tailwind CSS
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Passionate about creating innovative web solutions and contributing to the open source community. Always
            learning, always building.
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Big Update Soon...
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Thanks for everything, love you all ♥️
          </p>
        </div>
      </div>
    </footer>
  )
}
