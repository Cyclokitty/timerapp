const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// window object needs to be global or selse the window will auto close when JS object is garbage collecting
let win;

// capture the command line args
let argsCmd = process.argv.slice(2);
let timerTime = parseInt(argsCmd[0]);

function createWindow() {
  // this is the browser window
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  // load the index.html of the app
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/app/index.html'),
    protocol: 'file',
    slashes: true
  }));

  // open the DevTools
  // win.webContents.openDevTools();

  // emitted when the window is closed
  win.on('closed', () => {

    // dereference the window object, usually you would store windows in an array if you app supports mulit winodws, this is the time when you should delete the corresponding element
    win = null;
  });

  // when the UI has finished loading:
  win.webContents.on('did-finish-load', () => {
    // send the timer value
    win.webContents.send('timer-change', timerTime);
  });
}

// method called when Electron has finished initialization and is ready to create browser window. Some APIs can only be used after this even occurs
app.on('ready', createWindow);

// quit when all windows are closed
app.on('window-all-closed', () => {
  // to make sure macOS completely quits on window close
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open
  if (win === null) {
    createWindow();
  }
});

// to run this run: electron . in the term
