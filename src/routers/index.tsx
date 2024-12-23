import {  Route, Routes } from "react-router-dom"

import { PATH } from "../consts"
import { Login, Register } from "../pages"

const AppRouter = () => {
    // const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
        </Routes>
    )
}

export default AppRouter
