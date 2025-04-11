import { API } from "../api"
import axiosInstance from "./axiosInstance"

export const CustomerGetProfile = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.GET_PROFILE}/${id}`)
        if (response) {
            console.log("CustomerGetProfile: ", response)
            return response
        }
    } catch (error) {
        console.log("CustomerGetProfile-error: ", error)
    }
}
