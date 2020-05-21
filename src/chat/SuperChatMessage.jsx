import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    header: {
        padding: '8px 16px 8px 16px'
    },
    subheader: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'black'
    },
    l0: {
        backgroundColor: '#19cebd',
        '& .MuiCardContent-root': {
            backgroundColor: '#20ead7d9'
        }
    },
    l1: {

    }
}))

const SuperChatMessage = ({ user, msg, level = 0, className }) => {
    const classes = useStyles()

    return (
        <Card className={[classes[`l${level}`], className].join(' ')} >
            <CardHeader
                classes={{
                    subheader: classes.subheader
                }}
                className={classes.header}
                avatar={user.isGuest ? (
                    <Avatar className={classes.avatar} size="medium" >
                        <AccountCircleIcon />
                    </Avatar>
                ) : (
                        <Avatar alt={user.name} src={user.avatar} className={classes.avatar} />
                    )}
                title={user.name}
                subheader={'$' + msg.amount}
            />
            <CardContent style={{ padding: 16 }}>
                <Typography style={{ fontSize: '0.9rem' }}>
                    {msg.value}

                </Typography>
            </CardContent>
        </Card>
    )
}

export default SuperChatMessage 