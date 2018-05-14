const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ title: " ",icon:'./assets/icons/main.png', resizable: false, width: 400, height: 125 })

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Remove menu bar
    win.setMenu(null)

    // Open the DevTools.
    // win.webContents.openDevTools()
}

app.on('ready', createWindow)
