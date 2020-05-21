import React from 'react'
import ProgressBar from '../ProgressBarContainer'
// import { action } from '@storybook/addon-actions'
import image from '../../../public/out.jpg'

export default {
    title: 'Player|Components/ProgressBar',
}

export const normal = () => (
    <>
        <div style={{ marginTop: 150, backgroundColor: 'black', width: 500, position: 'relative' }}>
            < ProgressBar
                thumbs={image}
                currentTime={0}
                maxTime={8}
            />
        </div>
    </>
)

