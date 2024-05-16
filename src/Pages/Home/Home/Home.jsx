import React from 'react';
import Banner from '../Banner/Banner';
import About from '../../Shared/About/About';
import Protfolio from '../../Shared/Protfolio/Protfolio';
import Story from '../Story/Story';
import Reviews from '../Reviews/Reviews';
import Contact from '../Contact/Contact';
import Blog from '../Blog/Blog';
import SocialMedia from '../SocialMedia';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <About></About>
          <Protfolio></Protfolio>
          <Story></Story>
          <Reviews></Reviews>
          <Contact></Contact>
          <Blog></Blog>
          <SocialMedia></SocialMedia>
        </div>
    );
};

export default Home;