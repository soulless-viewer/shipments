import axios from 'axios'

const baseURL = process.env.VUE_APP_SERVER_URL

export default async function gateway (uri, method, headers = {}, data = {}) {
  const config = {
    url: uri,
    baseURL: baseURL,
    data: data,
    headers: headers
  }

  if (
    method && ['get', 'post', 'put', 'delete'].includes(
      method.toLowerCase()
    )
  ) {
    config.method = method.toLowerCase()
    return axios(config)
  }
}
