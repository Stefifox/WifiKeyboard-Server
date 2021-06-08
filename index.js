const ks = require('node-key-sender')
const express = require('express')
const path = require('path');
const configs = require('./files/config.json')

const app = express()
const port = 3500;

app.get('/connect', (req, res)=>{
    res.status(200).json({"status":"OK", "connected":"true", "configs":configs})
})

app.get('/info', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "/files/info.html"))
})

app.get('/key', (req, res)=>{
    let data = req.query
    let id = data.id
    console.log(id)
    configs.buttons.forEach(e =>{
        console.log(e)
        if(e.id == id){
            ks.sendKey(e.key)
            res.status(200).json(e)
        }
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`))