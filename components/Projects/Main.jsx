"use client"

import { UilTimes, UilSpinnerAlt, UilExternalLinkAlt } from "@iconscout/react-unicons"
import swr from "../../lib/swr.jsx"
import { useEffect } from "react"

export default function Projects() {
  const { data: _projects } = swr("https://nilscrafthd.github.io/projects.json", 600000)
  const projects = _projects ? _projects : null

  // Touch-Events optimieren
  useEffect(() => {
    const preventTouch = (e) => {
      if (e.touches.length > 1) e.preventDefault()
    }

    document.addEventListener("touchmove", preventTouch, { passive: false })
    return () => document.removeEventListener("touchmove", preventTouch)
  }, [])

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      style={{
        touchAction: "manipulation",
        WebkitTouchCallout: "none",
        userSelect: "none",
      }}
    >
      {!projects
        ? // Ladeanimation
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="p-6 h-[260px] rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 overflow-hidden"
            >
              <div className="w-full relative rounded-xl overflow-hidden h-32">
                <div className="animate-pulse w-full h-32 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent rounded-xl" />
              </div>
              <div className="w-full px-3 flex space-x-4 -translate-y-8 items-center">
                <div className="animate-pulse border-4 border-slate-900 w-20 h-20 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/50 shadow-lg" />
                <div className="animate-pulse w-40 h-7 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/50" />
              </div>
              <div className="flex items-center space-y-2 -translate-y-6 justify-between flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse h-4 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-700/50"
                    style={{ width: `${[20, 24, 28, 32][i % 4]}px` }}
                  />
                ))}
              </div>
            </div>
          ))
        : // Projekte anzeigen
          projects.map((project, index) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={project.link}
              key={index}
              className="group p-6 h-[260px] rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 transform-gpu"
              onTouchStart={(e) => e.preventDefault()}
            >
              <div className="w-full relative rounded-xl overflow-hidden h-32">
                <img
                  src={project.image || "/placeholder.svg"}
                  className="absolute inset-0 rounded-xl w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={`${project.title} Banner`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent rounded-xl" />
              </div>
              <div className="w-full px-3 flex space-x-4 -translate-y-8 items-center">
                <img
                  src={project.logo || "/placeholder.svg"}
                  className="border-4 border-slate-900 w-20 h-20 rounded-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl"
                  alt={`${project.title} Logo`}
                />
                <div>
                  <h1 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h1>
                  <div className="flex items-center text-sm text-slate-400 group-hover:text-purple-200 transition-colors">
                    <span>View Project</span>
                    <UilExternalLinkAlt className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
              <p className="text-slate-300 -translate-y-6 opacity-75 group-hover:opacity-100 transition-all line-clamp-2">
                {project.text}
              </p>
            </a>
          ))}
    </div>
  )
}
