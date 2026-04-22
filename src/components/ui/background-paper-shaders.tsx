"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function BackgroundPaperShaders({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: "100%", height: "100%", position: "relative" }}>
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={["#000000", "#ffffff", "#000000", "#ffffff"]}
        speed={2.8}
      />

      {/* subtle ambient lighting overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl animate-pulse" style={{ animationDuration: "2s", animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/[0.03] rounded-full blur-xl animate-pulse" style={{ animationDuration: "4s", animationDelay: "0.5s" }} />
      </div>
    </div>
  )
}
