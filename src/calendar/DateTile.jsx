import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
    return {
        tile: props => {
            const size = props.size
            return {
                width: size,
                height: size,
                backgroundColor: 'magenta',
                textAlign: 'right',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                fontSize: '0.9em',
                color: 'white',
                // margin: 3,
                // padding: 2,
                '&:hover': {
                    boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
                    transform: 'scale(1.009)',
                    fontSize: '1em'
                }
            }
        }
    }
})

const DateTile = ({ width = 200, style, num }) => {
    const classes = useStyles({ size: width / 7 })

    return (
        <div className={classes.tile} style={style} >
            {num}
        </div>
    )
}

export default DateTile 