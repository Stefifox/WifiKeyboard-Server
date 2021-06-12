const ks = require('node-key-sender')
const express = require('express')
const path = require('path');
const configs = require('./files/config.json')

const app = express()
const port = 3500;

let version = "0.1.1"
let versionCode = 2

app.get('/connect', (req, res)=>{
    res.status(200).json({"status":"OK", "connected":"true", "server_version": version, "version_code":versionCode ,"configs":configs})
})

app.get('/', (req, res)=>{
    res.status(200).send("<h1>Home Page</h1><h3>Server Version " + version + "</h3>")
})

app.get('/info', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "/files/info.html"))
})

app.get('/status', (req, res)=>{

})

app.get('/key', (req, res)=>{
    let data = req.query
    let id = data.id
    //console.log(id)
    configs.buttons.forEach(e =>{
        //console.log(e)
        if(e.id == id){
            ks.sendKey(e.key)
            res.status(200).json(e)
        }
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`))