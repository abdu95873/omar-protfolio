import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/Home/About/About";
import Protfolio from "../Pages/Home/Protfolio/Protfolio";
import Contact from "../Pages/Home/Contact/Contact";
import Reviews from "../Pages/Home/Reviews/Reviews";
import Story from "../Pages/Home/Story/Story";
import SocialMedia from "../Pages/Home/SocialMedia/SocialMedia";
import Blog from "../Pages/Home/Blog/Blog";
import AllBlogs from "../Pages/Home/Blog/AllBlogs";
import SingleBlog from "../Pages/Home/Blog/SingleBlog";

import Dashboard from "../Layout/Dashboard";
import AboutSection from "../DashboardPages/AboutSection";
import BannerSection from "../DashboardPages/BannerSection";
import BlogSection from "../DashboardPages/BlogSection";
import PortfolioSection from "../DashboardPages/PortfolioSection";
import ReviewsSection from "../DashboardPages/ReviewsSection";
import StorySection from "../DashboardPages/StorySection";
import CustomerQuery from "../DashboardPages/CustomerQuery";
import BannerSectionUpdate from "../DashboardPages/BannerSectionUpdate";
import AboutSectionUpdate from "../DashboardPages/AboutSectionUpdate";
import PortfolioSectionUpdate from "../DashboardPages/PortfolioSectionUpdate";
import StorySectionUpdate from "../DashboardPages/StorySectionUpdate";
import BlogSectionUpdate from "../DashboardPages/BlogSectionUpdate";
import AllStory from "../Pages/Home/Story/AllStory";
import AllAbout from "../Pages/Home/About/AllAbout";
import AllReviews from "../Pages/Home/Reviews/AllReviews";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Login/Login";
import Gallery from "../Pages/Gallery/Gallery";
import GallerySection from "../DashboardPages/GallerySection";

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

                path: "/allVideos",
                element: <AllAbout></AllAbout>
            },
            {

                path: "/protfolio",
                element: <Protfolio></Protfolio>,
                loader: () => fetch(`https://omar-server-side.vercel.app/portfolioImage`)

            },
            {

                path: "/story",
                element: <Story></Story>
            },
            {

                path: "/allStory",
                element: <AllStory></AllStory>

            },
            {
                path: "/reviews",
                element: <Reviews> </Reviews>

            },
            {
                path: "/allReviews",
                element: <AllReviews></AllReviews>

            },
            {

                path: "/contact",
                element: <Contact></Contact>
            },
            {

                path: "/blog",
                element: <Blog></Blog>
            },
            {
                path: "/singleBlog/:id",
                element: <SingleBlog></SingleBlog>,
                loader: ({ params }) => fetch(`https://omar-server-side.vercel.app/blogSection/${params.id}`)

            },

            {

                path: "/allBlogs",
                element: <AllBlogs></AllBlogs>
            },
            {

                path: "/socialMedia",
                element: <SocialMedia></SocialMedia>
            },
            {

                path: "/gallery",
                element: <Gallery></Gallery>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {

                index:CustomerQuery,
                element: <CustomerQuery></CustomerQuery>


            },

            {

                path: "/dashboard/aboutSection",
                element: <AboutSection></AboutSection>,
                loader: () => fetch(`https://omar-server-side.vercel.app/about`)
            },
            {

                path: "/dashboard/aboutSection/:id",
                element: <AboutSectionUpdate></AboutSectionUpdate>,
                loader: ({ params }) => fetch(`https://omar-server-side.vercel.app/about/${params.id}`)
            },
            {

                path: "/dashboard/bannerSection",
                element: <BannerSection></BannerSection>,
                loader: () => fetch(`https://omar-server-side.vercel.app/bannerImage`)
            },
            {

                path: "/dashboard/bannerSectionUpdate/:id",
                element: <BannerSectionUpdate></BannerSectionUpdate>,
                loader: ({ params }) => fetch(`https://omar-server-side.vercel.app/bannerImage/${params.id}`)
            },
            {

                path: "/dashboard/blogSection",
                element: <BlogSection></BlogSection>,
                loader: () => fetch(`https://omar-server-side.vercel.app/blogSection`)
            },
            {

                path: "/dashboard/blogSectionUpdate/:id",
                element: <BlogSectionUpdate></BlogSectionUpdate>,
                loader: ({ params }) => fetch(`https://omar-server-side.vercel.app/blogSection/${params.id}`)
            },
            {

                path: "/dashboard/portfolioSection",
                element: <PortfolioSection></PortfolioSection>,
                loader: () => fetch(`https://omar-server-side.vercel.app/portfolioImage`)
            },
            {

                path: "/dashboard/portfolioSectionUpdate/:id",
                element: <PortfolioSectionUpdate></PortfolioSectionUpdate>,
                loader: ({ params }) => fetch(`https://omar-server-side.vercel.app/portfolioImage/${params.id}`)
            },
            {

                path: "/dashboard/reviewsSection",
                element: <ReviewsSection></ReviewsSection>
            },
            {

                path: "/dashboard/storySection",
                element: <StorySection></StorySection>,
                loader: () => fetch(`https://omar-server-side.vercel.app/storySection`)
            },
            {

                path: "/dashboard/storySectionUpdate/:id",
                element: <StorySectionUpdate></StorySectionUpdate>,
                loader: ({ params }) => fetch(`https://omar-server-side.vercel.app/storySection/${params.id}`)
            },
            {

                path: "/dashboard/gallerySection",
                element: <GallerySection></GallerySection>,
                loader: () => fetch(`https://omar-server-side.vercel.app/portfolioImage`)

            },

        ]
    },
]);