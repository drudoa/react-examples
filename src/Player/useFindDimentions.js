import { useLayoutEffect, useState } from 'react'

export default function useFindDimentions(elementRef) {
    const [rect, setRect] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    })

    useLayoutEffect(() => {
        const getRect = () => {
            // console.log(elementRef.current.offsetWidth)
            if (elementRef === null && elementRef.current === undefined) return
            const rect = elementRef.current.getBoundingClientRect()
            setRect(rect)
        }

        getRect()

        window.addEventListener('resize', getRect)
        return () => {
            window.removeEventListener('resize', getRect)
        }
    }, [elementRef])

    return rect
}