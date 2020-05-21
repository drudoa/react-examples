import React, { useEffect } from "react"

export default function usePlaystatus(videoRef) {
    const [status, setStatus] = React.useState('paused')

    useEffect(() => {
        const hasEnded = () => {

            if (video.currentTime >= video.duration || video.ended) {
                setStatus('ended')
            } else if (video.paused) {
                setStatus('paused')
            }
        }

        if (videoRef == null || videoRef.current === undefined) return
        const video = videoRef.current
        video.onplaying = () => setStatus('playing')
        video.addEventListener('timeupdate', hasEnded)

        return () => {
            video.onplaying = undefined
            video.removeEventListener('timeupdate', hasEnded)
        }
    }, [status, videoRef])

    return status
}