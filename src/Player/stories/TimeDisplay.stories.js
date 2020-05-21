import React, { useRef } from 'react'
import TimeDisplay from '../TimeDisplay'
import videoFile from '../../../public/test2.mp4'

export default {
    title: 'Player|Components/TimeDisplay'
}

const Setup = () => {
    const ref = useRef()

    return (
        <>
            <video width="320" ref={ref} controls>
                <source src={videoFile} type="video/mp4" />
            </video>
            <TimeDisplay color="black" videoRef={ref} />
        </>
    )
}

export const normal = () => <Setup />