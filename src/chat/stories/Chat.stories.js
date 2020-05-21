import React, { useState } from 'react'
// import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import Chat from '../Chat'
import Data from './data'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import faker from 'faker'
import 'typeface-roboto'

export default {
    title: 'Chat',
}

const light = createMuiTheme({
    palette: {
        background: {
            default: '#f9f9f9'
        }
    },
})

const dark = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#1f1f1f'
        }
    },
    typography: {
        body1: {

        }
    }
})

const Setup = ({ theme }) => {
    const [data, setData] = useState(Data(1, { includeSuperChats: true }))
    const [users, setUsers] = useState(data.map(el => el.user))
    const [testAccount, setTestAccount] = useState(Data(1)[0].user) // test account for sending messages

    const send = (message) => {
        setData(prev => (
            [
                ...prev,
                {
                    user: testAccount,
                    msg: {
                        id: faker.random.uuid(),
                        value: message,
                        timestamp: Date.now(),
                        superChat: false,
                        amount: 0,
                        level: 0,
                        timeout: 10000
                    }
                }
            ]
        ))
    }

    const addSuperChat = () => {
        const newData = Data(1, { forceSuperChat: true })

        setData(prev => ([
            ...prev,
            ...newData
        ]))

        setUsers(prev => ([
            ...prev,
            newData[0].user
        ]))
    }

    const addMessage = () => {
        const newData = Data(1)

        setData(prev => ([
            ...prev,
            ...newData
        ]))

        setUsers(prev => ([
            ...prev,
            newData[0].user
        ]))
    }

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" onClick={addSuperChat} >Add superChat</Button>
            <Button variant="contained" onClick={addMessage} >Add message</Button>
            < Chat data={data} users={users} sentMessage={send} account={testAccount} />
        </ThemeProvider>
    )
}

export const lightTheme = () => <Setup theme={light} />
export const darkTheme = () => <Setup theme={dark} />