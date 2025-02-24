import { API } from "../api"
import { JobCardProps } from "../pages/job"
import axiosInstance from "./axiosInstance"

export const getJobsService = async () => {
    try {
        const response:JobCardProps[] = await axiosInstance.get(API.CUSTOMER_GET_ALL_JOBS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getJobsService-error: ", error)
    }
}
