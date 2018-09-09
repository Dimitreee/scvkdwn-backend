const express = require("express");
const path = require("path")
const app = express();
const nocache = require('nocache')

const constants = require('./constants')
const utils = require("./utils")

app.use(express.static(path.join(__dirname, "build")));

app.get("/authRedirect", (req, res) => {
  const {query: { code }} = req
  const tokenUri = constants.vkAuthUrl(code)

  utils
    .fetch
    .get(tokenUri)
    .then(
      ({access_token, expires_in, user_id}) => utils.uploadAudio(access_token),
      rej => console.log(rej, "rej")
    )
})

app.listen(process.env.PORT || 4000);