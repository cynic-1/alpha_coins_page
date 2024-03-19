// 组合式Api， 功能： 导出需要的Api地址
import axios from 'axios'

const baseUrl =
  'http://ec2-13-210-227-179.ap-southeast-2.compute.amazonaws.com:3000'
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
