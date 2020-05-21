import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
// import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    account: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    item: {
        marginRight: 5
    }
}))

const Account = ({ user }) => {
    const classes = useStyles()

    return (
        <div className={classes.account}>
            {user.isGuest ? (
                <Avatar size="medium" className={classes.item} >
                    <AccountCircleIcon />
                </Avatar>
            ) : (
                    <Avatar alt={user.name} src={user.avatar} className={classes.item} />
                )
            }
            <span className={classes.item}>{user.name}</span>
        </div>
    )
}

export default Account 