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

    console.log(key)
    switch (key){
        case "mute":
            ks.sendKey('f13')
            break
        case "audio":
            ks.sendKey('f14')
            break
    }

    res.status(200).json({"status":"OK"})
})

app.listen(port, () => console.log(`App listening on port ${port}`))