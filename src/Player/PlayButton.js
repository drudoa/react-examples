import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import Replay from '@material-ui/icons/Replay'

const useStyles = makeStyles(theme => ({
    button: {
        // margin: '4px',
        padding: '6px',
        fontSize: '28px'
    }
}))

const IconSelect = ({ state, color = 'white' }) => {
    switch (state) {
        case 'paused':
            return (<PlayArrow htmlColor={color} fontSize='inherit' />)
        case 'ended':
            return (<Replay htmlColor={color} fontSize='inherit' />)
        case 'play':
        default:
            return (<Pause htmlColor={color} fontSize='inherit' />)
    }
}
const PlayButton = ({ value, onClick, ...props }) => {
    const classes = useStyles()

    return (
        <IconButton
            onClick={onClick}
            className={classes.button}
            aria-label="play"
        >
            <IconSelect state={value} color={props.color} />
        </IconButton>
    )
}

export default PlayButton