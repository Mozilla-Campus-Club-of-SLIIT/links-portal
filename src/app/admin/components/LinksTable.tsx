"use client"

/**
 * Shape used by the links table and intended to align with the links API.
 * Keep nullable dates explicit so the UI can represent links without expiry.
 */
interface LinkRecord {
  original_url: string
  short_code: string
  expires_at: string | null
  is_active: boolean
}

const mockLinks: LinkRecord[] = [
  {
    original_url: "https://github.com/Mozilla-Campus-Club-of-SLIIT/links-portal/issues/41",
    short_code: "mozilla2026",
    expires_at: "2026-12-31T23:59:59.000Z",
    is_active: true,
  },
  {
    original_url: "https://github.com/Mozilla-Campus-Club-of-SLIIT/links-portal/issues/41",
    short_code: "GitHubIssueGitHubIssueGitHubIssue",
    expires_at: null,
    is_active: true,
  },
  {
    original_url: "https://github.com/Mozilla-Campus-Club-of-SLIIT/links-portal/issues/41",
    short_code: "TestCode",
    expires_at: "2026-11-21T00:00:00.000Z",
    is_active: false,
  },
]

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
        <p className="font-mono text-sm font-bold text-gray-600">{mockLinks.length} links</p>
      </div>

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-[7px] translate-y-[7px] rounded-2xl bg-orange-500"
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
                {mockLinks.map((link) => (
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
                      <code className="rounded-md border-2 border-black bg-white px-2 py-1 font-mono text-sm font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {link.short_code}
                      </code>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-gray-700">
                      {formatExpiration(link.expires_at)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border-2 border-black px-3 py-1 text-xs font-extrabold uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                          link.is_active ? "bg-green-200 text-black" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mr-2 h-2 w-2 rounded-full border border-black ${
                            link.is_active ? "bg-green-600" : "bg-gray-500"
                          }`}
                        />
                        {link.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
