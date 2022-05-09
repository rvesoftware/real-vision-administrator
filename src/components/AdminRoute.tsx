import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AdminRoute = ({children}:any) => {
    const adminSignin = useSelector((state:any) => state.adminSignin);
    const {adminInfo} = adminSignin;

    return adminInfo? children : <Navigate to="/signin" />
}

export default AdminRoute;