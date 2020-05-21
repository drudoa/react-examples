import React, { useState, useRef, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useOnDrag from './useOnDrag'
import useFindDimentions from './useFindDimentions'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: props => props.width || '100%',
        cursor: 'pointer'
    },
    track: {
        overflow: 'hidden',
        position: 'relative',
        height: props => props.handleSize || 12,
        width: '100%',
        backgroundColor: props => props.trackColor
    },
    handle: {
        position: 'absolute',
        top: '50%',
        width: props => props.handleSize || 12,
        height: props => props.handleSize || 12,
        borderRadius: props => props.borderRadius || props.handleSize / 2 || 6,
        marginTop: props => props.handleSize / -2 || -6,
        backgroundColor: props => props.handleColor || 'grey',
        '&::before': {
            backgroundColor: props => props.filledColor,
            left: props => props.width * -1
        },
        '&::after': {
            left: props => props.handleSize || 12,
            backgroundColor: props => props.backgroundColor || 'rgba(0,0,0,.2)',
        },
        '&::before, &::after': {
            content: "''",
            position: 'absolute',
            display: 'block',
            top: '50%',
            height: 3,
            marginTop: -2,
            width: props => props.width
        }
    }
}))

// props
// width
// filledColor
// trackColor 
// handleColor
// borderRadius
// handleSize

const RangeInput = ({
    width = 129,
    value = 0.5,
    min = 0,
    max = 1,
    onChange,
    // onMouseDown = () => { },
    onMouseUp,
    ...props
}) => {

    const ref = useRef()
    const [isDragging, mousePosition] = useOnDrag(ref)
    const rect = useFindDimentions(ref)
    const [position, setPosition] = useState(((value / (max - min)) * width))
    const classes = useStyles({ width, ...props })
    const handleSize = props.handleSize || 12

    const calValue = (val) => {
        // map mouse postion relative to element
        const x = val - handleSize

        if (x <= 0) {
            return min
        } else if (x >= (width - handleSize)) {
            return max
        } else {
            return (x / (width - handleSize) * (max - min)).toFixed(2)
        }
    }

    useEffect(() => {
        if (value <= min) {
            setPosition(0)
        } else if (value >= max) {
            setPosition(width - handleSize)
        } else {
            const newVal = ((value / (max - min)) * (width - handleSize))
            setPosition(newVal)
        }
    }, [value, handleSize, width, max, min])

    useEffect(() => {
        if (isDragging) {
            if (onChange instanceof Function) {
                onChange(calValue(mousePosition.x - rect.x))
            }
        }
    }, [mousePosition, onChange, isDragging])

    useEffect(() => {
        // only fire when dragging changes from true to false
        if (!isDragging) {
            if (onMouseUp instanceof Function)
                onMouseUp(calValue(mousePosition.x - rect.x))
        }
    }, [isDragging])

    return (
        <div className={[classes.root, props.className].join(' ')} ref={ref}>
            <div className={classes.track}>
                <div
                    className={classes.handle}
                    style={{
                        transform: `translateX(${position}px)`
                    }}
                />
            </div>
        </div>
    )
}

export default RangeInput