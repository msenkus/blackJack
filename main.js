const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//process.env.NODE_ENV = 'production';

let win;

function createWindow(){
    win = new BrowserWindow({width:800, height:600, icon:__dirname})
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes:true
    }));
    
    win.on('cosed', () => {
        win =null;
    });
}

app.on('ready' , createWindow);

app.on('window-all-closed', () =>{
   if(process.platform !== 'darwin'){
       app.quit();
   } 
});











