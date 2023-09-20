const { app, BrowserWindow ,ipcMain,dialog} = require('electron')
const { autoUpdater, AppUpdater } = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

let win;
const createWindow = () => {
   win = new BrowserWindow({
    width: 800,
    height: 600, 
    minimizable:false,
    maximizable:false, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })
  win.loadFile('./src/Component/index.html')   
}
let message;
var updateAvailable=false;
app.whenReady().then(() => {
  createWindow();
  checkForUpdates();
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function checkForUpdates() {
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', () => {
    updateAvailable=true;
  });

  autoUpdater.on('update-downloaded', () => {
    if (updateAvailable) {
      // Notify the user that the update is downloaded and ready to be installed
      // You can display a "Download" button and a "Restart Now" button or similar
      const choice = dialog.showMessageBoxSync({
        type: 'info',
        buttons: ['Download', 'Install'],
        defaultId: 0,
        title: 'Update Available',
        message: 'An update is available. Do you want to download it now or install it later?',
      });

      if (choice === 0) {
        // User chose to download the update
        // You can trigger the download process here
        autoUpdater.downloadUpdate();
      } else {
        // User chose to install the update
        autoUpdater.quitAndInstall();
      }
    }
  });

  autoUpdater.on('error', (err) => {
    // Handle update error
    console.error(err);
  });
}


// /*Download Completion Message*/
// autoUpdater.on("update-downloaded", (info) => {
//   message=`Update downloaded. Current version ${app.getVersion()}`;
//   win.reload();
// });


ipcMain.on("getversion",(event)=>{
  event.sender.send('sendversion', app.getVersion()); 
});