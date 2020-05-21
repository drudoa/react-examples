import React from 'react'
import UserList from '../UserList'
import Data from './data'

export default {
    title: 'Chat|Components/UserList'
}

const data = Data(10)
const users = data.map(el => el.user)

export const Demo = () => < UserList users={users} />