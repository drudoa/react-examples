import React from 'react'
import Scroller from '../ScrollButtons'
import Ticker from '../Ticker'
import Data from './data'

const testData = Data(18, { forceSuperChat: true })

export default {
    title: 'Chat|Components/scroller'
}

export const normal = () => (<Scroller width={425} itemWidth={95}>
    <Ticker data={testData} />
</Scroller>)