import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    progressList: {
        height: 5,
        position: 'relative',
        backgroundColor: 'rgba(255,255,255,.2)',
        transform: 'scaleY(0.6)',
        transition: 'transform 150ms ease-in-out',
        width: props => props.width,
        top: 8
    },
    buffered: {
        backgroundColor: 'rgba(255,255,255,.4)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        transformOrigin: '0 0'
    },
    playTime: {
        backgroundColor: 'red',
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: 0,
        transform: 'scaleX(0)',
        transformOrigin: '0 0'
    },
    hoverProgress: {
        backgroundColor: 'rgba(255,255,255,.5)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        opacity: 0,
        transformOrigin: '0 0',
    },
    scrubberContainer: {
        position: 'absolute',
        left: -6.5,
        top: -4
    },
    scrubberButton: {
        height: 13,
        width: 13,
        borderRadius: 6.5,
        backgroundColor: 'red',
        transition: 'transform 100ms ease-in-out'
    },

}))

const ProgressBar = ({
    value = 0, // %
    width = 1, // in px
    mousePos = 0,
    mouseOver = false, // bool
    buffered = 0, // %
    isDragging = false, // bool
    onChange = () => { },
    // onChanged = () => { }
}) => {
    const classes = useStyles({ width: () => (width) }) // lazy load
    const [pos, setPos] = useState(0)
    const [percent, setPercenct] = useState(0)

    const valueToPercent = useCallback(val => {
        return val / width
    }, [width])

    useEffect(() => {
        if (isDragging) {
            let newPos = valueToPercent(mousePos)
            if (mousePos >= width) {
                newPos = 1
            } else if (mousePos <= 0) {
                newPos = 0
            }
            setPos(newPos * width)
            setPercenct(newPos)
            // onChange(newPos)
        } else {
            setPos(value * width)
            setPercenct(value)

        }
    }, [value, isDragging, mousePos, valueToPercent, onChange, width])

    // useEffect(() => {
    //     if (!isDragging)
    //         onChanged()
    // }, [isDragging, onChanged])

    return (

        <div
            className={classes.progressList}
            style={mouseOver || isDragging ? { transform: 'none' } : {}}
        >
            <div
                className={classes.buffered}
                style={{ transform: `scaleX(${buffered})` }}
            />
            <div
                className={classes.playTime}
                style={{ transform: `scaleX(${percent})` }}
            />
            <div
                className={classes.hoverProgress}
                style={{
                    left: pos || 0,
                    transform: mouseOver && !isDragging ? `scaleX(${valueToPercent(mousePos) - percent})` : 'scaleX(0)', // TODO: fix this
                    // right: mousePos,
                    opacity: mouseOver && !isDragging && mousePos > pos ? 1 : 0
                }}
            />
            <div
                className={classes.scrubberContainer}
                style={{ transform: `translateX(${pos}px) ` }}
            >
                <div
                    className={classes.scrubberButton}
                    style={{ transform: (mouseOver || isDragging ? 'scale(1)' : 'scale(0)') }}
                >
                </div>
            </div>
        </div>

    )
}

export default ProgressBar