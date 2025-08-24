"use client"

import { useState, useEffect } from "react"
import swr from "../../lib/swr.jsx"

export default function Activities() {
  const { data: _profile } = swr("/api/util/me")
  const profile = _profile || null
  const [visibleActivities, setVisibleActivities] = useState(3)
  const [hasMore, setHasMore] = useState(false)
  const [now, setNow] = useState(Date.now())
  const [hoveredImage, setHoveredImage] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const gameActivities =
    profile?.activities?.filter(
      (a) => a.name !== "Custom Status" && a.name !== "Spotify" && a.name !== "Visual Studio Code" && a.name !== "Code",
    ) || []

  useEffect(() => {
    setHasMore(gameActivities.length > visibleActivities)
  }, [gameActivities, visibleActivities])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getGameIconUrl = (activity, imageType = "large") => {
    const image = activity?.url?.[`${imageType}_image`] || activity?.assets?.[`${imageType}_image`]
    if (!image) return null

    if (image.startsWith("mp:external/")) {
      return `https://media.discordapp.net/external/${image.replace("mp:external/", "")}`
    } else if (image.startsWith("https://")) {
      return image
    } else if (activity.app_id) {
      return `https://cdn.discordapp.com/app-assets/${activity.app_id}/${image}.png`
    }
    return null
  }

  const getImageTooltip = (activity, imageType = "large") => {
    return activity?.assets?.[`${imageType}_text`] || null
  }

  const formatPlaytime = (startTimestamp) => {
    const seconds = Math.floor((now - startTimestamp) / 1000)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const loadMore = () => {
    setVisibleActivities((prev) => prev + 3)
  }

  const handleMouseEnter = (event, tooltipText, imageType, activityIndex) => {
    if (tooltipText) {
      const rect = event.currentTarget.getBoundingClientRect()
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      })
      setHoveredImage(`${activityIndex}-${imageType}`)
    }
  }

  const handleMouseLeave = () => {
    setHoveredImage(null)
  }

  return (
    <div className="pt-5 pb-10 md:grid grid-cols-3 gap-x-6">
      {/* Tooltip */}
      {hoveredImage && (
        <div
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          {hoveredImage.includes("large")
            ? getImageTooltip(gameActivities[Number.parseInt(hoveredImage.split("-")[0])], "large") ||
              gameActivities[Number.parseInt(hoveredImage.split("-")[0])]?.name
            : getImageTooltip(gameActivities[Number.parseInt(hoveredImage.split("-")[0])], "small") ||
              gameActivities[Number.parseInt(hoveredImage.split("-")[0])]?.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {/* Profile block with scrollable activities */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 p-6 flex flex-col space-y-6 h-[430px] overflow-y-auto custom-scrollbar shadow-2xl">
        <div className="flex items-center space-x-5">
          <div className="relative flex items-center w-[100px] h-[100px]">
            {!profile ? (
              <div className="animate-pulse rounded-full w-full h-full bg-gradient-to-br from-slate-700 to-slate-600" />
            ) : (
              <div className="relative">
                <img
                  className="rounded-full w-full h-full object-cover ring-4 ring-slate-700/50 shadow-xl"
                  src={`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}?size=4096`}
                  alt={profile.username}
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center ring-4 ring-slate-900">
                  <div className="w-full h-full relative flex items-center justify-center">
                    <div className={`animate-ping w-4 h-4 rounded-full discord-${profile.status}`} />
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full discord-${profile.status}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {!profile ? (
            <div className="flex-1 space-y-3">
              <div className="animate-pulse bg-slate-700/50 w-32 h-7 rounded-lg" />
              <div className="animate-pulse bg-slate-700/50 w-24 h-5 rounded-md" />
            </div>
          ) : (
            <div className="flex-1">
              <h1 className="text-left leading-none font-bold text-3xl md:text-xl lg:text-3xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {profile.username}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <h2 className="text-left leading-none font-medium text-xl md:text-lg lg:text-xl text-slate-400">
                  #{profile.discriminator}
                </h2>
                {profile.clan?.tag && profile.clan?.badge && profile.clan?.identity_guild_id && (
                  <span className="inline-flex items-center bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 text-sm px-3 py-1.5 rounded-full space-x-2 border border-indigo-500/30">
                    <img
                      src={`https://cdn.discordapp.com/clan-badges/${profile.clan.identity_guild_id}/${profile.clan.badge}.png?size=32`}
                      alt="Clan Badge"
                      className="w-4 h-4 rounded-sm object-contain"
                    />
                    <span className="font-medium tracking-wide">{profile.clan.tag}</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Activities section */}
        <div className="pt-2 flex-1">
          <div className="mb-4 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
          {gameActivities.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-slate-300 text-lg font-medium">Nothing is currently being played</p>
              <p className="text-sm text-slate-500 mt-2">or the person is offline and not on discord</p>
            </div>
          ) : (
            <div className="space-y-4">
              {gameActivities.slice(0, visibleActivities).map((activity, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-4 p-4 hover:bg-slate-800/50 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  {getGameIconUrl(activity, "large") && (
                    <div className="relative flex-shrink-0">
                      <img
                        src={getGameIconUrl(activity, "large") || "/placeholder.svg"}
                        alt={activity.name}
                        className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-700/50 group-hover:ring-slate-600/50 transition-all duration-300 cursor-pointer"
                        onMouseEnter={(e) =>
                          handleMouseEnter(e, getImageTooltip(activity, "large") || activity.name, "large", index)
                        }
                        onMouseLeave={handleMouseLeave}
                      />
                      {getGameIconUrl(activity, "small") && (
                        <img
                          src={getGameIconUrl(activity, "small") || "/placeholder.svg"}
                          alt="Small icon"
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-900 ring-2 ring-slate-700 cursor-pointer hover:ring-slate-600 transition-all duration-300"
                          onMouseEnter={(e) =>
                            handleMouseEnter(e, getImageTooltip(activity, "small") || activity.name, "small", index)
                          }
                          onMouseLeave={handleMouseLeave}
                        />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-white mb-1 truncate group-hover:text-blue-300 transition-colors">
                      {activity.name}
                    </p>
                    {activity.details && <p className="text-sm text-slate-300 mb-1 truncate">{activity.details}</p>}
                    {activity.state && <p className="text-xs text-slate-400 italic truncate">{activity.state}</p>}
                    {activity.timestamps?.start && (
                      <div className="mt-3 flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{formatPlaytime(activity.timestamps.start)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {hasMore && (
                <button
                  onClick={loadMore}
                  className="w-full py-3 text-sm text-slate-400 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-slate-800/30 rounded-xl group"
                >
                  <span>Mehr anzeigen</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right widgets */}
      <div className="mt-5 md:mt-0 rounded-2xl overflow-hidden col-span-2 w-full h-[430px] relative">
        {!profile ? (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl flex flex-col items-center justify-center space-y-4">
            <div className="animate-pulse h-8 w-8 rounded-lg bg-slate-700/50" />
            <div className="animate-pulse h-6 w-60 rounded-lg bg-slate-700/50" />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col space-y-4">
            <div className="h-[290px] w-full bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-700/30 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold">Now Playing</h3>
              </div>
              <iframe
                src="https://linkgames.de/api/v4/widget/954851027188842526?type=spotify_large&lang=en&theme=dark&align=left&background=0f172a"
                className="w-full h-[130px] rounded-xl"
                allowTransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Spotify Widget"
              />
            </div>
            <div className="h-[290px] w-full bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-2xl border border-blue-700/30 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold">VS Code</h3>
              </div>
              <iframe
                src="https://linkgames.de/api/v4/widget/954851027188842526?type=vsc&lang=en&theme=dark&align=left&background=0f172a"
                className="w-full h-[130px] rounded-xl"
                allowTransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="VS Code Widget"
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #64748b, #475569);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #94a3b8, #64748b);
                }
                .discord-online {
                    background-color: #22c55e;
                }
                .discord-idle {
                    background-color: #eab308;
                }
                .discord-dnd {
                    background-color: #ef4444;
                }
                .discord-offline {
                    background-color: #6b7280;
                }
            `}</style>
    </div>
  )
}
