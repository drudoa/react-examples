import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import Account from './Account'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles(theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap'
    },
    textField: {
        width: '20em',
    },
    button: {

    },
    counter: {
        width: '20em'
    }
}))

const marks = [
    {
        value: 0,
        label: '$0',
    },
    {
        value: 5.00,
        label: '$5',
    },
    {
        value: 10.00,
        label: '$10',
    },
    {
        value: 25.00,
        label: '$25',
    },
    {
        value: 50,
        label: '$50',
    },
    {
        value: 100,
        label: '$100',
    },
]

export default function MessageInput({ maxLength = 200, onClick = () => { }, account }) {
    const [text, setText] = useState('')
    const [count, setCount] = useState(0)
    const classes = useStyles()

    function handleChange(event) {
        const value = event.target.value
        if (value.length > maxLength) {
            return
        }

        setText(value)
        setCount(value.length)
    }

    function handleSend() {
        if (text.length <= 0 || text.length > maxLength) return
        onClick(text)
        setText('')
        setCount(0)
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSend()
        }
    }

    return (
        <Typography component="div">
            <Account user={account} />
            <form noValidate autoComplete="off">
                <TextField
                    id="message"
                    className={classes.textField}
                    placeholder="Say somthing..."
                    multiline
                    rowsMax="6"
                    margin="normal"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
            </form>
            <Box textAlign="right" m={1} className={classes.counter}>
                <div>
                    <Typography id="discrete-slider" gutterBottom>
                        SuperChat
                    </Typography>
                    <Slider
                        defaultValue={5.00}
                        // getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={100}
                    />
                </div>
                <div>
                    <Typography>
                        {count}/{maxLength}
                    </Typography>
                    <IconButton className={classes.button} aria-label="send" onClick={handleSend} disabled={(text.length === 0)} >
                        <SendIcon />
                    </IconButton>
                </div>
            </Box>
        </Typography >
    )
}