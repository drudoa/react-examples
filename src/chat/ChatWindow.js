import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
import SuperChatMessage from './SuperChatMessage'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  window: {
    backgroundColor: theme.palette.background.default,
    overflow: 'auto',
    transition: 'height 0.3s ease-in-out',
    paddingBottom: 8
  },
  superChat: {
    margin: '8px 14px 0 14px'
  },
}))

const List = ({ data, style }) => {
  const classes = useStyles()

  return data.map((row, index) => {
    if (row.msg.superChat) {
      return (
        <SuperChatMessage
          key={index}
          user={row.user}
          msg={row.msg}
          className={classes.superChat}
        />
      )
    } else {
      return (<Message
        style={style}
        key={index}
        user={row.user}
        msg={row.msg}
        showTime={true}
      />)
    }
  })
}

function ChatWindow({ data, width = 425, height = 600, scrollVisable = () => { } }) {
  const classes = useStyles()
  const listRef = useRef()

  useEffect(() => {
    const list = listRef.current
    list.scrollTop = list.scrollHeight
    scrollVisable(list.scrollHeight > height)
  }, [data])

  return (
    <div className={classes.window} style={{ width: width, height: height - 8 }} ref={listRef} >
      {data !== undefined && (
        <List
          className={classes.list}
          data={data}
        />
      )}
    </div>
  )
}

ChatWindow.propTypes = {
  data: PropTypes.array
}

export default ChatWindow