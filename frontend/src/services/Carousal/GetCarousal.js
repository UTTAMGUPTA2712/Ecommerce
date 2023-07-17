import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetCarousal = () => {
    try {
        const response = axios.get(server + "carousal/getcarousal")
        return response;
    } catch (error) {
        console.log(error);
        return serverError
    }
}