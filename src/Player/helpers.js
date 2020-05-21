import moment from 'moment'

const pad = (val) => {
    if (val < 10) return '0' + val
    else return val
}

export const formatTime = (val) => {
    const d = moment.duration(val, 'seconds')

    const time = (d.hours() > 0 ? d.hours() + ':' : '')
        + d.minutes() + ':'
        + pad(d.seconds())
    return time
}