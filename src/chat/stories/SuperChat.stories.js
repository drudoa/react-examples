import React from 'react'
import SuperChat from '../SuperChatMessage'
import data from './data'

export default {
    title: 'Chat|Components/SuperChatMessage'
}

const test = data(1, { forceSuperChat: true })

export const level0 = () => <SuperChat user={test[0].user} msg={test[0].msg} />
export const level1 = () => <SuperChat user={test[0].user} msg={test[0].msg} />
export const level2 = () => <SuperChat user={test[0].user} msg={test[0].msg} />
export const level3 = () => <SuperChat user={test[0].user} msg={test[0].msg} /> 