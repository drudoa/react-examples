import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'

const useStyles = makeStyles(theme => ({
    button: {
        padding: 6,
        fontSize: '28px',
        color: 'white'
    }
}))

const MuteButton = ({ volume = 1, onClick = () => { }, color = 'white' }) => {
    const [icon, setIcon] = useState(0)
    const classes = useStyles()

    useEffect(() => {
        if (volume === 0) {
            setIcon(0)
        } else if (volume <= 0.5) {
            setIcon(1)
        } else {
            setIcon(2)
        }
    }, [volume])

    const RenderIcon = () => {
        switch (icon) {
            case 0:
                return <VolumeOffIcon fontSize='inherit' style={{ color: color }} />
            case 1:
                return <VolumeDownIcon fontSize='inherit' style={{ color: color }} />
            case 2:
                return <VolumeUpIcon fontSize='inherit' style={{ color: color }} />
            default:
                return <VolumeDownIcon fontSize='inherit' style={{ color: color }} />
        }
    }

    return (
        <IconButton
            onClick={onClick}
            className={classes.button}
            aria-label="mute"
        >
            <RenderIcon />
        </IconButton>
    )
}

export default MuteButton