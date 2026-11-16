"use client"

import { useEffect, useRef, useState } from "react"
import { supabase } from "@/lib/supabase"

type LinkRow = {
  original_url: string
  short_code: string
  is_active: boolean
  created_at: string
  expires_at: string | null
}

type LinksTableProps = {
  refreshKey: number
}

function formatDate(value: string | null, includeTime = false): string {
  if (!value) return "Never"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Unknown"

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    ...(includeTime && { timeStyle: "short" }),
  }).format(date)
}

export default function LinksTable({ refreshKey }: Readonly<LinksTableProps>) {
  const [links, setLinks] = useState<LinkRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [origin, setOrigin] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copyError, setCopyError] = useState<string | null>(null)
  const copiedTimeout = useRef<number | null>(null)

  useEffect(() => {
    setOrigin(window.location.origin)
    return () => {
      if (copiedTimeout.current !== null) window.clearTimeout(copiedTimeout.current)
    }
  }, [])

  useEffect(() => {
    let isCurrent = true

    async function fetchLinks() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const { data, error } = await supabase
          .from("links")
          .select("original_url, short_code, is_active, created_at, expires_at")
          .order("created_at", { ascending: false })

        if (!isCurrent) return

        if (error) {
          setErrorMessage(error.message || "Unable to load links.")
          return
        }

        setLinks(data ?? [])
      } catch (error) {
        if (!isCurrent) return
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load links. Please try again.",
        )
      } finally {
        if (isCurrent) setIsLoading(false)
      }
    }

    void fetchLinks()
    return () => {
      isCurrent = false
    }
  }, [refreshKey])

  async function copyShortLink(shortCode: string) {
    setCopyError(null)
    setCopiedCode(null)
    if (copiedTimeout.current !== null) {
      window.clearTimeout(copiedTimeout.current)
      copiedTimeout.current = null
    }

    try {
      const shortUrl = new URL(`/l/${shortCode}`, window.location.origin).toString()
      await navigator.clipboard.writeText(shortUrl)
      setCopiedCode(shortCode)
      copiedTimeout.current = window.setTimeout(() => {
        setCopiedCode(null)
        copiedTimeout.current = null
      }, 2000)
    } catch (error) {
      console.error("Failed to copy short link:", error)
      setCopyError("Couldn't copy the short link. Please copy it from the link.")
    }
  }

  return (
    <section
      aria-labelledby="links-table-heading"
      className="w-full overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]"
    >
      <div className="border-b-2 border-gray-100 px-5 py-5 sm:px-7">
        <h2 id="links-table-heading" className="text-2xl font-extrabold text-black">
          Your Links
        </h2>
        <p className="mt-1 text-sm font-medium text-gray-600">
          Links created in the portal, newest first.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="m-4 rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 sm:m-6"
        >
          Unable to load your links: {errorMessage}
        </div>
      )}
      {copyError && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 sm:mx-6"
        >
          {copyError}
        </div>
      )}

      {isLoading ? (
        <div
          role="status"
          aria-label="Loading links"
          className="flex items-center justify-center gap-3 px-6 py-16 text-sm font-semibold text-gray-600"
        >
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-orange-500" />
          Loading links...
        </div>
      ) : links.length === 0 ? (
        errorMessage ? null : (
          <p className="px-6 py-16 text-center font-medium text-gray-600">
            No links created yet. Generate your first link above!
          </p>
        )
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed text-left">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-600">
              <tr>
                <th scope="col" className="w-[30%] px-5 py-4 sm:px-7">
                  Original URL
                </th>
                <th scope="col" className="w-[27%] px-5 py-4">
                  Short Link
                </th>
                <th scope="col" className="w-[13%] px-5 py-4">
                  Status
                </th>
                <th scope="col" className="w-[15%] px-5 py-4">
                  Created
                </th>
                <th scope="col" className="w-[15%] px-5 py-4">
                  Expires
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {links.map((link) => {
                const shortPath = `/l/${link.short_code}`
                const shortUrl = `${origin}${shortPath}`

                return (
                  <tr key={link.short_code} className="hover:bg-orange-50/40">
                    <td className="px-5 py-4 sm:px-7">
                      <span
                        title={link.original_url}
                        className="block truncate text-sm font-medium text-gray-800"
                      >
                        {link.original_url}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex min-w-0 items-center gap-2">
                        <a
                          href={shortPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={shortUrl}
                          className="min-w-0 truncate font-mono text-sm font-semibold text-orange-700 underline decoration-orange-300 underline-offset-2 hover:text-orange-900"
                        >
                          {shortUrl || shortPath}
                        </a>
                        <button
                          type="button"
                          onClick={() => void copyShortLink(link.short_code)}
                          aria-label={`Copy short link ${link.short_code}`}
                          className="shrink-0 rounded-md border border-gray-300 px-2 py-1 text-xs font-bold text-gray-700 hover:border-black hover:text-black"
                        >
                          {copiedCode === link.short_code ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          link.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {link.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {formatDate(link.created_at, true)}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {formatDate(link.expires_at)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
