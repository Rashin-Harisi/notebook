const { app, BrowserWindow,ipcMain,dialog,Notification } = require('electron')
const path = require("node:path")
const fs = require ("fs")


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
        preload: path.join(__dirname,"preload.js")
      }
    })

    win.loadFile('index.html')
    const allowed = Notification.isSupported();
    let notificationSuccess = new Notification({
        title: "Success",
        body: "File's saved successfully.",
        silent: false,
    })
    let notificationFailed= new Notification({
      title : "Failed",
      body: "File's not saved.Please try again.",
      silent: false,
    })

    ipcMain.on('save',async(event,arg)=>{
      const {filePath,canceled}= await dialog.showSaveDialog(win,{
        defaultPath: path.join("C:/Users/Rashin/Documents/Files"),
        filters: [
          {name: "text", extensions:['txt'] }
        ]
      })
      if (!canceled && filePath){
        console.log(filePath)
        fs.writeFile(filePath,arg,(error)=>{
          if(error){
            console.log("file's not saved.")
            event.reply("failed","File's not saved.Please try again.")
            if(allowed){
              notificationFailed.show()
            }
          }else{
            console.log("file's saved successfully.")
            event.reply("success","File's saved successfully.")
            if(allowed){
              notificationSuccess.show()
            }
          }
        })
      }else{
        console.log("something went wrong!")
      }
    })

    ipcMain.on('open', async(event,arg)=>{
      const {canceled,filePaths}= await dialog.showOpenDialog(win, {
        defaultPath: path.join("C:/Users/Rashin/Documents/Files"),
        filters: [
          {name: "text", extensions:['txt'] }
        ],
        properties:["openFile"]
      })
      console.log(filePaths[0])

      if(!canceled && filePaths && filePaths[0]){
        const content = fs.readFileSync(filePaths[0],'utf8')
        if(!canceled && filePaths && filePaths[0]){
          event.reply("openFile",content)
          console.log(content)}
      }else{
        console.log("Something went wrong!");
      }
    })
  }

  

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

