import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    pill: {
        position: 'relative',
        width: 90,
        minWidth: 90,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#19cebd',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: 5,
        '&:last-child': {
            marginRight: 0
        },
        cursor: 'pointer'
    },
    avatar: {
        width: 24,
        height: 24,
        left: 3
    },
    '@keyframes timeout': {
        from: {
            transform: 'scaleX(1)'
        },
        to: {
            transform: 'scaleX(0)'
        }
    },
    timer: {
        position: 'absolute',
        left: 0,
        backgroundColor: '#20ead7d9',
        width: '100%',
        height: '100%',
        transformOrigin: '0 0',
        animationName: '$timeout',
        animationDuration: props => props.timeout,
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards'
    },
    amount: {
        position: 'relative',
        right: -8,
        fontWeight: 'bold',
        color: 'black'
    },
}))

const SuperChatPill = ({ user, msg, onClick, timeout }) => {
    const classes = useStyles({ timeout })

    const handle = () => {
        if (onClick instanceof Function) {
            onClick(msg.id)
        }
    }

    return (
        <>
            <div
                className={classes.pill}
                onClick={handle}
            >
                <div className={classes.timer} />
                {user.isGuest ? (
                    <Avatar className={classes.avatar} size="medium" >
                        <AccountCircleIcon />
                    </Avatar>
                ) : (
                        <Avatar alt={user.name} src={user.avatar} className={classes.avatar} />
                    )}

                <Typography component={'div'} className={classes.amount}>
                    ${msg.amount}
                </Typography>
            </div>
        </>
    )
}

export default SuperChatPill 