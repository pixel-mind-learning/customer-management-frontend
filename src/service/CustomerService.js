import { environment } from '../environments/environment'
import axios from 'axios'

const BASE_URL = environment.baseUrl + '/customer/v1';

export const createUser = async (data) => {
    const response = await axios.post(`${BASE_URL}/create-or-modify`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export const getAllWithPage = (currentPage, size) => {
    return axios.get(`${BASE_URL}/get-all-with-page`, {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            page: currentPage,
            size: size,
        },
    });
}

export const uploadExcelFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/bulk-upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
}
