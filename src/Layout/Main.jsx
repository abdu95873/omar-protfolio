import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Pages/Shared/Nav/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    const location = useLocation();
    const hideNavbarFooter = location.pathname === '/login';

    return (
        <div className='bg-custom-black'>
            {!hideNavbarFooter && <Navbar />}
            <Outlet />
            {!hideNavbarFooter && <Footer />}
        </div>
    );
};

export default Main;
