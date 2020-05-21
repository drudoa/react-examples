import React, { useRef, useEffect } from 'react'
import Chart from 'chart.js'

export default function LineChart({ data = [], options = [], width = 400, height = 400 }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, height, width)
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        })

        return function () {
            lineChart.destroy()
        }
    }, [data, height, width, options])

    return (
        <div
            style={{ width: '400px', height: '400px}' }}
        >
            <canvas ref={canvasRef} />
        </div>
    )
}