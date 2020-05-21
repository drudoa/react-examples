import { loremIpsum } from "lorem-ipsum"
import faker from 'faker'

function randomDate() {
    let end = new Date()
    let start = new Date()
    start.setDate(end.getDate() - 2)
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime()
}

const data = (size, options) => {
    const { forceSuperChat, includeSuperChats } = options || false

    return new Array(size)
        .fill(true)
        .map(() => {
            let isSuperChat = false
            if (forceSuperChat) {
                isSuperChat = true
            } else if (includeSuperChats) {
                isSuperChat = Math.random() >= 0.7
            }

            return {
                user: {
                    avatar: faker.internet.avatar(),
                    name: faker.internet.userName(),
                    isGuest: Math.random() >= 0.5
                },
                msg: {
                    id: faker.random.uuid(),
                    value: loremIpsum({
                        count: Math.floor(Math.random()),
                        units: 'sentences',
                        sentenceLowerBound: 2,
                        sentenceUpperBound: 7
                    }),
                    timestamp: Date.now(),
                    superChat: isSuperChat,
                    amount: isSuperChat ? (Math.random() * 100).toFixed(2) : 0,
                    level: isSuperChat ? Math.floor(Math.random() * 3) : 0,
                    timeout: Math.floor(Math.random() * 30000) + 3000
                }
            }
        })
}

export default data