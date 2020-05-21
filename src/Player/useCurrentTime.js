import { useEffect, useState } from 'react'

const useCurrentTime = (videoRef) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [buffered, setBuffered] = useState(0)
    const [ready, setReady] = useState(false)
    const [wasPlaying, setWasPlaying] = useState(false)

    useEffect(() => {
        if (!videoRef || videoRef.current === undefined) return
        const video = videoRef.current

        const error = () => {
            console.log('error')
        }

        const load = () => {
            console.log('loading')
        }

        const waiting = () => {
            console.log('waiting')
            setReady(false)
        }

        const canPlay = () => {
            console.log('canplay')
            setReady(true)
        }

        const durationChange = () => {
            setDuration(video.duration)
        }

        const seeking = () => {
            console.log(video.seeking)
            // console.log(!video.paused)
        }

        const seeked = () => {
            console.log('seeked')
        }

        const progress = () => {
            if (video.duration > 0) {
                for (let i = video.buffered.length - 1; i >= 0; i--) {
                    if (video.buffered.start(i) < video.currentTime) {
                        setBuffered(video.buffered.end(i) / video.duration)
                        break
                    }
                }
            }
        }

        const update = () => {
            setCurrentTime(video.currentTime)
        }

        video.addEventListener('error', error)
        video.addEventListener('loadstart', load)
        video.addEventListener('waiting', waiting)
        video.addEventListener('seeking', seeking)
        video.addEventListener('seeked', seeked)
        video.addEventListener('canplay', canPlay)
        video.addEventListener('durationchange', durationChange)
        video.addEventListener('timeupdate', update)
        video.addEventListener('progress', progress)

        return () => {
            video.removeEventListener('error', error)
            video.removeEventListener('loadstart', load)
            video.removeEventListener('waiting', waiting)
            video.removeEventListener('seeking', seeking)
            video.removeEventListener('seeked', seeked)
            video.removeEventListener('canplay', canPlay)
            video.removeEventListener('durationchange', durationChange)
            video.removeEventListener('timeupdate', update)
            video.removeEventListener('progress', progress)
        }
    }, [videoRef, setDuration, setCurrentTime])

    return { ready, currentTime, duration, buffered }
}

export default useCurrentTime 