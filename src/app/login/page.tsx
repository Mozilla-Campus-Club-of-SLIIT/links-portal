import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWarning, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-red-900 to-orange-950 relative overflow-hidden">
      {/* Firefox-themed animated background particles */}
      <div className="absolute inset-0">
        <div
          className="absolute w-2 h-2 bg-orange-400 rounded-full animate-pulse"
          style={{ top: "10%", left: "10%" }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-red-400 rounded-full animate-ping"
          style={{ top: "20%", left: "80%" }}
        ></div>
        <div
          className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
          style={{ top: "30%", left: "15%" }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-orange-500 rounded-full animate-pulse"
          style={{ top: "40%", left: "85%" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping"
          style={{ top: "60%", left: "20%" }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-bounce"
          style={{ top: "70%", left: "90%" }}
        ></div>
      </div>

      <div className="relative z-10 bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-600 text-center space-y-6 max-w-md mx-4">
        <h3 className="text-3xl font-bold text-white">Welcome to Links Portal</h3>
        <div className="flex items-center gap-2 text-sm text-gray-300 justify-center">
          <FontAwesomeIcon icon={faWarning} className="w-4 h-4 text-yellow-400" />
          <p>This portal is for SLIIT Mozilla Club members.</p>
        </div>
        <hr className="border-gray-600" />
        <Link
          href="/"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Enter Portal
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
        <div className="text-sm text-gray-400">
          Not a member?{" "}
          <a
            href="https://links.sliitmozilla.org/join"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
          >
            Join the club
          </a>
        </div>
      </div>
    </main>
  )
}
