import React, { useState, useEffect, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import PeopleIcon from '@material-ui/icons/People';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import MessageInput from './MessageInput'
import ChatWindow from './ChatWindow'
import UserList from './UserList'
import Ticker from './Ticker'
import SuperChat from './SuperChatMessage'
import useOutsideClick from './useOutsideClick'
import useInterval from '../Hooks/useInterval'
import Scroller from './ScrollButtons'


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: props => props.width,
    height: props => props.height
  },
  appbar: {
    height: props => props.superHeight,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    color: theme.palette.text.primary,
    transition: 'height 0.3s ease-in-out'
  },
  toolBar: {
    padding: 0,
    minHeight: 50
  },
  spacer: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
  selectedSuperChat: {
    position: 'absolute',
    top: props => props.superHeight + 6,
    left: 14,
    width: props => props.superWidth,
    transition: 'top 0.3s ease-in-out'
  }
}))

function Chat({ data, users, sentMessage, account, width = 425, height = 760 }) {
  const [state, setState] = useState({
    menu: false,
    superHeight: 50,
    superChats: [],
    selectedSuperChat: null,
    scrollVisable: false,
  })
  const classes = useStyles({ height, width, superHeight: state.superHeight, superWidth: width - (state.scrollVisable ? 28 + 17 : 28) })
  const selectedSuperChatRef = useRef()

  const toggleMenu = () => {
    setState(state => ({
      ...state,
      menu: !state.menu
    }))
  }

  const expired = (message) => {
    return Date.now() - message.timestamp > message.timeout
  }

  const callback = useCallback(() => {
    const res = data.filter(row => (row.msg.superChat && !expired(row.msg)))
    setState(state => ({
      ...state,
      superChats: res
    }))
  }, [data, setState, expired])

  useInterval(() => {
    callback()
  }, 200)

  useEffect(() => {
    if (state.superChats.length > 0)
      setState(state => ({
        ...state,
        superHeight: 88
      }))
    else
      setState(state => ({
        ...state,
        superHeight: 50
      }))
  }, [state.superChats])

  const handleSuperChat = (id) => {
    const res = data.filter(row => {
      return row.msg.id === id
    })

    if (res.length > 0)
      setState(state => ({
        ...state,
        selectedSuperChat: res[0]
      }))
  }

  useOutsideClick(selectedSuperChatRef, () => {
    setState(state => ({
      ...state,
      selectedSuperChat: null
    }))
  })

  return (
    <Card className={classes.root} >
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolBar} >
          {state.menu !== true ? (
            <>
              <div className={classes.spacer} />
              <Typography variant="h6">
                Who's Here
              </Typography>
              <IconButton onClick={toggleMenu} >
                <PeopleIcon />
              </IconButton>
            </>
          ) : (
              <>
                <IconButton onClick={toggleMenu} >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Back to Chat
              </Typography>
              </>
            )}
        </Toolbar>
        {state.superChats.length > 0 && (
          <Scroller width={width} >
            <Ticker data={state.superChats} onClick={handleSuperChat} delay={200} />
          </Scroller>
        )}
        {state.selectedSuperChat && (
          <div className={classes.selectedSuperChat} ref={selectedSuperChatRef}>
            <SuperChat user={state.selectedSuperChat.user} msg={state.selectedSuperChat.msg} />
          </div>
        )}
      </AppBar>
      {state.menu ? (
        <>
          <UserList users={users} />
          <div />
        </>
      ) : (
          <>
            <ChatWindow data={data} height={600 - state.superHeight} scrollVisable={(val) =>
              setState(state => ({
                ...state,
                scrollVisable: val
              }))
            } />
            <MessageInput onClick={sentMessage} account={account} />
          </>
        )}
    </Card>
  )
}

Chat.protoTypes = {

}

export default Chat