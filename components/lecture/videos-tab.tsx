"use client"

import { useState } from "react"
import { Video, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface VideosTabProps {
  videos: {
    id: string
    title: string
    youtube_url: string
    topic: string | null
  }[]
}

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[1].length === 11 ? match[1] : null
}

export function VideosTab({ videos }: VideosTabProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  if (videos.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <Video className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No videos for this lecture yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Group videos by topic
  const grouped: Record<string, typeof videos> = {}
  for (const video of videos) {
    const topic = video.topic || "General"
    if (!grouped[topic]) grouped[topic] = []
    grouped[topic].push(video)
  }

  const topics = Object.keys(grouped)

  return (
    <div className="flex flex-col gap-6">
      {topics.map((topic) => (
        <div key={topic} className="flex flex-col gap-3">
          {topics.length > 1 && (
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{topic}</h3>
              <Badge variant="secondary" className="text-[10px]">
                {grouped[topic].length}
              </Badge>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {grouped[topic].map((video) => {
              const ytId = extractYouTubeId(video.youtube_url)
              const isActive = activeVideoId === video.id

              return (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative">
                    {isActive && ytId ? (
                      <AspectRatio ratio={16 / 9}>
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      </AspectRatio>
                    ) : (
                      <button
                        onClick={() => setActiveVideoId(video.id)}
                        className="group relative w-full"
                      >
                        <AspectRatio ratio={16 / 9}>
                          {ytId ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                              alt={video.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                              <Video className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </AspectRatio>
                        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                            <Play className="h-5 w-5 translate-x-0.5" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <CardContent className="py-3">
                    <p className="text-sm font-medium leading-relaxed">
                      {video.title}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
