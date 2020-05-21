import React from 'react'
import useFullscreenStatus from './useFullscreenStatus'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'

const useStyles = makeStyles(theme => ({
    button: {
        // margin: '4px',
        padding: 6,
        fontSize: '28px',
        color: 'white'
    }
}))


const FullscreenButton = ({ videoRef }) => {
    const classes = useStyles()
    const [isFullscreen, setFullscreen] = useFullscreenStatus(videoRef)

    return (
        <IconButton
            onClick={() => setFullscreen(!isFullscreen)}
            className={classes.button}
            aria-label="play"
        >
            {isFullscreen ?
                <FullscreenExitIcon fontSize='inherit' />
                :
                <FullscreenIcon fontSize='inherit' />
            }
        </IconButton>
    )
}

export default FullscreenButton