import { useEffect, useState, useCallback } from 'react'

export default function useOnDrag(elementRef, options) {
    const { alwaysOn, onTrigger } = options || false
    const [mouseDown, setMouseDown] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const onMove = useCallback((event) => {
        event.preventDefault()
        if (mouseDown || alwaysOn || onTrigger) {
            setPosition({
                x: event.clientX,
                y: event.clientY
            })
        }
    }, [mouseDown, onTrigger])

    useEffect(() => {
        const onDown = (event) => {
            if (elementRef.current.contains(event.target)) {
                setMouseDown(true)
                setPosition({
                    x: event.clientX,
                    y: event.clientY
                })
            }
        }

        const onRelease = () => {
            setMouseDown(false)
        }

        document.addEventListener('mousedown', onDown)
        document.addEventListener('mousemove', onMove, false)
        document.documentElement.addEventListener('mouseup', onRelease)

        return () => {
            document.removeEventListener('mousedown', onDown)
            document.removeEventListener('mousemove', onMove, false)
            document.documentElement.removeEventListener('mouseup', onRelease)
        }
    }, [elementRef, onMove])

    return [mouseDown, position]
}