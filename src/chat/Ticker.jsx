import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SuperChatPill from './SuperChatPill'
import { isNumber } from 'util'

const useStyles = makeStyles(theme => ({
    ticker: {
        display: 'flex',
        flex: 1,
        width: '100%',
        // '&::-webkit-scrollbar': {
        //     display: 'none'
        // },
        // msOverflowStyle: 'none',
    }
}))

const Render = ({ data, onClick }) => {
    return data.map((pill) => {
        return <SuperChatPill key={pill.msg.id} user={pill.user} msg={pill.msg} onClick={onClick} timeout={pill.msg.timeout} />
    })
}

const Ticker = ({ data, onClick, delay }) => {
    const classes = useStyles()
    const [show, setShow] = useState(delay === null ? true : false)

    useEffect(() => {
        if (delay === null && !isNumber(delay)) return

        const timer = setTimeout(() => {
            setShow(true)
        }, [delay])

        return () => {
            clearTimeout(timer)
        }
    }, [])
    return (
        <div className={classes.ticker}>
            {(data && show) && <Render data={data} onClick={onClick} />}
        </div>
    )
}

export default Ticker 