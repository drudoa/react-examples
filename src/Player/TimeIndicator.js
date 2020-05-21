import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { formatTime } from './helpers'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    timeInditorContainer: {
        position: 'absolute',
        left: props => props.width / -2,
        bottom: 23,
        width: props => props.width,
        height: props => props.height,
    },
    timeInditor: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(0,0,0,0.6)',
        opacity: 0,
        borderRadius: 2,
        transition: 'all 0.15s ease-in-out'
    },
    thumbs: {
        width: props => props.width,
        height: props => props.height,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

const TimeIndicator = ({
    show = false,
    position,
    max,
    maxTime,
    thumbs = null
}) => {
    const [time, setTime] = useState('')
    const [lastPosition, setLastPosition] = useState(0)
    const [thumbWidth] = useState(thumbs ? 160 : 50)
    const classes = useStyles({ width: thumbWidth, height: (thumbs ? 90 : 25) })

    const seconds = useCallback((val) => {
        return val * maxTime / max
    }, [maxTime, max])

    const calPos = useCallback((val) => {
        const origin = thumbWidth / 2
        let newPos = val

        if (val <= origin) {
            newPos = origin
        } else if (val >= (max - origin)) {
            newPos = max - origin
        }
        return newPos
    }, [max, thumbWidth])

    useEffect(() => {
        if (show) {
            let val

            if (position <= 0) {
                val = 0
            } else if (position >= max) {
                val = max
            } else {
                val = position
            }


            setTime(formatTime(seconds(val)))
            setLastPosition(calPos(position))
        }
    }, [show, position, max, setTime, calPos, seconds])


    return (
        <div
            className={classes.timeInditorContainer}
            style={{
                transform: show ? `translateX(${calPos(position)}px)` : `translateX(${lastPosition}px)`
            }}
        >
            <div
                className={classes.timeInditor}
                style={{
                    opacity: show ? 1 : 0
                }}
            >
                <div
                    className={classes.thumbs}
                    style={{
                        backgroundImage: (thumbs ? `url(${thumbs})` : ''),
                        backgroundPositionX: Math.floor(seconds(position)) * thumbWidth || 0,
                        backgroundPositionY: 0
                    }}
                >
                    <Typography style={{ color: 'white' }}>{time}</Typography>
                </div>
            </div>
        </div>
    )
}

export default TimeIndicator