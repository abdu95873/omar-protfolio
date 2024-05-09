import React from 'react';


const About = () => {
    return (
        <div className='bg-black text-white py-20'>
            <div className='grid grid-cols-2 mx-10 pb-20'>
                <div>
                    <h3 className='text-xl text-orange-400'>CINESTER STUDIO</h3>
                    <p className='text-6xl'>HAVE IDEA FOR YOUR PROJECT ?</p>
                </div>
                <div>
                    <p>Proin et magna blandit arcu pellentesque scelerisque sit amet a sapien. Aenean purus nunc, cursus in ante in, vehicula facilisis dui. Integer consequat consectetur est id blandit. Duis fermentum nulla non mi tempor elementum. Donec efficitur ac eros quis porta.</p>
                </div>
            </div>
            <div className='grid grid-cols-5 mx-10 gap-20'>
                <div className="relative overflow-hidden col-span-3 " style={{ paddingTop: "56.25%" }}> {/* 16:9 aspect ratio */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/_GUt8c4OJ5o"
                        title="YouTube video player"
                        allowFullScreen
                    />


                </div>

                <div className='col-span-2'>
                    <h1 className='text-xl'>DO NOT HESITATE TO CHOOSE CINESTAR AS YOUR STUDIO PRODUCTION</h1>
                    <br />
                    <p>Integer scelerisque nulla nec lectus dapibus gravida. Nulla sit amet leo vel orci convallis hendrerit. Donec eget enim pharetra, interdum tellus et, fringilla dolor. Duis eget imperdiet nisl. Sed quis convallis felis. Donec varius dictum purus, at ullamcorper eros dictum venenatis. Pellentesque dictum dictum quam vitae laoreet.</p>

                    <div className='flex justify-around py-20'>
                        <div >
                            <p className='countdown text-6xl text-center py-5 text-orange-400' >250+</p>
                            <p>MOVIE PRODUCTION</p>
                        </div>
                        <div>
                            <p className='text-6xl text-center py-5 text-orange-400'>78+</p>
                            <p>MUSIC VIDEO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;