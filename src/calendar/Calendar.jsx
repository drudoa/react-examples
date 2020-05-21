import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import DateTile from './DateTile'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
        // justifyContent: 'space-between'
    }
}))

const Renderer = ({ num }) => {
    let tiles = []

    for (let i = 0; i < num; i++) {
        tiles.push(
            <DateTile key={i} num={i + 1} />
        )
    }

    return tiles
}

const Calendar = (props) => {
    const classes = useStyles()
    const [numDays, setNumdays] = useState(0)

    useEffect(() => {
        setNumdays(moment(props.date || Date.now()).daysInMonth())
    }, [])

    return (
        <div
            className={classes.container}
            style={
                { width: props.width || 200 }
            }
        >
            <Renderer num={numDays} />
        </div>
    )
}

export default Calendar 