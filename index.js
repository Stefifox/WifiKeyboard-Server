const ks = require('node-key-sender')
const express = require('express')
const path = require('path');

const app = express()
const port = 3500;

app.get('/info', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "/files/info.html"))
})

app.get('/key', (req, res)=>{
    let data = req.query
    let key = data.value
    //console.log(key)
    switch (key){
        case "mute":
            ks.sendKey('f13')
            res.status(200).json({"status":"OK", "key":"f13", "name":"mute"})
            break
        case "audio":
            ks.sendKey('f14')
            res.status(200).json({"status":"OK", "key":"f14", "name":"audio"})
            break
        default:
            res.status(200).json({"status":"OK", "key":"none"})
            break
    }


})

app.listen(port, () => console.log(`App listening on port ${port}`))