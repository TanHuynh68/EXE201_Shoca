import { API } from "../api"
import { NewService } from "../pages/customer/freelancer-service/add-new-service"
import axiosInstance from "./axiosInstance"

export const createNewSerivce = async (values: NewService) => {
    try {
        const response: NewService = await axiosInstance.post(API.CREATE_NEW_SERICE, {
            deliveryTime: values.deliveryTime, description: values.description, imageUrl: values.imageUrl,
            numConcepts: values.numConcepts, numRevisions: values.numRevisions, price: values.price,
            servicename: values.servicename, userId: values.userId
        })
        if (response) {
            console.log("createNewSerivce: ", response)
            return response
        }
    } catch (error) {
        console.log("createNewSerivce-error: ", error)
    }
}

export const getServices = async () => {
    try {
        const response: NewService[] = await axiosInstance.get(API.GET_SERVICES)
        if (response) {
            console.log("getServices: ", response)
            return response
        }
    } catch (error) {
        console.log("getServices-error: ", error)
    }
}