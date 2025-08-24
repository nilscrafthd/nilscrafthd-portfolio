"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Tippy from "@tippyjs/react"

export default function Header() {
  const [isLoading, setIsLoading] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState("/")

  const baseURL = "https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/"
  const emojis = {
    wink: "1f609.png",
    sunglasses: "1f60e.png",
    ghost: "1f47b.png",
    ok: "1f44c.png",
    agent: "1f575.png",
    dove: "1f54a.png",
    bird: "1f426.png",
    wine: "1f37e.png",
    infinity: "267e.png",
  }

  // Loading Screen: nach 1.5s laden auf false setzen
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update current path on mount and route change
  useEffect(() => {
    setCurrentPath(window.location.pathname)

    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handleRouteChange)

    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      originalPushState.apply(history, args)
      handleRouteChange()
    }

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args)
      handleRouteChange()
    }

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  const SocialIcons = ({ className = "" }) => (
    <div className={`flex items-center space-x-2 ${className}`}>
      {[
        {
          href: "https://discord.gg/uJy96gyVjk",
          icon: "discord",
          label: "Discord",
          hoverColor: "hover:text-indigo-400",
          bgGradient: "hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20",
        },
        {
          href: "https://twitter.com/NilsCraftHD",
          icon: "twitter",
          label: "Twitter",
          hoverColor: "hover:text-blue-400",
          bgGradient: "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20",
        },
        {
          href: "https://github.com/nils-afk",
          icon: "github",
          label: "GitHub",
          hoverColor: "hover:text-purple-400",
          bgGradient: "hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20",
        },
      ].map(({ href, icon, label, hoverColor, bgGradient }) => (
        <a
          key={icon}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative p-2 rounded-lg backdrop-blur-sm border border-slate-700/30 ${bgGradient} ${hoverColor} transition-all duration-300 hover:scale-110 hover:shadow-lg transform-gpu`}
          aria-label={label}
        >
          <i
            className={`fab fa-${icon} text-sm text-slate-400 group-hover:text-current transition-colors duration-300`}
          />
        </a>
      ))}
    </div>
  )

  const navItems = [
    { href: "/", label: "Home", icon: "fas fa-home" },
    { href: "/about", label: "About", icon: "fas fa-user" },
    { href: "/projects", label: "Projects", icon: "fas fa-cube" },
    { href: "/contact", label: "Contact", icon: "fas fa-envelope" },
  ]

  // Loading Screen Anzeige
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-[9999]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mx-auto mb-4" />
          <p className="text-slate-300 font-semibold text-lg animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Enhanced Background Blur */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute blur-3xl top-0 left-[20%] w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
        <div
          className="absolute blur-3xl top-0 right-[20%] w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-teal-500/5 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-blue-500/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-6">
            <Link href="/">
              <div
                className={`font-bold transition-all duration-500 cursor-pointer ${
                  isScrolled ? "text-2xl" : "text-3xl sm:text-4xl"
                } bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-pink-500 hover:via-purple-500 hover:to-blue-400 hover:scale-105 transform-gpu`}
                onClick={() => setCurrentPath("/")}
              >
                NilsCraftHD
              </div>
            </Link>

            {/* Desktop Social Icons */}
            <div className="hidden lg:flex">
              <SocialIcons />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {/* Mobile Menu */}
            <div className="block lg:hidden">
              <Menu as="div" className="relative">
                <Menu.Button className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/30 hover:border-purple-500/30 text-slate-300 hover:text-white transition-all duration-300">
                  <i className="fas fa-bars text-sm" />
                  <span className="text-sm font-medium">Menu</span>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95 -translate-y-2"
                  enterTo="transform opacity-100 scale-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100 translate-y-0"
                  leaveTo="transform opacity-0 scale-95 -translate-y-2"
                >
                  <Menu.Items className="absolute right-0 mt-3 w-64 origin-top-right bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-slate-700/50 focus:outline-none overflow-hidden">
                    <div className="p-2">
                      {navItems.map(({ href, label, icon }) => {
                        const isActive = currentPath === href
                        return (
                          <Menu.Item key={href}>
                            {({ active }) => (
                              <Link href={href}>
                                <div
                                  className={`${
                                    isActive
                                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                                      : "text-slate-300 hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/50 border border-transparent"
                                  } group flex w-full items-center px-4 py-3 text-sm rounded-xl transition-all duration-300 cursor-pointer`}
                                  onClick={() => setCurrentPath(href)}
                                >
                                  <i className={`${icon} mr-3 w-5 text-center`} />
                                  {label}
                                  {isActive && (
                                    <div className="ml-auto">
                                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                                    </div>
                                  )}
                                </div>
                              </Link>
                            )}
                          </Menu.Item>
                        )
                      })}

                      {/* Mobile Social Icons */}
                      <div className="mt-4 pt-4 border-t border-slate-700/50">
                        <p className="text-xs text-slate-500 mb-3 px-4">Follow me</p>
                        <div className="px-4">
                          <SocialIcons />
                        </div>
                      </div>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map(({ href, label, icon }) => {
                const isActive = currentPath === href
                return (
                  <Link key={href} href={href}>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer relative ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10"
                          : "text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/50 border border-transparent hover:border-slate-600/30"
                      }`}
                      onClick={() => setCurrentPath(href)}
                    >
                      <i className={`${icon} text-sm`} />
                      <span className="text-sm font-medium">{label}</span>
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className={`${isScrolled ? "h-20" : "h-24"} transition-all duration-500`} />

      {/* Version Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <Transition
          as={Fragment}
          show={isClicked}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-0 -translate-x-10"
          enterTo="transform opacity-100 scale-100 translate-x-0"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 -translate-x-10 scale-0"
        >
          <img
            className="w-6 h-6 absolute -top-8 -left-2 -rotate-12 animate-bounce"
            src={
              baseURL +
              emojis[
                Object.keys(emojis)[
                  Math.floor(Math.random() * Object.keys(emojis).length)
                ]
              ] || "/placeholder.svg"
            }
            alt="Emoji"
          />
        </Transition>

        <Tippy content="Koralle" theme="dark">
          <button
            onClick={() => {
              if (isClicked) return
              setIsClicked(true)
              setTimeout(() => setIsClicked(false), 1500)
            }}
            className="hidden lg:block group relative px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 hover:text-white hover:border-purple-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 focus:outline-none"
          >
            <span className="text-sm">v</span>
            <span className="font-bold">2.6.0</span>
          </button>
        </Tippy>
      </div>

      {/* Scroll to Top */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group p-3 rounded-full bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 focus:outline-none"
        >
          <i className="fas fa-arrow-up text-lg group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
    </>
  )
}
