import {  Route, Routes } from "react-router-dom"

import { PATH } from "../consts"
import { AdminDashboard, ForgotPassword, Home, InternalServer, Login, NotFound, Register, RegisterPremium } from "../pages"

const AppRouter = () => {
    // const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            {/* Guest */}
            <Route path={PATH.INTERNAL_SERVER_ERROR} element={<InternalServer />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATH.HOME} element={<Home />} />
            {/* Admin */}
            <Route path={PATH.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            {/* Customer */}
            <Route path={PATH.CUSTOMER_REGISTER_PREMIUM} element={<RegisterPremium />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter
