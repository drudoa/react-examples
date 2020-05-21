import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RangeInput from './RangeInput'
import MuteButton from './MuteButton'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    padding: {
        padding: 6
    }
}))

const VolumeControl = ({ videoRef, color = 'white' }) => {
    const classes = useStyles()
    const [volume, setVolume] = useState(1)
    const [prevVol, setPrevVol] = useState(1)

    useEffect(() => {
        videoRef.current.volume = volume
    }, [volume])

    const handleClick = () => {
        if (volume > 0) {
            setVolume(0)
        } else {
            setVolume(prevVol)
        }
    }

    const handleChange = (volume) => {
        // volume returned from RangeInput only changes when slider is moved manualy
        setVolume(volume)
    }

    const handleUp = (volume) => {
        if (volume > 0) {
            setPrevVol(volume)
        }
    }

    return (
        <div className={classes.root} >
            <MuteButton volume={volume} onClick={handleClick} color={color} />
            <RangeInput
                className={classes.padding}
                width={50}
                value={volume}
                onChange={handleChange}
                onMouseUp={handleUp}
                max={1}
                filledColor={color}
                handleColor={color}
            />
        </div>
    )
}

export default VolumeControl