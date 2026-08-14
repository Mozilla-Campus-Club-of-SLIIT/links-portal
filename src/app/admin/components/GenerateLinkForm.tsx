"use client"

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faWandMagicSparkles, faClock, faCheck, faGlobe } from "@fortawesome/free-solid-svg-icons"

export default function GenerateLinkForm() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [shortCode, setShortCode] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [isActive, setIsActive] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      original_url: originalUrl,
      short_code: shortCode || undefined,
      expires_at: expiresAt || undefined,
      is_active: isActive,
    }
    console.log("Form Submitted:", payload)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-3xl p-6 sm:p-10 transition-all hover:shadow-[0_8px_40px_0_rgba(255,106,0,0.15)] relative overflow-hidden group/form">
      
      {/* Decorative gradient orb inside the form */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl pointer-events-none group-hover/form:bg-orange-400/20 transition-colors duration-700"></div>

      <div className="mb-8 text-center relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30 transform transition-transform hover:scale-105 hover:rotate-3 cursor-default">
          <FontAwesomeIcon icon={faWandMagicSparkles} className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Short Link</h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Turn a long, unwieldy URL into a short, manageable link.</p>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Original URL */}
        <div className="space-y-2">
          <label htmlFor="original_url" className="block text-sm font-semibold text-gray-700">
            Destination URL <span className="text-orange-500">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <input
              type="url"
              id="original_url"
              required
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400 hover:bg-white/80"
              placeholder="https://example.com/very/long/path..."
            />
          </div>
        </div>

        {/* Short Code (Optional) */}
        <div className="space-y-2">
          <label htmlFor="short_code" className="block text-sm font-semibold text-gray-700">
            Custom Short Code <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <input
              type="text"
              id="short_code"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400 hover:bg-white/80"
              placeholder="e.g. event2025"
            />
          </div>
          <p className="text-xs text-gray-500 pl-1">Leave blank to automatically generate a random short code.</p>
        </div>

        {/* Expiration Date */}
        <div className="space-y-2">
          <label htmlFor="expires_at" className="block text-sm font-semibold text-gray-700">
            Expiration Date & Time <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <input
              type="datetime-local"
              id="expires_at"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-gray-800 placeholder-gray-400 hover:bg-white/80"
            />
          </div>
        </div>

        {/* Is Active Toggle */}
        <div className="flex items-center justify-between p-4 bg-white/40 border border-gray-100 rounded-xl hover:bg-white/80 transition-colors group">
          <div>
            <label htmlFor="is_active" className="block text-sm font-semibold text-gray-800 cursor-pointer">
              Active Status
            </label>
            <p className="text-xs text-gray-500 mt-1">If disabled, the link will redirect to an error page.</p>
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

      <div className="mt-10 relative z-10">
        <button
          type="submit"
          className="w-full relative overflow-hidden group/btn bg-gray-900 text-white font-bold rounded-xl py-4 px-4 shadow-[0_4px_14px_0_rgb(0,0,0,39%)] hover:shadow-[0_6px_20px_rgba(0,0,0,23%)] hover:bg-[rgba(25,25,25,1)] transition-all flex items-center justify-center"
        >
          {/* Base Layer */}
          <div className="flex items-center justify-center space-x-2 group-hover/btn:opacity-0 transition-opacity duration-300">
            <span>Generate Short Link</span>
            <FontAwesomeIcon icon={faWandMagicSparkles} className="text-sm" />
          </div>
          
          {/* Hover Layer with Gradient Background */}
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0 pointer-events-none"></div>
          
          {/* Hover Layer Content */}
          <div className="absolute inset-0 flex items-center justify-center space-x-2 font-bold text-white opacity-0 group-hover/btn:opacity-100 transition-all duration-300 z-10 transform translate-y-2 group-hover/btn:translate-y-0 pointer-events-none">
            <span>Generate Short Link</span>
            <FontAwesomeIcon icon={faWandMagicSparkles} className="text-sm rotate-12" />
          </div>
        </button>
      </div>

    </form>
  )
}
