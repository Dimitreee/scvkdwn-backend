export const Auth =
  code => `https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`

export const GetUploadAddress =
  token => `https://api.vk.com/method/audio.getUploadServer?access_token=${token}&v=5.84`

export const SaveAudio =
  queryParams => `https://api.vk.com/method/audio.save?${queryParams}&v=5.84`