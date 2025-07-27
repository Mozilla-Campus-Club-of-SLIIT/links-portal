import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"

export default function FloatingSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  return (
    <div className="fixed right-5 top-30 z-50">
      {open ? (
        <div className="flex items-center bg-white shadow-lg rounded-full px-4 py-2 space-x-2 w-[40vw] transition-all">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search links..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full focus:outline-none"
          />
          <button onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
        </div>
      ) : (
        <button
          className="z-50 flex items-center justify-center w-12 h-12 rounded-full border bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border-black transition"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      )}
    </div>
  )
}
