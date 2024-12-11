const{contextBridge,ipcRenderer} = require("electron")


contextBridge.exposeInMainWorld("api",{
    name : process,
    save : (text)=> ipcRenderer.send("save",text) ,
    successStatus : (callback)=>ipcRenderer.on("success",(event,arg)=>{callback(arg)}),
    failStatus: (callback)=>ipcRenderer.on("failed",(event,arg)=>{callback(arg)}),
    cancel : () => ipcRenderer.send('cancel')
})

