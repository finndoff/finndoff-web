'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { SanityImage } from '@/components/ui/SanityImage'
import type { VideoEmbedSection } from '@/types/sanity'

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  )
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`

  return null
}

function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  )
  if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
  return null
}

export function VideoEmbed({ section }: { section: VideoEmbedSection }) {
  const [playing, setPlaying] = useState(false)
  const embedUrl = getEmbedUrl(section.videoUrl)

  if (!embedUrl) return null

  const fallbackThumb = getYouTubeThumbnail(section.videoUrl)

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6">
        {section.title && (
          <h2 className="mb-8 text-center font-display text-3xl font-bold lg:text-4xl">
            {section.title}
          </h2>
        )}
        <div className="verksted-card relative aspect-video overflow-hidden bg-navy-900">
          {playing ? (
            <iframe
              src={embedUrl}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={section.title || 'Video'}
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center"
            >
              {section.thumbnail?.asset ? (
                <SanityImage
                  image={section.thumbnail}
                  width={1280}
                  height={720}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : fallbackThumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fallbackThumb}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-navy-900/20" />
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-navy-900 shadow-[var(--shadow-verksted-lg)] transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 fill-current" />
              </div>
            </button>
          )}
        </div>
        {section.caption && (
          <p className="mt-4 text-center text-sm text-navy-500">{section.caption}</p>
        )}
      </div>
    </section>
  )
}
