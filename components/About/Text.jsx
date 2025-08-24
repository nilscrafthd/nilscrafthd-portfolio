"use client"

export default function Text() {
  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute blur-2xl top-0 left-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/5 animate-pulse" />
      <div
        className="absolute blur-2xl bottom-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/5 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 sm:p-8 hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Quote Icon - Centered on mobile, left on desktop */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
              <i className="fas fa-quote-left text-blue-400 text-lg" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <p className="leading-relaxed text-center sm:text-justify tracking-wide text-base sm:text-lg text-slate-200 font-light">
              Hey, I'm{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
                NilsCraftHD
              </span>
              . I love designing and making new stuff and being in Discord with my friends and talking on the phone
              while playing games or having intense conversations. I mostly play{" "}
              <span className="text-emerald-400 font-medium">Minecraft</span> and have a lot of experience in{" "}
              <span className="text-yellow-400 font-medium">JavaScript</span>/
              <span className="text-blue-400 font-medium">NextJS</span>/
              <span className="text-blue-500 font-medium">TypeScript</span>. I hope you know a bit more about me now and
              have a nice day/night! Thanks for reading and good health <span className="text-pink-400">^^</span>
            </p>

            {/* Mobile-friendly skill badges */}
            <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2">
              <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full px-3 py-1.5 text-xs text-yellow-300 font-medium">
                JavaScript
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-300 font-medium">
                NextJS
              </div>
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-400/20 border border-blue-600/30 rounded-full px-3 py-1.5 text-xs text-blue-300 font-medium">
                TypeScript
              </div>
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-full px-3 py-1.5 text-xs text-emerald-300 font-medium">
                Minecraft
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
