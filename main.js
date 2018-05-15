const electron = require("electron")
const { app, Tray, Menu, BrowserWindow } = electron
const ipc = electron.ipcMain
const path = require('path')
const url = require('url')

// Start the program when app is ready
app.on('ready', function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({
        title: "Electron_Timer",
        icon: path.join(__dirname, 'assets', 'icons', 'main.ico'),
        resizable: false,
        width: 400,
        height: 125
    })

    // Remove the menu bar
    win.setMenu(null)

    // Create a tray icon
    tray = new Tray(path.join(__dirname, 'assets', 'icons', 'main.ico'))

    // Create a conext menu for the tray
    const tray_menu = Menu.buildFromTemplate([{
            label: 'Restore',
            click() {
                win.show()
            }
        },
        {
            label: 'Quit',
            click() {
                win.close()
            }
        }
    ])

    // Set the tray menu and tooltip
    tray.setContextMenu(tray_menu)
    tray.setToolTip('Electron_Timer')

    // Load the start page for the app
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools if required
    // win.webContents.openDevTools()

    // Hide the window when minimized
    win.on('minimize', function(event) {
        event.preventDefault();
        win.hide();
    });

    // Show the window when the tray icon is double clicked
    tray.on('double-click', () => {
        win.show()
    })

    // When the timer end is received from index page, show the window
    // Set it always on top and then disable on top after 1 seconds
    ipc.on('timer_end', () => {
        win.show()
        win.setAlwaysOnTop(true)
        setTimeout(() => { win.setAlwaysOnTop(false) }, 1000)
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})