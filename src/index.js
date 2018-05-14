const { BrowserWindow } = require('electron').remote
const path = require('path')
const url = require('url')

var Reset_Val = 10
var Minutes = 0
var Seconds = 0
var Minutes_Elem = document.getElementById("minutes")
var Seconds_Elem = document.getElementById("seconds")
var Play_Pause_Button = document.getElementById("play_pause_button")
var Reset_Button = document.getElementById("reset_button")
var Paused = true

/* Function to set minutes with 2 digits */
function Set_Minutes(minutes){
    minutes = parseInt(minutes)
    Minutes = minutes
    if(minutes < 10){
        Minutes_Elem.value = '0' + minutes;
    }
    else{
        Minutes_Elem.value = minutes;
    }
}

/* FUnction to set seconds with 2 digits */
function Set_Seconds(seconds){
    seconds = parseInt(seconds)
    Seconds = seconds
    if(seconds < 10){
        Seconds_Elem.value = '0' + seconds;
    }
    else{
        Seconds_Elem.value = seconds;
    }
}

function Reset() {
    Set_Minutes(Reset_Val)
    Set_Seconds(0)
}

function End() {
    Play_Pause()
}

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

function Play_Pause() {
    if (Paused) {
        Paused = false
        Play_Pause_Button.style.setProperty('-webkit-mask-image','url(../assets/images/pause.png)')
        Set_Minutes(Minutes_Elem.value)
        Set_Seconds(Seconds_Elem.value)
    }
    else {
        Paused = true
        Play_Pause_Button.style.setProperty('-webkit-mask-image','url(../assets/images/play.png)')
    }
}

Play_Pause_Button.addEventListener('click', Play_Pause)
Reset_Button.addEventListener('click',Reset)
Minutes_Elem.addEventListener('change',()=>{Set_Minutes(Minutes_Elem.value)
    Reset_Val = Minutes
})
Seconds_Elem.addEventListener('change',()=>{Set_Seconds(Seconds_Elem.value)})

Reset()
setInterval(Update, 1000)