import React from 'react'
import MuteButton from '../MuteButton'
import { action } from '@storybook/addon-actions'

export default {
    title: 'Player|Components/MuteButton',
}

export const _100 = () => <MuteButton volume={1} color="black" onClick={action('mute')} />
export const _50 = () => <MuteButton volume={0.5} color="black" onClick={action('mute')} />
export const _0 = () => <MuteButton volume={0} color="black" onClick={action('mute')} />