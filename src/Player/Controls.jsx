import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import PlayButton from './PlayButton'
import TimeDisplay from './TimeDisplay'
import VolumeControl from './VolumeControl'
import PicInPicButton from './PicInPicButton'
import FullsreenButton from './FullscreenButton'
import ProgressBar from './ProgressBarContainer'
import usePlayStatus from './usePlayStatus'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'calc(100% - 20px)'
    },
    controlItems: {
        display: 'flex',
        alignItems: 'stretch',
    },
    slider: {
        width: 'calc(100% - 24px)'
    },
    padding: {
        padding: 6
    }
}))

const Controls = ({ videoRef = null, className = null }) => {
    const classes = useStyles()
    // const [seeking, setSeeking] = useState(false)
    // const [wasPlaying, setWasPlaying] = useState(false)
    const playState = usePlayStatus(videoRef)

    const seek = (value) => {
        // if (!seeking) {
        //     setWasPlaying(!videoRef.current.paused)
        //     setSeeking(true)
        // }

        videoRef.current.currentTime = value
    }

    // useEffect(() => {
    //     if (seeking) {
    //         videoRef.current.pause()
    //     } else {
    //         if (wasPlaying)
    //             videoRef.current.play()
    //     }

    // }, [seeking, videoRef, wasPlaying])

    const handlePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    return (
        <div className={classes.root} >
            <div className={classes.slider}>
                <ProgressBar
                    videoRef={videoRef}
                // onChange={seek}
                // onChanged={() => setSeeking(false)}
                />
            </div>
            <div className={classes.controls}>
                <div className={classes.controlItems}>
                    <PlayButton value={playState} onClick={handlePlay} />
                    <VolumeControl videoRef={videoRef} />
                    <TimeDisplay className={classes.padding} videoRef={videoRef} />
                </div>
                <div className={classes.controlItems}>
                    <PicInPicButton videoRef={videoRef} />
                    <FullsreenButton videoRef={videoRef} />
                </div>
            </div>
        </div>
    )
}

export default Controls