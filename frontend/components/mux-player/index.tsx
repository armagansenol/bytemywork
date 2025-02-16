"use client"

import MuxPlayer from "@mux/mux-player-react"

interface MuxVideoProps {
  playbackId: string
  title?: string
  className?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  autoPlay?: boolean
  playsInline?: boolean
  muted?: boolean
  loop?: boolean
  viewerId?: string
}

export default function MuxVideo({
  playbackId,
  title,
  className = "w-full h-full",
  primaryColor = "#ffffff",
  secondaryColor = "#000000",
  accentColor = "#76fb51",
  autoPlay = true,
  playsInline = true,
  muted = true,
  loop = true,
  viewerId,
}: MuxVideoProps) {
  if (!playbackId) return null

  return (
    <MuxPlayer
      className={className}
      playbackId={playbackId}
      metadata={{
        video_title: title,
        viewer_user_id: viewerId,
      }}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      accentColor={accentColor}
      autoPlay={autoPlay}
      playsInline={playsInline}
      muted={muted}
      loop={loop}
    />
  )
}
