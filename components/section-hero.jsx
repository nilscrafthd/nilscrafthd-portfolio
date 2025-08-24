"use client"

export default function SectionHero({ title, description, icon, gradientFrom, gradientTo, shadowColor }) {
  return (
    <div className="relative mb-8 w-full group">
      {/* Background Blur Effect */}
      <div
        className={`absolute blur-2xl top-2 left-2 w-20 h-20 rounded-full bg-gradient-to-br ${gradientFrom}/20 ${gradientTo}/10 animate-pulse`}
      />

      <div className="relative flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/30 hover:border-purple-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10">
        <div
          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-2xl ${shadowColor} bg-gradient-to-bl ${gradientFrom} ${gradientTo} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
        >
          <i className={`${icon} text-xl sm:text-2xl text-white drop-shadow-lg`} />

          {/* Glow Effect */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-bl ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl text-white font-bold mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-500">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light group-hover:text-slate-200 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
