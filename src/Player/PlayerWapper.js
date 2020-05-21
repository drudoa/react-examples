import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Controls from './Controls'
import CircularProgress from '@material-ui/core/CircularProgress'
import useCurrentTime from './useCurrentTime'

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%',
        minWidth: 427,
        height: 0
    },
    player: {
        zIndex: -1,
        position: 'absolute',
        top: 0,
        width: '100%',
        outline: 'none',
        userSelect: 'none'
    },
    gradiant: {
        position: 'absolute',
        height: '49px',
        paddingTop: '49px',
        bottom: 0,
        backgroundPosition: 'bottom',
        width: '100%',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.4), transparent)'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buffering: {
        color: 'white'
    }
}))

export default function ({ src, poster }) {
    const classes = useStyles()
    const videoRef = useRef()
    // const { ready } = useCurrentTime(videoRef)

    return (
        <div className={classes.container} id="video-player">
            <div className={classes.gradiant} />
            <video preload="metadata" poster={poster} ref={videoRef} className={classes.player} >
                <source src={src} />
            </video>
            <div className={classes.overlay} >
                {/* {!ready && <CircularProgress className={classes.buffering} thickness={4} size={65} />} */}
            </div>
            <Controls videoRef={videoRef} className={classes.gradiant} />
        </div>
    )
}