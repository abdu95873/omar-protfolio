import React from 'react';
import Banner from '../Banner/Banner';
import About from '../../Shared/About/About';
import Protfolio from '../../Shared/Protfolio/Protfolio';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <About></About>
          <Protfolio></Protfolio>
        </div>
    );
};

export default Home;