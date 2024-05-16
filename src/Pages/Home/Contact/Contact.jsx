import React from 'react';

const Contact = () => {
    return (
        <div >
            <div>
                <div className=" bg-black text-white py-20">
                    <div className="grid grid-cols-2 mx-20">

                        <div className="card shrink-0 w-full shadow-2xl bg-black">

                            <form className="card-body">

                                <div className='grid grid-cols-2 gap-5'>
                                    <div className="form-control">

                                        <input type="text" placeholder="First Name" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">

                                        <input type="text" placeholder="Last Name" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">

                                        <input type="text" placeholder="Email" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">

                                        <input type="text" placeholder="Subject" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control col-span-2 row-span-2">

                                        <input type="text" placeholder="Massage" className="input input-bordered  h-28" required />
                                    </div>

                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-outline btn-warning">Send Massage</button>

                                </div>
                            </form>
                        </div>
                        <div className='mx-10 my-10'>
                            <h3 className='text-xl text-orange-400'>CONTACT</h3>
                            <p className='text-6xl text-white'>REQUEST CALL BACK
                            </p>
                            <br />
                            <p className='text-white'>Nulla facilisi. Praesent non mauris ac ligula ullamcorper vehicula. Praesent mollis, nibh in venenatis iaculis, mauris eros iaculis quam, ut aliquam nisi nunc vitae quam. Fusce faucibus, felis at fermentum convallis, nunc neque aliquam turpis, ut varius ipsum nisi eu magna. Sed euismod laoreet nisi, eu iaculis elit scelerisque non.

                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;