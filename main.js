var app = require('app'),
    ipc = require('ipc'),
    util = require('util'),
    BrowserWindow = require('browser-window'),
    updater = require('electron-updater')
  
require('crash-reporter').start()

var mainWindow = null, 
    loaded = false

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit()
})

app.on('ready', function() {
    // Instead of launching your window right away, start the updater
    // to check to see if the app is valid or not.
    // An app is invalid if any of its dependencies or plugins are missing.
    // In this case the updater will begin a 'full' update. Once updated
    // your app will be re-launched.

    updater.on('ready', function () {        
        // This event is called if your app is currently valid.
        // It may be out-of-date but it has all of the necessary
        // dependencies and plugins to launch right now.
        // Your app maybe also receive an update-available event following this

        mainWindow = new BrowserWindow({width: 800, height: 600})
        mainWindow.loadUrl('file://' + __dirname + '/index.html')
        mainWindow.openDevTools({detach:true})        
        mainWindow.on('closed', function() {
            mainWindow = null;
        })
    })
    updater.on('updateRequired', function () {
        // This event is fired if your app is not currently valid at startup.
        // The app must be exited immediately and the auto-updater will be run instead.
        // After the auto-update runs the app will be re-run.
        
        app.quit();
    })
    updater.on('updateAvailable', function () {
        // This event is fired after new versions of plugins have been downloaded and
        // before the app and dependencies are downloaded. Plugins are installed side-by-side
        // so they can be downloaded while the app is running.
        
        // After the app is restarted it will watch for updates and fire the updated required
        // event when newer versions are available.

        if(mainWindow) {
            // Send a message to your view(s)
            mainWindow.webContents.send('update-available');
        }
    })

    updater.start()
})