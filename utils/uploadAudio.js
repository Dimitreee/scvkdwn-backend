const fetch = require("./fetch")
const fs = require('fs')
const axios = require("axios")
const request = require('request');
const FormData = require("form-data")
const followRedirects = require('follow-redirects');
const queryString = require('querystring');

followRedirects.maxRedirects = 10
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024

const getUploadUrl = (token) => {
  const fetUploadAddressUri = `https://api.vk.com/method/audio.getUploadServer?access_token=${token}&v=5.84`

  fetch.post(fetUploadAddressUri).then(
    (response) => uploadAudio(response, token),
    rej => console.log(rej)
  )
}

const uploadAudio = (payload, token) => {
  console.log("new request")
  if (!token) {return}

  const {upload_url} = payload.data.response
  const file = fs.createReadStream(__dirname + "/11111.mp3")

  axios.post(upload_url, {file: file}).then(response => {
    const {data} = response
    const params = queryString.stringify({...data, access_token: token})
    const url = `https://api.vk.com/method/audio.save?${params}&v=5.84`

    axios.get(url).then(res => console.log(res, "res"), rej => console.log(rej))
  }).catch(error => {
    console.log(error.message);
  });
}

module.exports = getUploadUrl
