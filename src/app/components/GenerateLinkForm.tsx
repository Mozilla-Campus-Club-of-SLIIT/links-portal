"use client"

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faCheck, faGlobe, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { supabase } from "@/lib/supabase"

const SLUG_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const SLUG_LENGTH = 6
const MAX_GENERATE_ATTEMPTS = 5
const UNIQUE_VIOLATION = "23505"
const CUSTOM_CODE_PATTERN = /^[A-Za-z0-9_-]+$/

function generateShortCode(length = SLUG_LENGTH): string {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => SLUG_ALPHABET[b % SLUG_ALPHABET.length]).join("")
}

type Status =
  | { type: "idle" }
  | { type: "success"; shortUrl: string }
  | { type: "error"; message: string }

export default function GenerateLinkForm() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [shortCode, setShortCode] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ type: "idle" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: "idle" })

    const customCode = shortCode.trim()
    if (customCode && !CUSTOM_CODE_PATTERN.test(customCode)) {
      setStatus({
        type: "error",
        message: "Custom short code may only contain letters, numbers, hyphens and underscores.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Custom codes get a single attempt; generated codes retry on the rare collision.
      const attempts = customCode ? 1 : MAX_GENERATE_ATTEMPTS
      for (let i = 0; i < attempts; i++) {
        const code = customCode || generateShortCode()
        const { error } = await supabase.from("links").insert({
          original_url: originalUrl.trim(),
          short_code: code,
          is_active: isActive,
        })

        if (!error) {
          setStatus({ type: "success", shortUrl: `${window.location.origin}/l/${code}` })
          setOriginalUrl("")
          setShortCode("")
          setIsActive(true)
          return
        }

        if (error.code !== UNIQUE_VIOLATION) {
          setStatus({ type: "error", message: error.message || "Failed to create link." })
          return
        }

        if (customCode) {
          setStatus({
            type: "error",
            message: `The short code "${customCode}" is already taken. Please choose another.`,
          })
          return
        }
      }

      setStatus({ type: "error", message: "Could not generate a unique short code. Please try again." })
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Unexpected error creating link.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto relative group/form mb-10">
      
      {/* Orange shadow for the whole form */}
      <div className="absolute inset-0 bg-orange-500 rounded-3xl transform translate-x-3 translate-y-3 pointer-events-none"></div>

      <div className="relative bg-white border-2 border-black rounded-3xl p-6 sm:p-10 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-black tracking-tight">Create Short Link</h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base font-medium">Enter the destination URL to generate a shortened link.</p>
        </div>

      <div className="space-y-6 relative z-10">
        {/* Original URL */}
        <div className="space-y-2">
          <label htmlFor="original_url" className="block text-sm font-bold text-black">
            Destination URL <span className="text-orange-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black transition-colors">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <input
              type="url"
              id="original_url"
              required
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-black rounded-xl outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] transition-shadow text-black placeholder-gray-400 font-medium"
              placeholder="https://example.com/very/long/path..."
            />
          </div>
        </div>

        {/* Short Code (Optional) */}
        <div className="space-y-2">
          <label htmlFor="short_code" className="block text-sm font-bold text-black">
            Custom Short Code <span className="text-gray-500 font-medium">(Optional)</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black transition-colors">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <input
              type="text"
              id="short_code"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-black rounded-xl outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] transition-shadow text-black placeholder-gray-400 font-medium"
              placeholder="e.g. event2025"
            />
          </div>
          <p className="text-xs text-gray-500 pl-1">Leave blank to automatically generate a random short code.</p>
        </div>

        {/* Is Active Toggle */}
        <div className="flex items-center justify-between p-4 bg-white border-2 border-black rounded-xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow group">
          <div>
            <label htmlFor="is_active" className="block text-sm font-bold text-black cursor-pointer">
              Active Status
            </label>
            <p className="text-xs text-gray-600 font-medium mt-1">If disabled, the link will redirect to an error page.</p>
          </div>
          <button
            type="button"
            id="is_active"
            role="switch"
            aria-checked={isActive}
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
              isActive ? "bg-orange-500" : "bg-gray-300 group-hover:bg-gray-400"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out flex items-center justify-center ${
                isActive ? "translate-x-5" : "translate-x-0"
              }`}
            >
              {isActive && <FontAwesomeIcon icon={faCheck} className="text-[10px] text-orange-500 animate-in fade-in zoom-in duration-200" />}
            </span>
          </button>
        </div>
      </div>

      {status.type === "success" && (
        <div
          role="status"
          className="mt-8 relative z-10 p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(34,197,94,1)]"
        >
          <p className="text-sm font-bold text-black flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} className="text-green-600" />
            Short link created!
          </p>
          <a
            href={status.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block break-all font-mono text-sm text-orange-600 underline font-semibold"
          >
            {status.shortUrl}
          </a>
        </div>
      )}

      {status.type === "error" && (
        <div
          role="alert"
          className="mt-8 relative z-10 p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]"
        >
          <p className="text-sm font-bold text-red-600 flex items-start gap-2">
            <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5" />
            <span>{status.message}</span>
          </p>
        </div>
      )}

      <div className="mt-10 relative z-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative group/btn bg-white border-2 border-black text-black font-bold rounded-xl py-4 px-4 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all flex items-center justify-center hover:-translate-y-1 hover:-translate-x-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
        >
          <div className="flex items-center justify-center space-x-2">
            <span>{isSubmitting ? "Generating..." : "Generate Short Link"}</span>
          </div>
        </button>
      </div>
      </div>

    </form>
  )
}
