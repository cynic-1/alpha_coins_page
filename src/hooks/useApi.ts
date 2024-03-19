// 组合式Api， 功能： 导出需要的Api地址
import axios from 'axios'

const baseUrl =
  '/api'
const api: { [key: string]: string } = {}

export const useApi = () =>
  new Promise((resolve) => {
    axios.get(baseUrl).then((response) => {
      Object.keys(response.data.paths)
        .filter((key) => key !== '/')
        .forEach((key) => {
          api[key.replace('/', '').replaceAll('_', ' ')] = `${baseUrl}${key}`
        })
      resolve(api)
    })
  })
