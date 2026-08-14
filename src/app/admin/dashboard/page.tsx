import React from "react"
import GenerateLinkForm from "../components/GenerateLinkForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Links Portal",
  description: "Create and manage short links",
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-gradient-to-tr from-orange-300/20 to-orange-100/30 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-gradient-to-br from-blue-300/20 to-purple-100/30 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[40%] left-[20%] w-64 h-64 rounded-full bg-gradient-to-tr from-pink-300/10 to-red-100/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-orange-600 uppercase bg-orange-100/80 rounded-full ring-1 ring-inset ring-orange-500/20">
            Admin Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 tracking-tight mb-4">
            Dashboard
          </h1>
 
        </div>

        <div className="flex flex-col items-center justify-center">
          <GenerateLinkForm />
        </div>
      </div>
    </div>
  )
}
