import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";


const PrivetRouter = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user){
        return children;
    }
    return <Navigate to={"/login"}></Navigate>
};

export default PrivetRouter;