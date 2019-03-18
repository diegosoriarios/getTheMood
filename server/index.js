require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const Pusher = require("pusher")

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_APPKEY,
    secret: process.env.PUSHER_APPSECRET,
    cluster: process.env.PUSHER_APPCLUSTER,
    encrypted: true
})

app.post("/callback", (req, res) => {
    pusher.trigger("emotion_channel", "new_emotion", {
        emotion: req.body.emotion
    })
    return res.json({status: true})
})

app.listen("3128")