"use client"

import { useState } from "react"
import GenerateLinkForm from "./GenerateLinkForm"
import LinksTable from "./LinksTable"

export default function DashboardContent() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center justify-center">
        <GenerateLinkForm onLinkCreated={() => setRefreshKey((key) => key + 1)} />
      </div>
      <LinksTable refreshKey={refreshKey} />
    </div>
  )
}
