import React from 'react'
import { storiesOf } from '@storybook/react'

import LineChart from './LineChart'

function randomScalingFactor() {
    return Math.round(Math.random() * 100)
}

export const testData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First dataset',
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ],
        fill: false,
    }, {
        label: 'My Second dataset',
        fill: false,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ],
    }]
}

export const options = {
    responsive: true,
    title: {
        display: true,
        text: 'Chart.js Line Chart'
    },
    tooltips: {
        mode: 'index',
        intersect: false,
    },
    hover: {
        mode: 'nearest',
        intersect: true
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Month'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Value'
            }
        }]
    }
}

storiesOf('LineChart', module)
    .add('default', () => < LineChart data={testData} options={options} />)