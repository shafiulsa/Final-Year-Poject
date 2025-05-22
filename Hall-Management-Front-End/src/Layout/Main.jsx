import { Outlet, useLocation } from "react-router-dom";
import Navber from "../pages/Shared/Navber";
import Footer from "../pages/Shared/Footer";


const Main = () => {
    const location=useLocation();
    console.log(location);
    const noHeaderFooter =location.pathname.includes('login');
    return (
        <>
               {noHeaderFooter ||<Navber></Navber>} 
               <Outlet></Outlet>
               {noHeaderFooter ||<Footer></Footer>}
        </>

    );
};

export default Main;