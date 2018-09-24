import fetch from "node-fetch"

import env from "/.env"
import * as vkUrl from "./constants"

const {
  VK_CLIENT_ID,
  VK_CLIENT_SECRET,
} = env

class VkWrapper {
  constructor() {

  }

  getAccesToken = ({code}) => {
    // should get auth code from client
    const url = vkUrl.Auth(code)
    return fetch(url)
  }

  getAudioUploadAurl = () => {
    // should get access_token from vk.api
    const url = vkUrl.GetUploadAddress("123")
    return fetch(url)
  }

  uploadAudio = ({upload_url, formData}) => {
    // should upload audio to vk.api server
    return fetch(upload_url)
  }

  saveAudio = ({queryParams}) => {
    // should save audio from vk.api
    const url = vkUrl.SaveAudio(queryParams)
    return fetch(url)
  }
}

const vkWrapper = new VkWrapper()

export default vkWrapper