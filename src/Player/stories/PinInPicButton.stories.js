import React, { useRef } from 'react'
import PinInPicButton from '../PicInPicButton'
import videoFile from '../../../public/test2.mp4'

export default {
    title: 'Player|Components/PinInPicButton',
}

const Setup = () => {
    const ref = useRef()

    return (
        <>
            <video width="320" ref={ref} controls>
                <source src={videoFile} type="video/mp4" />
            </video>
            <PinInPicButton color="black" videoRef={ref} />
        </>
    )
}

export const normal = () => <Setup />