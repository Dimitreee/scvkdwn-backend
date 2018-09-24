import fetch from "node-fetch"
import fileType from "file-type"
import methods from "./constatns"

class Request {
  constructor() {
    /*
    get META
    fetch('https://github.com/')
      .then(res => {
        console.log(res.ok);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers.raw());
        console.log(res.headers.get('content-type'));
      })
    */
  }

  static plain = async ({url}) => {
    const res = await fetch(url)
    return await res.text()
  }

  static json = async ({url}) => {
    const res = await fetch(url)
    return res.json()
  }

  static readFileStream = async ({url, fileName}) => {
    fetch(url).then(res => {
      return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(`./${fileName}`)
        res.body.pipe(dest)
        res.body.on('error', err => {
          reject(err)
        })
        dest.on('finish', () => {
          resolve(dest)
        })
        dest.on('error', err => {
          reject(err)
        })
      })
    })
  }

  static readBuffer = async ({url}) => {
    const res = await fetch(url)
    const buffer = await res.buffer
    return fileType(buffer)
  }

  static post = async ({url, jsonBody, headers, form, stream, }) => {
    const requestBody = {
      jsonBody: body => JSON.stringify(body),
      form: form => form,
      stream: stream => stream
    }

    const res = await fetch(url, {
      method: methods.POST,
      body: JSON.stringify(body),
      headers
    })

    const json = await res.json()

    return json
  }

}

// POST request

// GET request

// Error handler +

// json +

// catching network error
// 3xx-5xx responses are NOT network errors, and should be handled in then()
// you only need one catch() at the end of your promise chain

fetch('http://domain.invalid/')
  .catch(err => console.error(err));

// stream
// the node.js way is to use stream when possible +

// buffer
// if you prefer to cache binary data in full, use buffer()
// note that buffer() is a node-fetch only API +

// meta +
// post

// post with stream from file

import { createReadStream } from 'fs';

const stream = createReadStream('input.txt');
fetch('http://httpbin.org/post', { method: 'POST', body: stream })
  .then(res => res.json())
  .then(json => console.log(json));

// post with JSON

var body = { a: 1 };
fetch('http://httpbin.org/post', {
  method: 'POST',
  body:    JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' },
})
  .then(res => res.json())
  .then(json => console.log(json));

// post form parameters (x-www-form-urlencoded)

import { URLSearchParams } from 'url';

const params = new URLSearchParams();
params.append('a', 1);
fetch('http://httpbin.org/post', { method: 'POST', body: params })
  .then(res => res.json())
  .then(json => console.log(json));

// post with form-data (detect multipart)

import FormData from 'form-data';

const form = new FormData();
form.append('a', 1);
fetch('http://httpbin.org/post', { method: 'POST', body: form })
  .then(res => res.json())
  .then(json => console.log(json));

// post with form-data (custom headers)
// note that getHeaders() is non-standard API

import FormData from 'form-data';

const form = new FormData();
form.append('a', 1);
fetch('http://httpbin.org/post', { method: 'POST', body: form, headers: form.getHeaders() })
  .then(res => res.json())
  .then(json => console.log(json));

// node 7+ with async function

(async function () {
  const res = await fetch('https://api.github.com/users/github');
  const json = await res.json();
  console.log(json);
})();