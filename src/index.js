const { BrowserWindow } = require('electron').remote
const path = require('path')
const url = require('url')

const Timer_Set = 5
var Minutes = 0
var Seconds = 0
var Minutes_Elem = document.getElementById("minutes")
var Seconds_Elem = document.getElementById("seconds")
var Play_Pause_Button = document.getElementById("play_pause_button")
var Reset_Button = document.getElementById("reset_button")
var Paused = true


function Reset() {
    Minutes = Timer_Set
    Seconds = 0
    Minutes_Elem.value = Minutes
    Seconds_Elem.value = Seconds
}

function End() {
    Paused = true
}

function Update() {
    if (!Paused) {
        Seconds -= 1
        if (Seconds < 0) {
            Seconds = 59
            Minutes -= 1
            if (Minutes < 0) {
                Seconds = 0
                Minutes = 0
                End()
            }
        }
        Minutes_Elem.value = Minutes
        Seconds_Elem.value = Seconds
    }
}

function Start() {
    Minutes = Minutes_Elem.value
    Seconds = Seconds_Elem.value
}

function Play_Pause() {
    if (Paused) {
        Paused = false
        Play_Pause_Button.style.background = 'url(../assets/images/pause.png) no-repeat'
        Play_Pause_Button.style.backgroundPosition = 'center'
        Start()
    }
    else {
        Paused = true
        Play_Pause_Button.style.background = 'url(../assets/images/play.png) no-repeat'
        Play_Pause_Button.style.backgroundPosition = 'center'
    }
}

Play_Pause_Button.addEventListener('click', Play_Pause)
Reset_Button.addEventListener('click',Reset)

Reset()
setInterval(Update, 1000)