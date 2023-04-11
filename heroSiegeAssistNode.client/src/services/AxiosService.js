import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  // TODO Research optimization for mongodb calls to see if size can be decreased
  timeout: 16000
})
