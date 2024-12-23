import {  Route, Routes } from "react-router-dom"

import { PATH } from "../consts"
import { Login } from "../pages"

const AppRouter = () => {
    // const { canAccess } = useRoleRedirect();
    return (
        <Routes>
            <Route path={PATH.LOGIN} element={<Login />} />
        </Routes>
    )
}

export default AppRouter
