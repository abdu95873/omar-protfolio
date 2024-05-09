import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/Shared/About/About";
import Protfolio from "../Pages/Shared/Protfolio/Protfolio";
import Contact from "../Pages/Home/Contact/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {

                path: "/",
                element: <Home></Home>
            },
            {

                path: "/about",
                element: <About></About>
            },
            {

                path: "/protfolio",
                element: <Protfolio></Protfolio>
            },
            {

                path: "/contact",
                element: <Contact></Contact>
            }
        ]
    },
]);