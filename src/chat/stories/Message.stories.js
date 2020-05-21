import React from 'react'
import Message from '../Message'
import { loremIpsum } from "lorem-ipsum"
import faker from 'faker'

function randomDate() {
    let end = new Date()
    let start = new Date()
    start.setDate(end.getDate() - 2)
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime()
}

const testUser = {
    avatar: faker.internet.avatar(),
    name: faker.internet.userName(),
    isGuest: Math.random() >= 0.5
}

const testMsg = {
    value: loremIpsum({
        count: Math.floor(Math.random() * Math.floor(3)),
        units: 'sentences',
        sentenceLowerBound: 10,
        sentenceUpperBound: 20
    }),
    timestamp: randomDate()
}

export default {
    title: 'Chat|Components/Message',
}

export const normal = () => < Message user={testUser} msg={testMsg} />
export const withTime = () => < Message user={testUser} msg={testMsg} showTime={true} />