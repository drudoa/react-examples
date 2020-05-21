import React, { useRef } from 'react'
import VolumeControl from '../VolumeControl'
import videoFile from '../../../public/test2.mp4'

export default {
    title: 'Player|Components/VolumeControl',
}

const Setup = () => {
    const ref = useRef()


    return (
        <>
            <video width="320" ref={ref} controls>
                <source src={videoFile} type="video/mp4" />
            </video>
            <VolumeControl color="black" videoRef={ref} />
        </>
    )
}

export const normal = () => <Setup />