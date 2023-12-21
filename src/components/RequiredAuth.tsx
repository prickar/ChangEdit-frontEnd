// import { Outlet, useNavigate } from "react-router-dom"
// import auth from "../lib/auth"
 
// const RequireAuth = () => {
//     const navigate = useNavigate()

//     if (!auth.isSignedIn()){
//         navigate('/sign-in')
// }

//     return <Outlet /> 
// }
 
// export default RequireAuth;

import { Navigate, Outlet } from "react-router-dom"
import auth from "../lib/auth"
 
const RequireAuth = () => {
    if (auth.isSignedIn()){
  return <Outlet />
    } else {
        <Navigate to='/sign-in' />
    }
}
 
export default RequireAuth