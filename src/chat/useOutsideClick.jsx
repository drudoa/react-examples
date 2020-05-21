import React, { useEffect } from 'react'

const useOutsideClick = (ref, callback) => {

    useEffect(() => {
        const handler = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }

    }, [])
}

export default useOutsideClick  