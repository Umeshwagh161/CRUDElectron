const { app, BrowserWindow } = require('electron')
const axios = require('axios');
const createWindow = () => {
  const win = new BrowserWindow({
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

app.whenReady().then(() => {
  createWindow()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

