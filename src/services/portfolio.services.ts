import { API } from "../api"
import { Portfolio } from "../pages/customer/portfolio/manage-portfolio"
import { PortfolioData } from "../pages/customer/portfolio/portfolio-modal"
import axiosInstance from "./axiosInstance"

export const getPortfolios = async () => {
    try {
        const response:Portfolio[] = await axiosInstance.get(API.GET_PORTFOLIOS)
        if (response) {
            console.log("response: ", response)
            return response
        }
    } catch (error) {
        console.log("getPortfolio-error: ", error)
    }
}

export const getPortfolio = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${API.GET_PORTFOLIO}/${id}`)
        if (response) {
            console.log("response: ", response)
            return response.data as Portfolio
        }
    } catch (error) {
        console.log("getPortfolio-error: ", error)
    }
}

export const createPortfolio = async (values: PortfolioData) => {
    try {
        const response = await axiosInstance.post(`${API.GET_PORTFOLIO}`,{
            values
        })
        if (response) {
            console.log("response: ", response)
            return response 
        }
    } catch (error) {
        console.log("getPortfolio-error: ", error)
    }
}