import React from "react"

export default function useFullscreenStatus(elRef) {
    const [isFullscreen, setIsFullscreen] = React.useState(
        document[getBrowserFullscreenElementProp()] != null
    )

    const setFullscreen = async (state = true) => {
        if (elRef.current == null) return

        try {
            if (state) {
                await elRef.current.requestFullscreen()
            } else if (!state) {
                await document.exitFullscreen()
            }

            setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)
        } catch (error) {
            setIsFullscreen(false)
        }
    }

    React.useLayoutEffect(() => {
        document.onfullscreenchange = () =>
            setIsFullscreen(document[getBrowserFullscreenElementProp()] != null)

        return () => (document.onfullscreenchange = undefined)
    })

    return [isFullscreen, setFullscreen]
}

function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== "undefined") {
        return "fullscreenElement"
    } else if (typeof document.mozFullScreenElement !== "undefined") {
        return "mozFullScreenElement"
    } else if (typeof document.msFullscreenElement !== "undefined") {
        return "msFullscreenElement"
    } else if (typeof document.webkitFullscreenElement !== "undefined") {
        return "webkitFullscreenElement"
    } else {
        throw new Error("fullscreenElement is not supported by this browser")
    }
}