import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PictureInPictureAltIcon from '@material-ui/icons/PictureInPictureAlt'

const useStyles = makeStyles(theme => ({
    button: {
        padding: 6,
        fontSize: '28px',
        color: 'white'
    }
}))

const PicInPicButton = ({ videoRef, color = 'white' }) => {
    const [render] = useState(document.pictureInPictureEnabled)
    const [disabled, setDisabled] = useState(false)
    const classes = useStyles()

    const handleClick = async () => {
        if (videoRef === null) return
        setDisabled(true)

        try {
            if (videoRef.current !== document.pictureInPictureElement) {
                await videoRef.current.requestPictureInPicture()
            } else {
                await document.exitPictureInPicture()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setDisabled(false)
        }
    }

    return (
        <>
            {render &&
                <IconButton
                    onClick={handleClick}
                    className={classes.button}
                    aria-label="pictue in pictue"
                    disabled={disabled}
                >
                    <PictureInPictureAltIcon style={{ color: color }} />
                </IconButton>
            }
        </>
    )
}

export default PicInPicButton