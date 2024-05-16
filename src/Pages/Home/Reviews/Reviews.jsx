import Marquee from 'react-fast-marquee';
import React from 'react';
import { FaQuoteRight } from "react-icons/fa";


import ReactStarsRating from 'react-awesome-stars-rating';
const Reviews = () => {
    const onChange = (value) => {
        console.log(`React Stars Rating value is ${value}`);
    };

    const ReactStarsExample = ({ value }) => {
        return <ReactStarsRating onChange={onChange} value={value} />;
    };


    return (
        <div>
            <div className='mx-10 my-10 text-center'>
                <h3 className='text-xl text-orange-400'>TESTIMONIAL</h3>
                <p className='text-6xl text-white'>WHAT THEY SAY ABOUT OUR STUDIO ? </p>
                <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
            <div className='my-20'>
                <Marquee className='my-5'>
                    <div className="card w-96 bg-slate-600 text-white shadow-xl mx-10">
                        <div className="card-body">
                            <div>
                                <ReactStarsExample
                                    value={4}
                                    count={4}
                                    size={25}
                                    edit={false}
                                    isHalf={false}
                                    activeColor="#ffea00"
                                />
                            </div>
                            <br />

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum corporis delectus nisi voluptate laboriosam asperiores? Incidunt est impedit hic facilis labore eveniet quo! Nobis adipisci saepe doloremque ullam natus?</p>

                            <br /><br />

                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-xl text-orange-400'>DYAS KARDINAL</p>
                                    <p className='text-xl'>CEO OF CINESTAR</p>
                                </div>

                                <div className='items-center'>
                                    <FaQuoteRight />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="card w-96 bg-slate-600 text-white shadow-xl mx-10">
                        <div className="card-body">
                            <div>
                                <ReactStarsExample
                                    value={4}
                                    count={4}
                                    size={25}
                                    edit={false}
                                    isHalf={false}
                                    activeColor="#ffea00"
                                />
                            </div>
                            <br />

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum corporis delectus nisi voluptate laboriosam asperiores? Incidunt est impedit hic facilis labore eveniet quo! Nobis adipisci saepe doloremque ullam natus?</p>

                            <br /><br />

                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-xl text-orange-400'>DYAS KARDINAL</p>
                                    <p className='text-xl'>CEO OF CINESTAR</p>
                                </div>

                                <div className='items-center'>
                                    <FaQuoteRight />
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="card w-96 bg-slate-600 text-white shadow-xl mx-10">
                        <div className="card-body">
                            <div>
                                <ReactStarsExample
                                    value={4}
                                    count={4}
                                    size={25}
                                    edit={false}
                                    isHalf={false}
                                    activeColor="#ffea00"
                                />
                            </div>
                            <br />

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum corporis delectus nisi voluptate laboriosam asperiores? Incidunt est impedit hic facilis labore eveniet quo! Nobis adipisci saepe doloremque ullam natus?</p>

                            <br /><br />

                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-xl text-orange-400'>DYAS KARDINAL</p>
                                    <p className='text-xl'>CEO OF CINESTAR</p>
                                </div>

                                <div className='items-center'>
                                    <FaQuoteRight />
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="card w-96 bg-slate-600 text-white shadow-xl mx-10">
                        <div className="card-body">
                            <div>
                                <ReactStarsExample
                                    value={4}
                                    count={4}
                                    size={25}
                                    edit={false}
                                    isHalf={false}
                                    activeColor="#ffea00"
                                />
                            </div>
                            <br />

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum corporis delectus nisi voluptate laboriosam asperiores? Incidunt est impedit hic facilis labore eveniet quo! Nobis adipisci saepe doloremque ullam natus?</p>

                            <br /><br />

                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-xl text-orange-400'>DYAS KARDINAL</p>
                                    <p className='text-xl'>CEO OF CINESTAR</p>
                                </div>

                                <div className='items-center'>
                                    <FaQuoteRight />
                                </div>
                            </div>
                        </div>
                        
                    </div>


                    <div className="card w-96 bg-slate-600 text-white shadow-xl mx-10">
                        <div className="card-body">
                            <div>
                                <ReactStarsExample
                                    value={4}
                                    count={4}
                                    size={25}
                                    edit={false}
                                    isHalf={false}
                                    activeColor="#ffea00"
                                />
                            </div>
                            <br />

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laborum corporis delectus nisi voluptate laboriosam asperiores? Incidunt est impedit hic facilis labore eveniet quo! Nobis adipisci saepe doloremque ullam natus?</p>

                            <br /><br />

                            <div className='flex justify-between'>
                                <div>
                                    <p className='text-xl text-orange-400'>DYAS KARDINAL</p>
                                    <p className='text-xl'>CEO OF CINESTAR</p>
                                </div>

                                <div className='items-center'>
                                    <FaQuoteRight />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    

                </Marquee>
                
            </div>
        </div>
    );
};

export default Reviews;