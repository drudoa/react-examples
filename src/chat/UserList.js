import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { FixedSizeList as List } from 'react-window'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'self-start',
        paddingTop: 14,
        fontSize: 14
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
        marginRight: 14
    },
    timestamp: {
        color: 'darkgrey',
        fontFamily: "Segoe UI Emoji"
    },
    username: {
        color: 'grey',
    }
}))

const Row = ({ data, index, style }) => {
    const classes = useStyles()
    return (
        <Typography style={style} key={index} className={classes.container} component="div">
            {data[index].isGuest ? (
                <Avatar className={classes.avatar} size="medium" >
                    <AccountCircleIcon />
                </Avatar>
            ) : (
                    <Avatar alt={data[index].name} src={data[index].avatar} className={classes.avatar} />
                )}
            <Box textAlign="left" className={classes.text}>
                <span className={classes.username}>
                    {data[index].name}
                </span>
            </Box >
        </Typography >
    )
}

function UserList({ users, width = 385, height = 500 }) {
    const classes = useStyles()

    return (
        <Box className={classes.box} width={width} height={height} >
            {users !== undefined && (
                <List
                    height={height}
                    width={width}
                    itemSize={38}
                    itemCount={users.length}
                    itemData={users}
                >
                    {Row}
                </List>
            )}
        </Box>
    )
}

export default UserList