import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let headers = {};

const axiosIns = axios.create({
    baseURL: 'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app/',
    headers,
});

axiosIns.interceptors.request.use(

    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosIns.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.response.status === 401) {
            alert("401");
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    },
);

export default axiosIns;