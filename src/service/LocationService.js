import { environment } from '../environments/environment'
import axios from 'axios'

const BASE_URL = environment.baseUrl + '/customer/location/v1';

export const getAllCities = () => {
    return axios.get(`${BASE_URL}/get-all-cities`);
}

export const getAllCountries = () => {
    return axios.get(`${BASE_URL}/get-all-countries`);
}
