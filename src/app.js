import express from "express"

import {vkWrapper} from "/net"
import env from "/.env"
import {Redis} from "/store"

Redis.set({key: "yo", value: "123"})
Redis.get({key: "yo"}).then((res) => console.log(res))

const app = express()

app.post("/", (req, res) => {
  res.send("yo")
})

const {PORT} = env

app.listen(PORT || 8080, () => {
  console.log(`listening ${PORT || 8000}`)
})