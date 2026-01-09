import Banner from '../Banner/Banner';
import About from '../../Home/About/About';
import Protfolio from '../../Home/Protfolio/Protfolio';
import Story from '../Story/Story';
import Reviews from '../Reviews/Reviews';
import Contact from '../Contact/Contact';
import Blog from '../Blog/Blog';
import SocialMedia from '../SocialMedia/SocialMedia';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div >
          <Banner></Banner>
          <About></About>
          <Protfolio></Protfolio>
         
          <Story></Story>
          <Reviews></Reviews>
          <Contact></Contact>
          <Blog></Blog>
          <Services></Services>
          <SocialMedia></SocialMedia>
          
        </div>
    );
};

export default Home;