import React from "react"
import GenerateLinkForm from "@/app/components/GenerateLinkForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Links Portal",
  description: "Create and manage short links",
}

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col justify-center bg-gradient-animation py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="background-animation">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4 mt-8">
            Dashboard
          </h1>
 
        </div>

        <div className="flex flex-col items-center justify-center">
          <GenerateLinkForm />
        </div>
      </div>
    </main>
  )
}
