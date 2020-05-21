import React, { useRef } from 'react'
import FullscreenButton from '../FullscreenButton'

export default {
    title: 'Player|Components/FullscreenButton',
}

const Setup = () => {
    const ref = useRef()

    return (
        <div ref={ref} style={{ backgroundColor: 'blue' }}>
            <FullscreenButton videoRef={ref} />
        </div>
    )
}

export const normal = () => <Setup />