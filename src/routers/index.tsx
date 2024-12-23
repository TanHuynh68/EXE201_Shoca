import {  Route, Routes } from "react-router-dom"

import { PATH } from "../consts"
import { ForgotPassword, Login, Register } from "../pages"

const AppRouter = () => {
    // const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            {/* Guest */}
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Routes>
    )
}

export default AppRouter
