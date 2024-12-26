import axios from "axios";

import { API_URL_ANDROID, API_URL_IOS, STAGE, API_URL as PROD_URL} from "@env";
import { Platform } from "react-native";
import { StorageAdapter } from "../helpers/storage.adapter";

export const API_URL = 
    (STAGE === 'prod') 
        ? PROD_URL
        : Platform.OS === 'ios'
            ? API_URL_IOS
            : API_URL_ANDROID

const inTouchIoApi = axios.create({
    baseURL: API_URL
});

inTouchIoApi.interceptors.request.use(async (config) => {
    const token = await StorageAdapter.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = '';
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default inTouchIoApi;