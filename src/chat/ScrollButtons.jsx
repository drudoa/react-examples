import React, { useRef, useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
// import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/ButtonBase'

const useStyles = makeStyles(theme => ({
    root: {
        width: props => props.width,
        display: 'flex',
        flexDirection: 'row'
    },
    children: {
        overflow: 'hidden'
    },
    spacer: {
        width: 18,
        minWidth: 18
    },
    buttons: {
        width: 18,
        minWidth: 18
    }
}))

const ScrollButtons = ({ children, width, itemWidth = 1 }) => {
    const classes = useStyles({ width })
    const ref = useRef()
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    useEffect(() => {
        if (!ref.current) return
        setItemsPerPage(Math.floor(width / itemWidth))
        setMaxPage(Math.floor(ref.current.scrollWidth / width))

    }, [ref, children, itemWidth, width])

    const dir = useCallback((dir) => {
        if (page < 0)
            setPage(0)
        else if (page > maxPage)
            setPage(maxPage)
        else
            setPage(prev => prev + dir)
    }, [setPage, page])

    useEffect(() => {
        const scroll = (event) => {
            if (ref.current == null) return
            if (ref.current.contains(event.target)) {
                event.preventDefault()
                dir(Math.sign(event.deltaY))
            }
        }

        window.addEventListener('wheel', scroll, { passive: false, capture: 'bubble' })
        return () => {
            window.removeEventListener('wheel', scroll, { passive: false, capture: 'bubble' })
        }
    }, [])

    useEffect(() => {
        // if (maxPage <= 1) return
        if (page > maxPage) {
            setPage(maxPage)
        }

        ref.current.scrollLeft = itemWidth * itemsPerPage * page
    }, [page, itemsPerPage, maxPage, itemWidth])


    return (
        <div className={classes.root}>
            {page > 0 ? (
                <Button onClick={() => dir(-1)} dirsize="small" className={classes.buttons}>
                    <ArrowBackIosIcon fontSize="inherit" />
                </Button>
            ) : (<div className={classes.spacer} />)}

            <div className={classes.children} ref={ref}>
                {children}
            </div>

            {page < maxPage ? (
                <Button onClick={() => dir(1)} dirsize="small" className={classes.buttons}>
                    <ArrowForwardIosIcon fontSize="inherit" />
                </Button>

            ) : (<div className={classes.spacer} />)}
        </div>
    )
}

export default ScrollButtons 