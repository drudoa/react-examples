import React from 'react'
import Pill from '../SuperChatPill'
import data from './data'

export default {
    title: 'Chat|Components/SuperChatPill'
}

const test = data(1, { forceSuperChat: true })

export const level0 = () => <Pill user={test[0].user} msg={test[0].msg} />