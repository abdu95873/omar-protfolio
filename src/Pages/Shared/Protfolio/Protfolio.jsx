

import CustomSlider from './CustomSlider';

const Protfolio = () => {
    return (
        <div>
            <div className='bg-black text-white py-20'>
                <div className='mx-10'>
                    <h3 className='text-xl text-orange-400'>PORTFOLIO</h3>
                    <p className='text-6xl'>FEATURED PROJECT</p>
                </div>
            </div>
            <div>
              <CustomSlider></CustomSlider>
            </div>
        </div>
    );
};

export default Protfolio;
