const ks = require('node-key-sender')
const express = require('express')
const path = require('path');
const fs = require('fs')

const app = express()

let version = "0.1.1"
let versionCode = 2

console.log(`Welcome\nStarting Server...`)

let data = fs.readFileSync(path.join(process.cwd(), "/files/config.json"))
console.log("Reading config file")
configs = JSON.parse(data)
port = configs.general.server_port

app.get('/connect', (req, res)=>{
    let ip = req.socket.remoteAddress.split(':')
    console.log("New connection from " + ip[3])
    res.status(200).json({"status":"OK", "connected":"true", "server_version": version, "version_code":versionCode ,"configs":configs})
})

app.get('/', (req, res)=>{
    res.status(200).send("<h1>Home Page</h1><h3>Server Version " + version + "</h3>")
})

app.get('/info', (req, res)=>{
    res.status(200).sendFile(path.join(process.cwd(), "/files/info.html"))
})

app.get('/reload', (req, res)=>{
    let tempraw = fs.readFileSync(path.join(process.cwd(), "/files/config.json"))
    configs = JSON.parse(tempraw)
})

app.get('/addbutton', (req, res)=>{
    let q = req.query
    let id = q.id
    let name = q.name
    let key = q.key

    let json = configs

    let newbutton = new Object()
    newbutton.id = parseInt(id)
    newbutton.name = name
    newbutton.key = key

    configs.buttons.push(newbutton)
    console.log(configs)
    fs.writeFileSync(path.join(process.cwd(), "/files/config.json"), JSON.stringify(configs))
    res.status(200).send("ok")

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


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Current Version: ${version} - ${versionCode}`)
})