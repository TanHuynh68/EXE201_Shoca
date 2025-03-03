import { API } from "../api"
import { JobCardProps } from "../pages/job"
import axiosInstance from "./axiosInstance"

export const getJobsService = async () => {
    try {
        const response: JobCardProps[] = await axiosInstance.get(API.CUSTOMER_GET_ALL_JOBS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getJobsService-error: ", error)
    }
}


export const getJobService = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.CUSTOMER_GET_JOB_DETAIL}/${id}`)
        if (response) {
            console.log("getJobService: ", response)
            return response.data
        }
    } catch (error) {
        console.log("getJobsService-error: ", error)
    }
}
