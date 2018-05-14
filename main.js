const electron = require("electron")
const { app, Tray, Menu, BrowserWindow } = electron
const ipc = electron.ipcMain
const path = require('path')
const url = require('url')

let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ 
        title: " ",
        icon:'./assets/icons/main.png', 
        resizable: false, 
        width: 400, 
        height: 125 
    })

    tray = new Tray('./assets/icons/main.png')

    const ctxMenu = Menu.buildFromTemplate([
        {
            label:'Restore',
            click(){
                win.show()
            }
        },
        {
            label:'Quit',
            click(){
                win.close()
            }
        }
    ])

    tray.setContextMenu(ctxMenu)
    tray.setToolTip('Electron_Timer')

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

    win.on('minimize',function(event){
        event.preventDefault();
        win.hide();
    });

    tray.on('double-click',()=>{
        win.show()
    })

    ipc.on('timer_end',()=>{win.show()})
}

app.on('ready', createWindow)

