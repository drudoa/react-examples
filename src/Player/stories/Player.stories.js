import React, { useRef } from 'react'
import PlayerWapper from '../PlayerWapper'
import videoFile from '../../../public/test2.mp4'


export default {
    title: 'Player',
}


export const Demo = () => <PlayerWapper
    src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
    poster={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"}
/>