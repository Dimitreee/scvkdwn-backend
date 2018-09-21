import redis from "redis"
const { promisify } = require('util')
const client = redis.createClient({port: 6379})

client.on("error", (e) => {
  console.log("error")
})

client.on("ready", (e) => {
  console.log("ready")
})

const RedisWrapper = () => {
  const getAsync = promisify(client.get).bind(client)

  const set = ({key, value}) => client.set(key, value)
  const get = ({key}) => getAsync(key)

  return {
    get,
    set
  }
}

const Redis = new RedisWrapper()

export default Redis

