import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faGithub,
  faYoutube,
  faMedium,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faUserPlus, faEnvelope } from "@fortawesome/free-solid-svg-icons"

export default function Home() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: faInstagram,
      url: "https://instagram.com/sliitmozilla",
    },
    {
      name: "Facebook",
      icon: faFacebook,
      url: "https://facebook.com/sliitmozilla",
    },
    {
      name: "LinkedIn",
      icon: faLinkedin,
      url: "https://linkedin.com/company/sliitmozilla",
    },
    {
      name: "GitHub",
      icon: faGithub,
      url: "https://github.com/Mozilla-Campus-Club-of-SLIIT",
    },
    {
      name: "YouTube",
      icon: faYoutube,
      url: "https://youtube.com/@sliitmozilla",
    },
    {
      name: "Medium",
      icon: faMedium,
      url: "https://medium.com/@sliitmozilla",
    },
    {
      name: "Twitter",
      icon: faTwitter,
      url: "https://twitter.com/sliitmozilla",
    },
    {
      name: "Website",
      icon: faGlobe,
      url: "https://mozilla.sliit.lk",
    },
    {
      name: "Contact Us",
      icon: faEnvelope,
      url: "mailto:mozilla@sliit.lk",
    },
    {
      name: "Join the Club",
      icon: faUserPlus,
      url: "https://forms.gle/mozilla-sliit-join",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col justify-center">
      {/* Header with Logo */}
      <div className="flex justify-center pb-2">
        <img
          src="/mozilla-logo.png"
          alt="Mozilla Campus Club Logo"
          className="max-w-20 max-h-20 sm:max-w-24 sm:max-h-24 md:max-w-32 md:max-h-32 lg:max-w-36 lg:max-h-36 object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 py-4 relative">
        {/* Links heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-orange-500 tracking-wide">
            {/* MozLinks Portal */}
          </h2>
        </div>

        {/* Social Links */}
        <div className="w-full max-w-4xl relative z-10">
          {/* Grid layout for desktop, stack for mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block relative ${link.name === "Twitter" ? "sm:hidden" : ""}`}
              >
                {/* Orange shadow */}
                <div className="absolute inset-0 bg-orange-500 rounded-2xl transform translate-x-2 translate-y-2"></div>

                {/* Main button */}
                <div className="relative bg-white border-2 border-black rounded-2xl p-3 sm:p-4 hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 ease-out">
                  <div className="flex items-center justify-between">
                    <span className="text-black font-medium text-sm sm:text-lg">{link.name}</span>
                    <FontAwesomeIcon icon={link.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 mb-8">
          <p className="text-gray-500 text-sm text-center">
            © 2025 Mozilla Campus Club of SLIIT. Made with ❤️ by SLIIT Mozillians
          </p>
        </div>

        {/* Footer logo */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <img
              src="/mozilla-logo.png"
              alt="Mozilla Campus Club Logo"
              className="max-w-12 max-h-12 sm:max-w-16 sm:max-h-16 md:max-w-20 md:max-h-20 lg:max-w-24 lg:max-h-24 mx-auto mb-2 object-contain"
            />
            <p className="text-gray-500 text-sm">Mozilla Campus Club of SLIIT</p>
          </div>
        </div> */}
      </div>
    </main>
  )
}
