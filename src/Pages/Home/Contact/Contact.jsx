import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Contact = () => {

    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const number = form.number.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const massage = form.massage.value;
        const states = 'unread';
        
        
        // Generating current date
        const currentDate = new Date().toLocaleDateString('en-GB');

        const body = {
            name,
            number,
            email,
            subject,
            massage,
            date: currentDate,
            states
        }

        axios.post('http://localhost:5000/customerInfo', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your query has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    form.reset();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <div className=" bg-black text-black py-20 mg-20 bg-slate-600 ">
                <div className="grid grid-cols-1 md:grid-cols-2 mx-20">
                    <div className="card shrink-0 w-full shadow-2xl bg-black -">
                        <div className='mx-10 my-10 md:hidden'>
                            <h3 className='text-2xl font-bold text-orange-400'>CONTACT</h3>
                            <p className='text-6xl text-slate-50' style={{ fontFamily: '"Times New Roman", Times, serif' }}>REQUEST CALL BACK</p>
                            <br />
                            <p className='text-slate-50'>Nulla facilisi. Praesent non mauris ac ligula ullamcorper vehicula. Praesent mollis, nibh in venenatis iaculis, mauris eros iaculis quam, ut aliquam nisi nunc vitae quam. Fusce faucibus, felis at fermentum convallis, nunc neque aliquam turpis, ut varius ipsum nisi eu magna. Sed euismod laoreet nisi, eu iaculis elit scelerisque non.</p>
                        </div>

                        <form onSubmit={handleAddClass} className="card-body">
                            <div className='grid grid-cols-2 gap-5'>
                                <div className="form-control">
                                    <input type="text" name="name" placeholder="First Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <input
                                        type="tel"
                                        name="number"
                                        placeholder="Number"
                                        className="input input-bordered"
                                        inputMode="numeric"
                                        pattern="[0-9]{11}"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <input type="text" name="subject" placeholder="Subject" className="input input-bordered" required />
                                </div>
                                <div className="form-control col-span-2 row-span-2">
                                    <input type="text" name="massage" placeholder="Massage" className="input input-bordered h-28" required />
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-outline btn-warning" type="submit" value="Send Massage" />
                            </div>
                        </form>
                    </div>

                    <div className='mx-10 my-10 hidden sm:block'>
                        <h3 className='text-2xl font-bold text-orange-400'>CONTACT</h3>
                        <p className='text-6xl text-slate-50' style={{ fontFamily: '"Times New Roman", Times, serif' }}>REQUEST CALL BACK</p>
                        <br />
                        <p className='text-slate-50'>Nulla facilisi. Praesent non mauris ac ligula ullamcorper vehicula. Praesent mollis, nibh in venenatis iaculis, mauris eros iaculis quam, ut aliquam nisi nunc vitae quam. Fusce faucibus, felis at fermentum convallis, nunc neque aliquam turpis, ut varius ipsum nisi eu magna. Sed euismod laoreet nisi, eu iaculis elit scelerisque non.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
