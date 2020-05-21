import React, { useState } from 'react'
import RangeInput from '../RangeInput'

export default {
    title: 'Player|Components/RangeInput',
}

const Setup = () => {
    const [value, setValue] = useState(0.5)

    const handler = (val) => {
        setValue(val)
    }

    return (
        <RangeInput
            max={1}
            value={value}
            filledColor="black"
            onChange={handler}
            handleSize={25}
        />
    )
}

export const normal = () => <Setup />