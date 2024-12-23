import {  Route, Routes } from "react-router-dom"

import { PATH } from "../consts"
import { ForgotPassword, Home, Login, Register } from "../pages"

const AppRouter = () => {
    // const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            {/* Guest */}
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={PATH.HOME} element={<Home />} />
        </Routes>
    )
}

export default AppRouter
