//http://localhost:4000/authRedirect?code=9a8acf513b8dce16f7
const clientId = "6686624"
const redirectUri = "http://localhost:4000/authRedirect"
const clientSecret = "BT7kzMkscR0GXrra3TW3"

const vkAuthUrl = code => `https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`

module.exports = {
  vkAuthUrl
}