"use client"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faCopy,
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons"
import { supabase } from "@/lib/supabase"

interface LinkRecord {
  original_url: string
  short_code: string
  expires_at: string | null
  is_active: boolean
  created_at: string
}

function formatExpiration(expiresAt: string | null) {
  if (!expiresAt) return "Never"

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(expiresAt))
}

export default function LinksTable() {
  const [links, setLinks] = useState<LinkRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [updatingCode, setUpdatingCode] = useState<string | null>(null)
const [updateError, setUpdateError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchLinks() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const { data, error } = await supabase
          .from("links")
          .select("original_url, short_code, expires_at, is_active, created_at")
          .order("created_at", { ascending: false })
          .returns<LinkRecord[]>()

        if (error) throw error
        if (isMounted) setLinks(data ?? [])
      } catch (error) {
        console.error("Failed to fetch links:", error)
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.")
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void fetchLinks()
    return () => {
      isMounted = false
    }
  }, [])

  async function copyShortLink(shortCode: string) {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/l/${encodeURIComponent(shortCode)}`,
      )
      setCopiedCode(shortCode)
      window.setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error("Failed to copy short link:", error)
    }
  }

  async function toggleLinkStatus(link: LinkRecord) {
  if (updatingCode) return

  const newStatus = !link.is_active
  setUpdatingCode(link.short_code)
  setUpdateError(null)

  setLinks((currentLinks) =>
    currentLinks.map((item) =>
      item.short_code === link.short_code
        ? { ...item, is_active: newStatus }
        : item,
    ),
  )

  try {
    const { error } = await supabase
      .from("links")
      .update({ is_active: newStatus })
      .eq("short_code", link.short_code)

    if (error) throw error
  } catch (error) {
    console.error("Failed to update link status:", error)

    setLinks((currentLinks) =>
      currentLinks.map((item) =>
        item.short_code === link.short_code
          ? { ...item, is_active: link.is_active }
          : item,
      ),
    )
    setUpdateError("Could not update the link status. Please try again.")
  } finally {
    setUpdatingCode(null)
  }
}
  return (
    <section aria-labelledby="links-table-heading" className="mx-auto w-full max-w-5xl">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-1 text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
            Link library
          </p>
          <h2 id="links-table-heading" className="text-2xl font-extrabold text-black sm:text-3xl">
            Generated links
          </h2>
        </div>
        <p className="font-mono text-sm font-bold text-gray-600">
          {isLoading ? "Loading links..." : `${links.length} links`}
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border-2 border-red-700 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
        >
          <FontAwesomeIcon aria-hidden="true" icon={faTriangleExclamation} className="mt-0.5" />
          <span>Unable to load links. {errorMessage}</span>
        </div>
      )}
    
          {updateError && (
        <div role="alert" className="mb-5 rounded-xl border-2 border-red-700 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          <FontAwesomeIcon aria-hidden="true" icon={faTriangleExclamation} className="mr-2" />
          {updateError}
        </div>
      )}

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-orange-500"
        />
        <div className="relative overflow-hidden rounded-2xl border-2 border-black bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-orange-100">
                <tr className="border-b-2 border-black">
                  <th
                    scope="col"
                    className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-black"
                  >
                    Original URL
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-black"
                  >
                    Short code
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-black"
                  >
                    Expiration date
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-black"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black/10">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-sm font-medium text-gray-600"
                    >
                      <span role="status" className="inline-flex items-center gap-2">
                        <FontAwesomeIcon
                          aria-hidden="true"
                          icon={faSpinner}
                          className="animate-spin"
                        />
                        Loading links...
                      </span>
                    </td>
                  </tr>
                ) : errorMessage ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-sm font-medium text-gray-600"
                    >
                      Links are unavailable right now.
                    </td>
                  </tr>
                ) : links.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-10 text-center text-sm font-medium text-gray-600"
                    >
                      No links created yet. Generate your first link above!
                    </td>
                  </tr>
                ) : (
                  links.map((link) => (
                    <tr key={link.short_code} className="hover:bg-orange-50">
                      <td className="max-w-sm px-5 py-4">
                        <a
                          href={link.original_url}
                          target="_blank"
                          rel="noreferrer"
                          title={link.original_url}
                          className="block truncate font-medium text-black underline decoration-orange-500 decoration-2 underline-offset-2 hover:text-orange-700"
                        >
                          {link.original_url}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyShortLink(link.short_code)}
                            aria-label={`Copy short link for ${link.short_code}`}
                            title={copiedCode === link.short_code ? "Copied!" : "Copy short link"}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                          >
                            <FontAwesomeIcon
                              aria-hidden="true"
                              icon={copiedCode === link.short_code ? faCheck : faCopy}
                              className="h-3.5 w-3.5"
                            />
                          </button>
                          <a
                            href={`/l/${encodeURIComponent(link.short_code)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link.short_code}
                            className="inline-block w-[14ch] truncate align-bottom rounded-md border-2 border-black bg-white px-2 py-1 font-mono text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-100"
                          >
                            {link.short_code}
                          </a>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-700">
                        {formatExpiration(link.expires_at)}
                      </td>

                       <td className="whitespace-nowrap px-5 py-4">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={link.is_active}
                          aria-label={`${link.is_active ? "Deactivate" : "Activate"} ${link.short_code}`}
                          disabled={updatingCode === link.short_code}
                          onClick={() => toggleLinkStatus(link)}
                          className={`inline-flex items-center gap-2 rounded-full border-2 border-black px-3 py-1 text-xs font-extrabold uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:cursor-wait disabled:opacity-60 ${
                            link.is_active ? "bg-green-200 text-black" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {link.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>
              
                       

                  
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
