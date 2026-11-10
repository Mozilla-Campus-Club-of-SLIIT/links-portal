"use client"

import React, { useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faQrcode } from "@fortawesome/free-solid-svg-icons"

export interface QRCodeDisplayProps {
  /** The full destination or short link URL (e.g., https://domain/l/xyz123) */
  value: string
  /** Size in pixels (width and height). Default: 200 */
  size?: number
  /** Filename for the downloaded file (without .png extension). Default: "shortlink-qr" */
  filename?: string
  /** Additional CSS class names */
  className?: string
}

export default function QRCodeDisplay({
  value,
  size = 200,
  filename = "shortlink-qr",
  className = "",
}: Readonly<QRCodeDisplayProps>) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (!containerRef.current) return
    const canvas = containerRef.current.querySelector("canvas")
    if (!canvas) return

    const pngUrl = canvas.toDataURL("image/png")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `${filename}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
  }

  if (!value) return null

  return (
    <div className={`flex flex-col items-center relative ${className}`} ref={containerRef}>
      {/* Outer neo-brutalist card container */}
      <div className="relative group/qr w-full max-w-xs">
        {/* Orange shadow accent */}
        <div className="absolute inset-0 bg-orange-500 rounded-2xl transform translate-x-2 translate-y-2 pointer-events-none" />

        {/* Main card */}
        <div className="relative bg-white border-2 border-black rounded-2xl p-5 flex flex-col items-center transition-transform duration-200">
          {/* Header pill */}
          <div className="flex items-center space-x-2 text-xs font-bold text-black uppercase tracking-wider mb-4">
            <FontAwesomeIcon icon={faQrcode} className="text-orange-500 text-sm" />
            <span>QR Code</span>
          </div>

          {/* QR Code Canvas wrapper */}
          <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <QRCodeCanvas
              value={value}
              size={size}
              level="H"
              bgColor="#ffffff"
              fgColor="#000000"
              marginSize={1}
            />
          </div>

          {/* Value preview */}
          <p
            className="mt-3 text-xs text-gray-600 font-mono max-w-full truncate text-center px-2"
            title={value}
          >
            {value}
          </p>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download QR Code as PNG"
            className="mt-4 w-full flex items-center justify-center space-x-2 bg-white hover:bg-orange-500 text-black hover:text-white font-bold py-2.5 px-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(249,115,22,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0.5 active:translate-x-0.5 transition-all text-sm cursor-pointer"
          >
            <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
            <span>Download QR</span>
          </button>
        </div>
      </div>
    </div>
  )
}
