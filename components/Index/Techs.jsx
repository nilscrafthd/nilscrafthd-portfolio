"use client";

import swr from "../../lib/swr.jsx";

export default function Techs() {
  const { data: fetchedTechs } = swr("/api/util/techs");
  const techs = fetchedTechs || null;

  // Namen normalisieren, z. B. "Next.js" -> "nextjs"
  const normalize = (name) => name.toLowerCase().replace(/\s|\.|-/g, "");

  const techLevels = {
    nodejs: 90,
    nextjs: 91,
    tailwindcss: 91,
    javascript: 95,
    typescript: 91,
    react: 75,
    vercel: 85,
    github: 85,
    mongodb: 80,
    git: 80,
    html: 75,
    css: 75,
    bootstrap: 70,
    go: 70,
    vue: 65,
    nuxtjs: 65,
    alpinejs: 60,
    electronjs: 60,
    mysql: 60,
    yarn: 60,
    php: 50,
    sass: 50,
    webpack: 50,
    framermotion: 45,
    fontawesome: 45,
    bulma: 40,
    headlessui: 40,
    iconscout: 35,
    default: 30,
  };

  const highlight = ["javascript", "typescript", "nextjs"];

  return (
    <div className="w-full py-10">
      {/* Hero Section */}
      <div className="relative w-full group mb-8">
        <div className="flex items-center justify-center md:justify-end space-x-6">
          <div className="text-center md:text-right order-2 md:order-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-green-300 bg-clip-text text-transparent group-hover:translate-x-2 transition-transform duration-300">
              TECHNOLOGIES I USE
            </h1>
            <p className="text-slate-400 mt-2">My technical skills and expertise</p>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="w-20 h-20 rounded-2xl shadow-2xl shadow-emerald-500/25 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-400 rounded-full border-4 border-slate-900 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tech Grid */}
      <div className="gap-6 p-5 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {techs
          ? [...techs]
              .sort(
                (a, b) =>
                  (techLevels[normalize(b[0])] ?? techLevels.default) -
                  (techLevels[normalize(a[0])] ?? techLevels.default)
              )
              .map(([name, img], index) => {
                const baseKey = normalize(name);
                const baseWidth = techLevels[baseKey] ?? techLevels.default;
                let width = baseWidth;

                // Kleine Variation für mittlere/schwache Skills
                if (baseWidth < 75) {
                  const variation = ((index % 3) - 1) * 5;
                  width = Math.min(100, Math.max(0, baseWidth + variation));
                }

                const isHighlight = highlight.includes(baseKey);

                return (
                  <div
                    key={index}
                    className={`group bg-gradient-to-br ${
                      isHighlight
                        ? "from-emerald-600/90 to-emerald-500/80 border-emerald-400/60 shadow-emerald-500/30"
                        : "from-slate-900/90 to-slate-800/90 border-slate-700/50"
                    } backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 rounded-2xl p-5 flex items-center space-x-4 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transform-gpu`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={`/img/techs/${img}`}
                        className="h-10 w-10 object-contain transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 drop-shadow-lg rounded-md"
                        alt={name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors duration-300 text-lg truncate block">
                        {name}
                      </span>
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div
                          className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
          : Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-5 flex items-center space-x-4 animate-pulse"
              >
                <div className="w-10 h-10 rounded-md bg-slate-700/60 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 bg-slate-700/50 rounded-lg" />
                  <div className="w-full h-1.5 bg-slate-700/30 rounded-full" />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
