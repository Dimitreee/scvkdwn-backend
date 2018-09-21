import fetch from "node-fetch"

import {env} from "/utils"
import * as vkUrl from "./constants"

const {
  VK_CLIENT_ID,
  VK_CLIENT_SECRET,
} = env

class VkWrapper {
  constructor() {}

  getAccesToken = ({code}) => {
    const url = vkUrl.Auth(code)
    return fetch(url)
  }

  getAudioUploadAurl = () => {
    const url = vkUrl.GetUploadAddress(token)
  }

  uploadAudio = ({upload_url}) => {

  }
}

const vkWrapper = new VkWrapper()

export default vkWrapper