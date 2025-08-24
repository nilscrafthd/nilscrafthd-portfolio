"use client"

import { useState, useEffect, useRef } from "react"
import CustomCaptcha from "../custom-captcha"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    priority: "normal",
    category: "general",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionCount, setSubmissionCount] = useState(0)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)
  const [raidLimitReached, setRaidLimitReached] = useState(false)

  // Secret/Easter Egg states
  const [secretActive, setSecretActive] = useState(false)
  const [secretClicks, setSecretClicks] = useState(0)
  const [showMatrix, setShowMatrix] = useState(false)
  const [particles, setParticles] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Submit secret states
  const [submitSecretActive, setSubmitSecretActive] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [secretEmoji, setSecretEmoji] = useState("🎉")
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [showCaptcha, setShowCaptcha] = useState(true)

  // Custom dropdown states
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const priorityRef = useRef(null)
  const categoryRef = useRef(null)

  // Raid protection settings
  const RAID_LIMIT = 3 // Max submissions per hour
  const RAID_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
  const MAX_MESSAGE_LENGTH = 2000

  // Check if mobile and setup mouse tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePos({ x: e.clientX, y: e.clientY })
      }
    }

    if (!isMobile) {
      document.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      if (!isMobile) {
        document.addEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isMobile])

  // Check raid limit on component mount
  useEffect(() => {
    checkRaidLimit()
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (priorityRef.current && !priorityRef.current.contains(event.target)) {
        setPriorityDropdownOpen(false)
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Secret Easter Egg Effect
  const triggerSecret = () => {
    if (isMobile) return // No secret on mobile

    setSecretClicks((prev) => prev + 1)

    if (secretClicks >= 9) {
      // 10 clicks (0-9)
      setSecretActive(true)
      setShowMatrix(true)

      // Create particle explosion
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 100,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        size: Math.random() * 8 + 2,
      }))
      setParticles(newParticles)

      // Matrix effect
      setTimeout(() => {
        setShowMatrix(false)
      }, 8000)

      // Reset after animation
      setTimeout(() => {
        setSecretActive(false)
        setParticles([])
        setSecretClicks(0)
      }, 12000)
    }
  }

  // Submit secret - only works after first secret and when first secret effects are done
  const triggerSubmitSecret = () => {
    if (!secretActive || isMobile || showMatrix || particles.length > 0) return

    // Works with any combination now, not just standard
    setSubmitSecretActive(true)

    // Random secret emoji based on selection
    const emojiMap = {
      low: ["🌱", "🍃", "🐢", "💚"],
      normal: ["🎊", "🐱", "🦄", "🎁"],
      high: ["🔥", "⚡", "🚀", "💎"],
      urgent: ["🚨", "💥", "⭐", "🌟"],
    }

    const categoryEmojis = {
      general: ["💬", "🎯", "✨"],
      business: ["💼", "🏆", "💰"],
      support: ["🛠️", "🔧", "⚙️"],
      collaboration: ["🤝", "🎨", "🎭"],
      development: ["💻", "🖥️", "⌨️"],
      design: ["🎨", "🖌️", "🎪"],
      other: ["📋", "🎲", "🎪"],
    }

    const priorityEmojis = emojiMap[formData.priority] || emojiMap.normal
    const catEmojis = categoryEmojis[formData.category] || categoryEmojis.general
    const allEmojis = [...priorityEmojis, ...catEmojis]
    const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)]
    setSecretEmoji(randomEmoji)

    // Create massive confetti explosion
    const newConfetti = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      vx: (Math.random() - 0.5) * 15,
      vy: -(Math.random() * 20 + 10),
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      life: 200,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      size: Math.random() * 12 + 4,
      emoji: Math.random() > 0.6 ? allEmojis[Math.floor(Math.random() * allEmojis.length)] : null,
    }))
    setConfetti(newConfetti)

    // Reset after animation
    setTimeout(() => {
      setSubmitSecretActive(false)
      setConfetti([])
    }, 8000)
  }

  // Animate particles
  useEffect(() => {
    if (particles.length > 0) {
      const interval = setInterval(() => {
        setParticles((prev) =>
          prev
            .map((particle) => ({
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              vy: particle.vy + 0.2, // gravity
              life: particle.life - 1,
            }))
            .filter((particle) => particle.life > 0),
        )
      }, 16)

      return () => clearInterval(interval)
    }
  }, [particles])

  // Animate confetti
  useEffect(() => {
    if (confetti.length > 0) {
      const interval = setInterval(() => {
        setConfetti((prev) =>
          prev
            .map((piece) => ({
              ...piece,
              x: piece.x + piece.vx,
              y: piece.y + piece.vy,
              vy: piece.vy + 0.3, // gravity
              rotation: piece.rotation + piece.rotationSpeed,
              life: piece.life - 1,
            }))
            .filter((piece) => piece.life > 0 && piece.y < window.innerHeight + 100),
        )
      }, 16)

      return () => clearInterval(interval)
    }
  }, [confetti])

  const checkRaidLimit = () => {
    const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
    const now = Date.now()
    const recentSubmissions = submissions.filter((timestamp) => now - timestamp < RAID_WINDOW)

    if (recentSubmissions.length >= RAID_LIMIT) {
      setRaidLimitReached(true)
      const oldestSubmission = Math.min(...recentSubmissions)
      const timeUntilReset = RAID_WINDOW - (now - oldestSubmission)
      const minutesLeft = Math.ceil(timeUntilReset / (60 * 1000))
      setGeneralError(`Rate limit reached. Please wait ${minutesLeft} minutes before submitting again.`)
    } else {
      setRaidLimitReached(false)
      setGeneralError(null)
    }
  }

  const updateRaidLimit = () => {
    const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
    const now = Date.now()
    const recentSubmissions = submissions.filter((timestamp) => now - timestamp < RAID_WINDOW)
    recentSubmissions.push(now)
    localStorage.setItem("contactSubmissions", JSON.stringify(recentSubmissions))
    checkRaidLimit()
  }

  // Enhanced blacklist for unwanted words
  const blacklistedWords = [
    "spam",
    "scam",
    "hack",
    "virus",
    "malware",
    "phishing",
    "bitcoin",
    "crypto",
    "investment",
    "money",
    "cash",
    "loan",
    "sex",
    "porn",
    "adult",
    "casino",
    "gambling",
    "bet",
    "free",
    "win",
    "winner",
    "congratulations",
    "prize",
    "urgent",
    "immediate",
    "act now",
    "limited time",
    "fuck",
    "shit",
    "damn",
    "bitch",
    "asshole",
    "idiot",
    "click here",
    "buy now",
    "make money",
    "get rich",
    "lose weight",
    "miracle",
    "guaranteed",
  ]

  const contactLinks = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      title: "@NilsCraftHD",
      href: "https://twitter.com/NilsCraftHD",
      description: "Follow me on Twitter",
      gradient: "from-sky-500/20 to-blue-500/20",
      hoverColor: "hover:border-sky-500/50",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "me@nilscrafthd.com",
      href: "mailto:me@nilscrafthd.com",
      description: "Send me an email",
      gradient: "from-red-500/20 to-orange-500/20",
      hoverColor: "hover:border-red-500/50",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      title: "nilscrafthd",
      href: "https://discord.com/users/954851027188842526",
      description: "Chat with me on Discord",
      gradient: "from-violet-500/20 to-purple-500/20",
      hoverColor: "hover:border-violet-500/50",
    },
  ]

  const priorityOptions = [
    {
      value: "low",
      label: "Low Priority",
      color: "🟢",
      description: "General inquiries",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      value: "normal",
      label: "Normal Priority",
      color: "🟡",
      description: "Standard requests",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      value: "high",
      label: "High Priority",
      color: "🟠",
      description: "Important matters",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
    },
    {
      value: "urgent",
      label: "Urgent",
      color: "🔴",
      description: "Requires immediate attention",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
    },
  ]

  const categoryOptions = [
    { value: "general", label: "General Inquiry", emoji: "💬", description: "General questions and inquiries" },
    { value: "business", label: "Business", emoji: "💼", description: "Business proposals and partnerships" },
    { value: "support", label: "Support", emoji: "🛠️", description: "Technical support and help" },
    { value: "collaboration", label: "Collaboration", emoji: "🤝", description: "Project collaboration requests" },
    { value: "development", label: "Development", emoji: "💻", description: "Web development projects" },
    { value: "design", label: "Design", emoji: "🎨", description: "Design and UI/UX projects" },
    { value: "other", label: "Other", emoji: "📋", description: "Other topics not listed above" },
  ]

  const validateName = (name) => {
    if (!name.trim()) return "Name is required"
    if (name.trim().length < 2) return "Name must be at least 2 characters long"
    if (name.trim().length > 50) return "Name must be no more than 50 characters"
    if (!/^[a-zA-ZäöüÄÖÜß\s-']+$/.test(name.trim()))
      return "Name can only contain letters, spaces, hyphens and apostrophes"
    return null
  }

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address"
    if (email.trim().length > 100) return "Email address is too long"
    return null
  }

  const validateMessage = (message) => {
    if (!message.trim()) return "Message is required"
    if (message.trim().length < 10) return "Message must be at least 10 characters long"
    if (message.trim().length > MAX_MESSAGE_LENGTH)
      return `Message must be no more than ${MAX_MESSAGE_LENGTH} characters`

    // Anti-Spam: Check for repeated characters
    const repeatedChars = /(.)\1{4,}/g // 5 or more repeated characters
    if (repeatedChars.test(message)) {
      return "Please avoid excessive repeated characters"
    }

    // Anti-Spam: Check for repeated words
    const words = message.toLowerCase().split(/\s+/)
    const wordCount = {}
    for (const word of words) {
      if (word.length > 2) {
        wordCount[word] = (wordCount[word] || 0) + 1
        if (wordCount[word] > 3) {
          return "Please avoid excessive word repetition"
        }
      }
    }

    // Anti-Caps: Check for excessive uppercase
    const uppercaseCount = (message.match(/[A-Z]/g) || []).length
    const totalLetters = (message.match(/[A-Za-z]/g) || []).length
    if (totalLetters > 10 && uppercaseCount / totalLetters > 0.7) {
      return "Please avoid excessive use of capital letters"
    }

    return null
  }

  const checkBlacklistedWords = (text) => {
    const lowerText = text.toLowerCase()
    const foundWords = blacklistedWords.filter((word) => lowerText.includes(word.toLowerCase()))
    return foundWords.length > 0 ? foundWords : null
  }

  const generateTags = (data) => {
    const tags = ["contact", "new"]

    // Add category tag
    tags.push(data.category)

    // Add priority tag
    if (data.priority !== "normal") {
      tags.push(data.priority)
    }

    // Dynamic tags based on message content
    const message = data.message.toLowerCase()

    if (message.includes("project") || message.includes("collaboration") || message.includes("work together")) {
      tags.push("project")
    }
    if (message.includes("question") || message.includes("help") || message.includes("support")) {
      tags.push("support")
    }
    if (message.includes("business") || message.includes("commercial") || message.includes("hire")) {
      tags.push("business")
    }
    if (message.includes("web") || message.includes("website") || message.includes("development")) {
      tags.push("development")
    }
    if (message.includes("design") || message.includes("ui") || message.includes("ux")) {
      tags.push("design")
    }

    // Beta tag for Discord users
    if (message.includes("discord") || data.email.includes("discord")) {
      tags.push("beta")
    }

    return [...new Set(tags)] // Remove duplicates
  }

  // Simplified Discord embed
  const createDiscordEmbed = (data) => {
    const tags = generateTags(data)
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })

    const priorityOption = priorityOptions.find((p) => p.value === data.priority)
    const categoryOption = categoryOptions.find((c) => c.value === data.category)

    // Check for secret detection
    const hasSubmitSecret = submitSecretActive
    const hasDiscoveredSecret = secretActive || hasSubmitSecret

    if (hasDiscoveredSecret) {
      tags.push("secret-hunter")
    }
    if (hasSubmitSecret) {
      tags.push("secret-master")
    }

    return {
      content: `<@954851027188842526> New contact form submission! ${submissionCount > 0 ? `(Message #${submissionCount + 1})` : ""}`,
      embeds: [
        {
          title: "📬 New Contact Request",
          description: `> **Received:** ${currentDate} at ${currentTime}
> **Status:** New Message
> **Priority:** ${priorityOption.color} ${priorityOption.label}
> **Category:** ${categoryOption.emoji} ${categoryOption.label}
${
  submissionCount > 0
    ? `> **Follow-up:** Message #${submissionCount + 1} from this user
`
    : ""
}${
  hasSubmitSecret
    ? `> **🎉 SECRET STATUS:** Secret 1 & 2 Unlocked! 🎊
`
    : hasDiscoveredSecret
      ? `> **🎉 SECRET STATUS:** Secret 1 Unlocked! ✨
`
      : ""
}
-# Form submission from nilscrafthd.com`,
          color: getPriorityColor(data.priority),
          fields: [
            {
              name: "👤 Contact Information",
              value: `> **Name:** ${data.name.trim()}
> **Email:** ${data.email.trim()}`,
              inline: false,
            },
            {
              name: "🏷️ Tags",
              value: tags.map((tag) => `\`${tag}\``).join(" • "),
              inline: true,
            },
            {
              name: "📊 Message Stats",
              value: `> **Length:** ${data.message.trim().length} chars
> **Words:** ${data.message.trim().split(" ").length}
> **Lines:** ${data.message.trim().split("\n").length}`,
              inline: true,
            },
            {
              name: "💬 Message Content",
              value: `\`\`\`
${data.message.trim()}
\`\`\``,
              inline: false,
            },
            {
              name: "⚙️ System Info",
              value: `> **User Agent:** ${navigator.userAgent.split(" ")[0]}
> **Timestamp:** <t:${Math.floor(Date.now() / 1000)}:F>
> **Session:** ${submissionCount > 0 ? `Follow-up message` : "First message"}
> **Secret Status:** ${hasSubmitSecret ? "Secret 1 & 2 Unlocked 🎊" : hasDiscoveredSecret ? "Secret 1 Unlocked ✨" : "Normal User"}`,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "NilsCraftHD Contact Form • Powered by Discord Webhooks",
            icon_url: "https://cdn.discordapp.com/emojis/📬.png",
          },
          author: {
            name: `${priorityOption.label} Contact Form Submission`,
            icon_url:
              data.priority === "urgent"
                ? "https://cdn.discordapp.com/emojis/🚨.png"
                : "https://cdn.discordapp.com/emojis/📧.png",
          },
          thumbnail: {
            url:
              data.priority === "urgent"
                ? "https://cdn.discordapp.com/emojis/🚨.png"
                : "https://cdn.discordapp.com/emojis/📧.png",
          },
          image: {
            url: hasSubmitSecret
              ? "/img/favicon.png"
              : "https://cdn.linkgames.de/assets/20250614_2350_Modernes%20Nachrichten-Banner_simple_compose_01jxr6p2pzfsab4kn1jcq6vgv2.png",
          },
        },
      ],
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Individual field validation
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const messageError = validateMessage(formData.message)

    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (messageError) newErrors.message = messageError

    // Blacklist check
    const allText = `${formData.name} ${formData.email} ${formData.message}`
    const blacklistedWords = checkBlacklistedWords(allText)
    if (blacklistedWords) {
      newErrors.blacklist = `Inappropriate words found: ${blacklistedWords.join(", ")}`
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Enforce character limit for message
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
      return // Don't update if over limit
    }

    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
    if (generalError && !raidLimitReached) setGeneralError(null)
  }

  const handleSendAnother = () => {
    setIsSubmitted(false)
    setFormData({
      name: formData.name, // Keep name and email
      email: formData.email,
      message: "",
      priority: "normal",
      category: "general",
    })
    setErrors({})
    setCaptchaVerified(false)
    setShowCaptcha(true)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return 0x22c55e // Green
      case "normal":
        return 0x3b82f6 // Blue
      case "high":
        return 0xf59e0b // Orange
      case "urgent":
        return 0xef4444 // Red
      default:
        return 0x3b82f6
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (raidLimitReached || !captchaVerified) return

    // Trigger submit secret if conditions are met
    triggerSubmitSecret()

    // Validation
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setGeneralError(null)

    try {
      const payload = createDiscordEmbed(formData)

      const response = await fetch("/api/util/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setSubmissionCount((prev) => prev + 1)
        updateRaidLimit()

        // Reset form but keep name and email for convenience
        setFormData((prev) => ({
          ...prev,
          message: "",
          priority: "normal",
          category: "general",
        }))
        setErrors({})

        // Reset captcha
        setCaptchaVerified(false)
        setShowCaptcha(true)
      } else {
        // Handle specific error responses
        if (response.status === 429) {
          setGeneralError("Rate limited. Please wait before sending another message.")
        } else if (response.status === 400) {
          setGeneralError("Invalid form data. Please check your inputs.")
        } else {
          setGeneralError(result.error || "Failed to send message. Please try again.")
        }
      }
    } catch (error) {
      console.error("Network error:", error)
      setGeneralError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedPriority = priorityOptions.find((p) => p.value === formData.priority)
  const selectedCategory = categoryOptions.find((c) => c.value === formData.category)

  return (
    <div
      className={`max-w-6xl mx-auto space-y-12 p-6 overflow-hidden ${secretActive && !isMobile ? "cursor-none" : ""}`}
    >
      {/* Secret Effects - Only on Desktop */}
      {secretActive && !isMobile && (
        <>
          {/* Custom Cursor */}
          <div
            className="fixed pointer-events-none z-[9999] w-12 h-12"
            style={{
              left: mousePos.x - 24,
              top: mousePos.y - 24,
              transition: "none",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full animate-spin shadow-2xl shadow-purple-500/50">
              <div className="absolute inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="fixed pointer-events-none z-[9998] rounded-full animate-pulse"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.life / 100,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
            />
          ))}

          {/* Matrix Effect */}
          {showMatrix && (
            <div className="fixed inset-0 z-[9997] pointer-events-none">
              <div className="absolute inset-0 bg-black/90 animate-pulse">
                <div className="text-green-400 font-mono text-xs leading-none overflow-hidden h-full">
                  {Array.from({ length: 200 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute animate-bounce"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${0.5 + Math.random() * 2}s`,
                      }}
                    >
                      {Math.random().toString(36).substring(2, 8)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-pulse">
                    🎉 SECRET UNLOCKED! 🎉
                  </div>
                  <div className="text-2xl text-white animate-bounce">You found the hidden easter egg!</div>
                  <div className="text-lg text-gray-300 animate-pulse">Congratulations, you are persistent! 🌟</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Submit Secret Confetti */}
      {submitSecretActive && !isMobile && (
        <>
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="fixed pointer-events-none z-[9998] flex items-center justify-center"
              style={{
                left: piece.x,
                top: piece.y,
                width: piece.size,
                height: piece.size,
                transform: `rotate(${piece.rotation}deg)`,
                opacity: piece.life / 200,
              }}
            >
              {piece.emoji ? (
                <span className="text-2xl animate-bounce">{piece.emoji}</span>
              ) : (
                <div
                  className="rounded-full animate-pulse"
                  style={{
                    width: piece.size,
                    height: piece.size,
                    backgroundColor: piece.color,
                    boxShadow: `0 0 ${piece.size * 2}px ${piece.color}`,
                  }}
                />
              )}
            </div>
          ))}

          {/* Giant Secret Emoji */}
          <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
            <div className="text-9xl animate-bounce">{secretEmoji}</div>
          </div>

          {/* Submit Secret Banner */}
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[9999] pointer-events-none">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-pulse">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold">🎊 SECRET MASTER! 🎊</div>
                <div className="text-sm">
                  {selectedPriority.label} + {selectedCategory.label}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Contact Links Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactLinks.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 ${contact.hoverColor} transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
              />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out">
                  <div className="group-hover:animate-pulse group-hover:rotate-6 transition-all duration-700">
                    {contact.icon}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-white group-hover:text-gray-100 transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {contact.description}
                  </p>
                </div>

                <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-300"
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
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-2xl mx-auto bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="text-center p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-2xl text-white flex items-center justify-center gap-2 font-bold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send Message {submissionCount > 0 && `(#${submissionCount + 1})`}
            </h2>
          </div>

          <p className="text-gray-400 mt-2">Fill out the form below and I'll get back to you as soon as possible.</p>
          {raidLimitReached && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">⚠️ Rate limit active - Please wait before submitting again</p>
            </div>
          )}
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <svg
                  className="w-8 h-8 text-green-500 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Message Sent Successfully!</h3>
                <p className="text-gray-400">Thank you for your message. I'll get back to you as soon as possible.</p>
                {submissionCount > 0 && (
                  <p className="text-sm text-blue-400 animate-pulse">
                    This is your {submissionCount + 1}
                    {submissionCount === 0 ? "st" : submissionCount === 1 ? "nd" : submissionCount === 2 ? "rd" : "th"}{" "}
                    message in this session.
                  </p>
                )}
              </div>

              {!raidLimitReached && (
                <div className="space-y-3">
                  <button
                    onClick={handleSendAnother}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
                  >
                    <svg
                      className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Send Another Message
                  </button>
                  <p className="text-xs text-gray-500">
                    You can send up to {RAID_LIMIT} messages per hour. {RAID_LIMIT - submissionCount} remaining.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white flex items-center gap-2 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting || raidLimitReached}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-600"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm flex items-center gap-1 animate-pulse">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-white flex items-center gap-2 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting || raidLimitReached}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-600"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-1 animate-pulse">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Custom Priority Dropdown */}
                <div className="space-y-2">
                  <label className="text-white flex items-center gap-2 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    Priority
                  </label>
                  <div className="relative" ref={priorityRef}>
                    <button
                      type="button"
                      onClick={() => setPriorityDropdownOpen(!priorityDropdownOpen)}
                      disabled={isSubmitting || raidLimitReached}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-between hover:scale-105 transform ${selectedPriority.bgColor} ${selectedPriority.borderColor}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="animate-pulse">{selectedPriority.color}</span>
                        <span>{selectedPriority.label}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${priorityDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {priorityDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
                        {priorityOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, priority: option.value }))
                              setPriorityDropdownOpen(false)
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-all duration-200 flex items-start gap-3 hover:scale-105 transform ${
                              formData.priority === option.value ? "bg-gray-700" : ""
                            }`}
                          >
                            <span className="text-lg animate-pulse">{option.color}</span>
                            <div>
                              <div className="text-white font-medium">{option.label}</div>
                              <div className="text-gray-400 text-sm">{option.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-white flex items-center gap-2 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Category
                  </label>
                  <div className="relative" ref={categoryRef}>
                    <button
                      type="button"
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      disabled={isSubmitting || raidLimitReached}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center justify-between hover:scale-105 transform"
                    >
                      <div className="flex items-center gap-2">
                        <span className="animate-pulse">{selectedCategory.emoji}</span>
                        <span>{selectedCategory.label}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${categoryDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {categoryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
                        {categoryOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, category: option.value }))
                              setCategoryDropdownOpen(false)
                            }}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-all duration-200 flex items-start gap-3 hover:scale-105 transform ${
                              formData.category === option.value ? "bg-gray-700" : ""
                            }`}
                          >
                            <span className="text-lg animate-pulse">{option.emoji}</span>
                            <div>
                              <div className="text-white font-medium">{option.label}</div>
                              <div className="text-gray-400 text-sm">{option.description}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-white flex items-center gap-2 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Message
                  {!isMobile && (
                    <button
                      type="button"
                      onClick={triggerSecret}
                      className={`relative text-yellow-400 hover:text-yellow-300 transition-all cursor-pointer hover:scale-125 transform duration-200 ${
                        secretClicks > 0 ? "animate-pulse" : ""
                      }`}
                    >
                      *
                      {secretClicks > 0 && secretClicks < 10 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                          {secretClicks}
                        </span>
                      )}
                    </button>
                  )}
                  <span
                    className={`text-xs ml-auto animate-pulse ${formData.message.length >= MAX_MESSAGE_LENGTH ? "text-red-400" : "text-gray-400"}`}
                  >
                    ({formData.message.length}/{MAX_MESSAGE_LENGTH})
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Describe your inquiry or question..."
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting || raidLimitReached}
                  rows={5}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : formData.message.length >= MAX_MESSAGE_LENGTH
                        ? "border-yellow-500 focus:ring-yellow-500"
                        : "border-gray-600"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm flex items-center gap-1 animate-pulse">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    {errors.message}
                  </p>
                )}
                {formData.message.length >= MAX_MESSAGE_LENGTH && (
                  <p className="text-yellow-400 text-sm flex items-center gap-1 animate-pulse">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    Character limit reached
                  </p>
                )}
              </div>

              {/* Blacklist Error */}
              {errors.blacklist && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2 animate-pulse">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold">Inappropriate content detected</p>
                    <p>{errors.blacklist}</p>
                    <p className="text-xs mt-1 text-red-300">Please remove these words and try again.</p>
                  </div>
                </div>
              )}

              {/* General Error */}
              {generalError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2 animate-pulse">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  {generalError}
                </div>
              )}

              {/* Captcha */}
              {showCaptcha && <CustomCaptcha onVerify={setCaptchaVerified} verified={captchaVerified} />}

              <button
                type="submit"
                disabled={isSubmitting || raidLimitReached || !captchaVerified}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 transform"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center animate-pulse">
                By submitting, you agree to the processing of your data for contact purposes.
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-track-gray-800 {
          scrollbar-color: #374151 #1f2937;
        }
        .scrollbar-thumb-gray-600 {
          scrollbar-color: #4b5563 #1f2937;
        }
        .scrollbar-thumb-rounded-full {
          scrollbar-color: #4b5563 #1f2937;
        }
        
        /* Webkit scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  )
}
