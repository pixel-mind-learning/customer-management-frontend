import { environment } from '../environments/environment'
import axios from 'axios'

const BASE_URL = environment.baseUrl + '/customer/v1';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const createUser = async () => {
}

export const getAllUsers = async () => {
}

export const uploadExcelFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/bulk-upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
}
