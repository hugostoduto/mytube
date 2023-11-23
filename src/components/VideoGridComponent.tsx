import { formatTimeAgo } from '@/utils/formartTimeAgo'
import { formatDuration } from '@/utils/formatDurations'
import React, {useState, useRef, useEffect} from 'react'
import Image from '../../node_modules/next/image'

type VideoGridItemProps = {
  id: string
  title: string
  channel: {
    id: string
    name: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
  
}
const VIEW_FORMATTER = Intl.NumberFormat(undefined,{notation:"compact"})
const VideoGridComponent = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) => {
const [videoPlaying, setVideoPlaying] = useState(false)  
const videoRef = useRef<HTMLVideoElement>(null)
useEffect(() => {
  if(videoRef.current == null) return

  if(videoPlaying){
    videoRef.current.currentTime = 0
    videoRef.current.play()
  } else {
    videoRef.current.pause()
  }
}, [videoPlaying])

  return (
    <div className="flex flex-col gap-2" onMouseEnter={() => setVideoPlaying(true)} onMouseLeave={() => setVideoPlaying(false)}>
      <a href={`/wtach?v=${id}`} className="relative aspect-video">
        
        <img alt={thumbnailUrl} src={thumbnailUrl} className={`block w-full object-cover  h-full transition-[border-radius] duration-200 ${videoPlaying ? "rounded-node" : "rounded-xl"}`}/>
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video className={`block h-full object-cover absolute inset-0 transition-opacity duration-200  ${videoPlaying ? "opacity-100 delay-200" : "opacity-0"}`} ref={videoRef} muted playsInline src={videoUrl} />
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shirink-0">
          <img src={channel.profileUrl} alt="" className="w-12 h-12 rounded-full" />
        </a>
        <div className="flex flex-col">

        <a href={`/wtach?v=${id}`} className="font-bold">
          {title}
        </a>
        <a href={`/@${channel.id}`} className="text-secondary-text text-small">
          {channel.name}
        </a>
        <div className="text-secondary-text text small">
          {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
        </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGridComponent