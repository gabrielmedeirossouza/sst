import React from 'react'
import './styles.scss'

import { Channel } from '@sst/channel'

const channel = new Channel<string>('sst')
channel.on((channel, message) => {
  // if (channel !== 'sst') return
  console.log('message', message)
})


export function Video() {
  const video = React.useRef<HTMLVideoElement>(null)
  const [subtitleLines, setSubtitleLines] = React.useState<string[]>([])
  const [progress, setProgress] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const breakLongSubtitle = (subtitle: string) => {
    const words = subtitle.split(' ')
    const subtitleByLine = words.reduce((acc, word) => {
      const last = acc[acc.length - 1]
      if (!last) return [word]

      if (last.length + word.length + 1 > 50) {
        return [...acc, word]
      }

      acc[acc.length - 1] = `${last} ${word}`
      return acc
    }, [] as string[])

    return subtitleByLine
  }

  const onVideoLoaded = React.useCallback((video: HTMLVideoElement) => {
    video.addEventListener('play', () => {
      setIsPlaying(true)
    })

    video.addEventListener('pause', () => {
      setIsPlaying(false)
    })

    video.addEventListener('timeupdate', () => {
      const progress = video.currentTime / video.duration * 100
      setProgress(progress)
    })

    video.textTracks[0].addEventListener("cuechange", (e) => {
      const subtitle = ((e.target as TextTrack).activeCues![0] as VTTCue | undefined)?.text
      if (!subtitle) {
        setSubtitleLines([])
        return
      }

      setSubtitleLines(breakLongSubtitle(subtitle))
    })
  }, [])

  React.useEffect(() => {
    if (!video.current) return
    const videoElement = video.current

    videoElement.addEventListener('loadeddata', () => {
      onVideoLoaded(videoElement!)
    })

    return () => {
      videoElement!.removeEventListener('loadeddata', () => {
        onVideoLoaded(videoElement!)
      })
    }
  }, [onVideoLoaded, video])

  return (
    <div className="component-video">
      <section className="video-area">
        <video ref={video} className="video">
          <source
            src="/video.mp4"
            type="video/mp4"
          />

          <track
            default
            src='/subtitle.vtt'
            kind="metadata"
            srcLang="en"
            label="English"
          />
        </video>

        <section className="control">
          <section className="control__actions">
            <button
              type="button"
              onClick={() => {
                if (!video.current) return

                if (video.current.paused) video.current.play()
                else video.current.pause()
              }}
            >{isPlaying ? ">" : "||"}</button>

            <button
              type="button"
              onClick={() => {
                if (!video.current) return

                video.current.currentTime -= 3
              }}
            >{"<<"}</button>

            <button
              type="button"
              onClick={() => {
                if (!video.current) return

                video.current.currentTime += 3
              }}
            >{">>"}</button>
          </section>

          <section className="control__progress-area">
            <progress
              className="control__progress-area__progress"
              value={progress}
              max={100}
            />
          </section>
        </section>
      </section>

      <section className="subtitle-area">
        {Boolean(subtitleLines.length) && (
          <div className="subtitle-area__container">
            {subtitleLines.map((text, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <br />}
                <span>{text}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}