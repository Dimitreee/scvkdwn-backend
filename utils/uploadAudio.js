const fetch = require("./fetch")
const fs = require('fs')
const axios = require("axios")
const FormData = require("form-data")
const followRedirects = require('follow-redirects');
const queryString = require('querystring');

followRedirects.maxRedirects = 10;
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024; //

const getUploadUrl = (token) => {
  const getUploadUri = `https://api.vk.com/method/audio.getUploadServer?access_token=${token}&v=5.84`
  fetch.post(getUploadUri).then(
    (response) => uploadAudio(response, token),
    rej => console.log(rej)
  )
}

const uploadAudio = (payload, token) => {
  const {upload_url} = payload.data.response
  const form = new FormData()

  form.append('file', fs.createReadStream(__dirname + "/LeveldvaGejuVenesuel.mp3"), {fileName: "L"});

  axios.post(upload_url, form).then(response => {
    const {data} = response
    const params = queryString.stringify({...data, access_token: token})
    const url = `https://api.vk.com/method/audio.save?${params}&v=5.84`

    axios.get(url).then(res => console.log(res, "res"), rej => console.log(rej))
  }).catch(error => {
    if (error.response) {
      console.log(error.response);
    }
    console.log(error.message);
  });
}

module.exports = getUploadUrl
