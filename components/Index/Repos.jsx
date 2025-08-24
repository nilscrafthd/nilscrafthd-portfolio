"use client"

import swr from "../../lib/swr.jsx"

export default function Repos() {
  const { data: fetchedRepos } = swr("/api/util/repos", 600000)
  const repos = fetchedRepos ? (Array.isArray(fetchedRepos) ? fetchedRepos.slice(0, 6) : []) : []

  if (fetchedRepos && repos.length < 6) {
    for (let i = 0; i < 6 - repos.length; i++) {
      repos.push(null)
    }
  }

  return (
    <div className="w-full py-10">
      {/* GitHub Header */}
      <div className="relative w-full group mb-8">
        <div className="flex items-center justify-center md:justify-start space-x-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl shadow-2xl shadow-blue-500/25 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent group-hover:translate-x-2 transition-transform duration-300">
              GITHUB REPOS
            </h1>
            <p className="text-slate-400 mt-2">My latest projects and contributions</p>
          </div>
        </div>
      </div>

      {/* Repo Grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(fetchedRepos ? repos : Array.from({ length: 6 })).map((repo, index) =>
          repo ? (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transform transition-all duration-300 flex flex-col rounded-2xl p-6 h-40 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="flex items-start justify-between mb-3">
                <h1 className="leading-tight font-bold text-lg text-white group-hover:text-blue-300 transition-colors duration-300 truncate flex-1 mr-2">
                  {repo.full_name}
                </h1>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>

              <div className="mb-4">
                <span className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-sm px-3 py-1.5 rounded-full border border-blue-500/30 group-hover:border-blue-400/50 transition-colors">
                  {repo.language || "Collaborator"}
                </span>
              </div>

              <div className="w-full mt-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-yellow-300 transition-colors group/star">
                    <svg
                      className="w-4 h-4 text-yellow-400 group-hover/star:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="font-medium">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-purple-300 transition-colors group/fork">
                    <svg
                      className="w-4 h-4 text-purple-400 group-hover/fork:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 h-40 flex flex-col animate-pulse"
            >
              <div className="rounded-lg w-32 h-6 bg-slate-700/50 mb-3" />
              <div className="rounded-full w-20 h-6 bg-slate-700/50 mb-4" />
              <div className="w-full mt-auto flex items-center justify-between">
                <div className="flex space-x-4">
                  <div className="rounded-lg w-12 h-5 bg-slate-700/50" />
                  <div className="rounded-lg w-12 h-5 bg-slate-700/50" />
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
