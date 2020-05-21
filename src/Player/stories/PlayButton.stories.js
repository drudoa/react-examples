import React, { useRef } from 'react'
import testVideo from '../../../public/test.mp4'
import PlayButton from '../PlayButton'

export default {
    title: 'Player|Components/PlayButton'
}

const Setup = () => {
    const ref = useRef()

    return (
        <>
            <video width="320" ref={ref} >
                <source src={testVideo} type="video/mp4" />
            </video>
            <PlayButton color="black" videoRef={ref} />
        </>
    )
}

export const normal = () => <Setup />