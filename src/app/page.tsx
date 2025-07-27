import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faEnvelope, faUsers, faCalendarAlt } from "@fortawesome/free-solid-svg-icons"

export default function Home() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: faInstagram,
      url: "https://instagram.com/sliitmozilla",
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "Facebook",
      icon: faFacebook,
      url: "https://facebook.com/sliitmozilla",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "LinkedIn",
      icon: faLinkedin,
      url: "https://linkedin.com/company/sliitmozilla",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "GitHub",
      icon: faGithub,
      url: "https://github.com/Mozilla-Campus-Club-of-SLIIT",
      color: "from-gray-700 to-gray-900",
    },
    {
      name: "Twitter",
      icon: faTwitter,
      url: "https://twitter.com/sliitmozilla",
      color: "from-sky-400 to-sky-500",
    },
  ]

  const quickLinks = [
    {
      name: "Join the Club",
      icon: faUsers,
      url: "https://links.sliitmozilla.org/join",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Our Website",
      icon: faGlobe,
      url: "https://sliitmozilla.org",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Contact Us",
      icon: faEnvelope,
      url: "mailto:contact@sliitmozilla.org",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        {/* Light particles */}
        <div
          className="absolute w-3 h-3 bg-gray-200 rounded-full animate-pulse opacity-50"
          style={{ top: "10%", left: "10%" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-gray-300 rounded-full animate-ping opacity-40"
          style={{ top: "15%", left: "85%" }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-gray-100 rounded-full animate-bounce opacity-30"
          style={{ top: "25%", left: "20%" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-gray-200 rounded-full animate-pulse opacity-45"
          style={{ top: "35%", left: "90%" }}
        ></div>
        <div
          className="absolute w-3 h-3 bg-gray-300 rounded-full animate-ping opacity-35"
          style={{ top: "45%", left: "15%" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-gray-100 rounded-full animate-bounce opacity-50"
          style={{ top: "55%", left: "80%" }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-gray-200 rounded-full animate-pulse opacity-40"
          style={{ top: "65%", left: "25%" }}
        ></div>
        <div
          className="absolute w-3 h-3 bg-gray-300 rounded-full animate-ping opacity-30"
          style={{ top: "75%", left: "85%" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-gray-100 rounded-full animate-bounce opacity-45"
          style={{ top: "85%", left: "10%" }}
        ></div>

        {/* Subtle decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-10 animate-pulse">
          <div className="w-full h-full bg-gray-300 rounded-full relative">
            <div className="absolute -top-2 -right-1 w-3 h-4 bg-gray-300 rounded-full transform rotate-45"></div>
            <div className="absolute -top-2 -left-1 w-3 h-4 bg-gray-300 rounded-full transform -rotate-45"></div>
          </div>
        </div>

        <div className="absolute top-3/4 right-1/4 w-6 h-6 opacity-8 animate-bounce">
          <div className="w-full h-full bg-gray-200 rounded-full relative">
            <div className="absolute -top-1 -right-0.5 w-2 h-3 bg-gray-200 rounded-full transform rotate-45"></div>
            <div className="absolute -top-1 -left-0.5 w-2 h-3 bg-gray-200 rounded-full transform -rotate-45"></div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/2 left-1/6 w-12 h-12 opacity-5 animate-spin-slow">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
        </div>

        <div className="absolute top-1/3 right-1/6 w-10 h-10 opacity-8 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-4xl font-bold mb-4 tracking-wide bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 bg-clip-text text-transparent">
            Mozilla Campus Club of SLIIT
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 font-light">2024/25</h2>
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Links Section - Side by Side */}
        <div className="mb-12 w-full max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center italic">
                {/* Social Links */}
              </h3>
              <div className="grid gap-4 w-full max-w-md mx-auto">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative bg-gradient-to-r ${link.color} p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-lg">{link.name}</span>
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center italic">
                {/* Quick Links */}
              </h3>
              <div className="grid gap-4 w-full max-w-md mx-auto">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                    rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group relative bg-gradient-to-r ${link.color} p-4 rounded-lg border border-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-lg">{link.name}</span>
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          {/* <p>sliitmozilla</p> */}
          {/* <p>2024/25</p> */}
        </div>
      </div>
    </main>
  )
}
