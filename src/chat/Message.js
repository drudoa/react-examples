import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'self-start',
        paddingTop: 8,
        fontSize: 13
    },
    button: {
        padding: 0
    },
    avatar: {
        marginLeft: 14,
        width: 24,
        height: 24
    },
    text: {
        marginLeft: 14,
        marginRight: 14,
        wordBreak: 'break-word',
        lineHeight: '1.3em'
    },
    timestamp: {
        color: 'darkgrey',
        fontFamily: "Segoe UI Emoji"
    },
    username: {
        color: 'grey',
        // textDecoration: 'underline '
        fontWeight: 600
    }
}))

function Message({ user, msg, showTime = false }) {
    const classes = useStyles()
    return (
        <Typography className={classes.container} component="div">
            {user.isGuest ? (
                <Avatar className={classes.avatar} size="medium" >
                    <AccountCircleIcon />
                </Avatar>
            ) : (
                    <Avatar alt={user.name} src={user.avatar} className={classes.avatar} />
                )}
            <Box textAlign="left" className={classes.text}>
                <span className={classes.username}>
                    {user.name}:
                </span>
                {' '}
                {showTime && (
                    < span className={classes.timestamp}>
                        {moment(msg.timestamp).fromNow()}
                    </span>
                )}
                {' '}
                <span>
                    {msg.value}
                </span>
            </Box >
        </Typography >
    )
}

Message.propTypes = {
    user: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
}

export default Message