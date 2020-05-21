import React from 'react'
import Typography from '@material-ui/core/Typography'
import { formatTime } from './helpers'
import useCurrentTime from './useCurrentTime'

const TimeDisplay = ({ videoRef, color = 'white', ...props }) => {
    const { currentTime, duration } = useCurrentTime(videoRef)

    return (
        <Typography
            variant={'body2'}
            style={{
                color: color,
                display: 'flex',
                alignItems: 'center',
                flex: 1
            }}
            className={props.className}
            component={'div'}
        >
            {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
    )
}

export default TimeDisplay