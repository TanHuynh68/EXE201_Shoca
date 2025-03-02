
export const API = {
    //AUTH
    LOGIN: "/api/v1/authentication/login",
    REGISTER: "/api/v1/authentication/register",
    //ADMIN
    ADMIN_GET_ALL_ACCOUNTS: "/api/v1/accounts",
    ADMIN_GET_ALL_ACCOUNT: "/api/v1/account/:id",
    ADMIN_CREATE_ACCOUNTS: "/api/v1/accounts",
    ADMIN_UPDATE_ACCOUNTS: "/api/v1/accounts",
    ADMIN_GET_ALL_RECRUITER: "/api/recruiter",
    //ATWORK
    CUSTOMER_GET_ALL_ATWORKS: "/api/v1/artworks",
    CUSTOMER_GET_ATWORK: "/api/v1/artworks",
    //JOB
    CUSTOMER_GET_ALL_JOBS: "/api/v1/jobs",
    CUSTOMER_GET_JOB_DETAIL: "/api/v1/jobs",
    //FREELANCER
    CREATE_NEW_SERICE: "/api/v1/freelancerservices",
    GET_SERVICES: "/api/v1/freelancerservices",
}