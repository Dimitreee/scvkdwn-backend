const https = require('https');
const axios = require('axios');

const fetch = function () {
  const get = (uri) => new Promise((res, rej) => {
    https.get(uri, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res(JSON.parse(data))
      });

    }).on("error", (err) => {
      rej("Error: " + err.message)
    })
  })

  const post = (uri) => new Promise((resolve, reject) => {
    axios.get(uri).then(response => {
      resolve(response)
    });
  })

  return {
    get,
    post
  }
}

module.exports = new fetch()