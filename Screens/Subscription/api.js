import axios from "axios";
import axiosIns from "../../helpers/helpers";
export const API_URL = 'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2Nzg3MDc3LCJpYXQiOjE2NDkwMTEwNzcsImp0aSI6IjI4NDkyM2FmMmY5NzQ2N2JhOTY0MTk5Nzg1NDkxN2E4IiwidXNlcl9pZCI6NH0.FtBwJ7yanDmHCPTppA6Jnk-XnaA_7LHVRQlFLQ6j4IA"
  },
});
export default class ApiService{
  static saveStripeInfo(data={}){
    return axiosIns.post(`/payments/save-stripe-info/`, data)
  }
}
