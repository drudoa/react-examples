import React from 'react'
import ChatWindow from '../ChatWindow'
import data from './data'

export default {
    title: 'Chat|Components/ChatWindow',
}

export const welcome = () => < ChatWindow data={data(200)} />
export const superChat = () => < ChatWindow data={data(200)} />
export const disconnected = () => < ChatWindow data={data(200)} />
export const unableToconenct = () => < ChatWindow data={data(200)} />
// export const withTime = () => <ChatWindow showTime={true} />