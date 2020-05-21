import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProgressBar from './ProgressBar'
import useFindDimentions from './useFindDimentions'
import useOnDrag from './useOnDrag'
import TimeIndicator from './TimeIndicator'
import useCurrentTime from './useCurrentTime'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        width: '100%',
        height: 18,
        cursor: 'pointer',
    }
}))

const Container = ({
    videoRef,
    onChange = () => { },
    // onChanged = () => { },
    thumbs = null
}) => {
    const classes = useStyles()
    const progressRef = useRef()
    const rect = useFindDimentions(progressRef)
    const [mouseOver, setMouseOver] = useState(false)
    const [isDragging, mousePosition] = useOnDrag(progressRef, { onTrigger: mouseOver })
    const { currentTime, duration, buffered } = useCurrentTime(videoRef)

    const setMouse = () => {
        setMouseOver(prev => !prev)
    }

    const seek = (value) => {
        videoRef.current.currentTime = (value * duration).toFixed(2)
    }

    return (
        <div
            className={classes.root}
            ref={progressRef}
            onMouseOver={setMouse}
            onMouseOut={setMouse}
        >
            <TimeIndicator
                position={(mousePosition.x - rect.x)}
                max={rect.width}
                show={mouseOver || isDragging}
                maxTime={duration}
                thumbs={thumbs}
            />

            <ProgressBar
                value={(currentTime / duration)}
                width={rect.width}
                mousePos={mousePosition.x - rect.x}
                mouseOver={mouseOver}
                buffered={buffered}
                isDragging={isDragging}
                onChange={seek}
            // onChanged={onChanged}
            />
        </div>
    )
}

export default Container