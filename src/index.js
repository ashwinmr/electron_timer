﻿const electron = require('electron')
const ipc = electron.ipcRenderer
const path = require('path')
const url = require('url')

// Define global variables and initialize
var Reset_Val = 30
var Minutes = 0
var Seconds = 0
var Paused = true
var Minutes_Elem = document.getElementById("minutes")
var Seconds_Elem = document.getElementById("seconds")
var Play_Pause_Button = document.getElementById("play_pause_button")
var Reset_Button = document.getElementById("reset_button")

/* Function to set the global minutes and also update the minutes element with 2 digits */
function Set_Minutes(minutes) {
    minutes = parseInt(minutes)
    Minutes = minutes
    if (minutes < 10) {
        Minutes_Elem.value = '0' + minutes;
    } else {
        Minutes_Elem.value = minutes;
    }
}

/* Function to set the global seconds and also update the seconds element with 2 digits */
function Set_Seconds(seconds) {
    seconds = parseInt(seconds)
    Seconds = seconds
    if (seconds < 10) {
        Seconds_Elem.value = '0' + seconds;
    } else {
        Seconds_Elem.value = seconds;
    }
}

// Function to reset the timer
function Reset() {
    Set_Minutes(Reset_Val)
    Set_Seconds(0)
}

// Function to handle end of timer
function End() {
    Play_Pause()
    ipc.send('timer_end')
}

// Function to update the timer every second
function Update() {
    minutes = Minutes
    seconds = Seconds
    if (!Paused) {
        seconds -= 1
        if (seconds < 0) {
            seconds = 59
            minutes -= 1
            if (minutes < 0) {
                seconds = 0
                minutes = 0
                End()
            }
        }
        Set_Minutes(minutes)
        Set_Seconds(seconds)
    }
}

// Function to handle play and pause
function Play_Pause() {
    if (Paused) {
        Paused = false
        Play_Pause_Button.style.setProperty('-webkit-mask-image', 'url(../assets/images/pause_button.svg)')
    } else {
        Paused = true
        Play_Pause_Button.style.setProperty('-webkit-mask-image', 'url(../assets/images/play_button.svg)')
    }
}

// Handle events for each button
Play_Pause_Button.addEventListener('click', Play_Pause)
Reset_Button.addEventListener('click', Reset)

// Update the globals when the time is changed by user. Also force 2 digits.
Minutes_Elem.addEventListener('change', () => {
    Set_Minutes(Minutes_Elem.value)
    Reset_Val = Minutes
})
Seconds_Elem.addEventListener('change', () => { Set_Seconds(Seconds_Elem.value) })

// Reset and run update every second
Reset()
setInterval(Update, 1000)