import axios from 'axios'

const useAxios = (url: string) => {
  const Axios = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/',
    method: 'get'
  })
  return Axios.get(url)
}

export { useAxios }
