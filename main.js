/* global __dirname */
/* global process */
var app = require('app'),  // Module to control application life.
    util = require('util'),
    BrowserWindow = require('browser-window')  // Module to create native browser window.
    


console.log('starting...')
  
// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    var updater = require('electron-updater')
    
    console.log('app ready...')
    updater.on('ready', function () {
        
        // The app is launched if required dependencies are available
        console.log('Updater is ready!')

        // Create the browser window.
        mainWindow = new BrowserWindow({width: 800, height: 600});
        
        // and load the index.html of the app.
        mainWindow.loadUrl('file://' + __dirname + '/index.html');
        mainWindow.openDevTools({detach:true})
        
        // Emitted when the window is closed.
        mainWindow.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
    })
    updater.on('updateAvailable', function () {
        // notify user of available update, a restart required to apply them
        console.log('An update is available upon restart.')
    })
    updater.on('updateRequired', function () {
        // Necessary dependencies are missing or are being updated, close immediately
        console.log('Closing to apply updates...')
        app.quit();
    })
    updater.start()
});