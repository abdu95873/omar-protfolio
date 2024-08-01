import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CustomerQuery = () => {
    const [customerInfo, setCustomerInfo] = useState([]);

    useEffect(() => {
        fetchCustomerInfo();
    }, []);

    const fetchCustomerInfo = () => {
        axios.get('https://omar-server-side.vercel.app/customerInfo')
            .then(response => {
                // Sort the data by name in descending order (Z to A)
                const sortedData = response.data.sort((a, b) => {
                    if (a.name < b.name) return 1;
                    if (a.name > b.name) return -1;
                    return 0;
                });
                setCustomerInfo(sortedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleStatesToggle = (_id) => {
        const updatedCustomerInfo = customerInfo.map(customer => {
            if (customer._id === _id) {
                return { ...customer, states: 'read' }; // Change status to 'read'
            }
            return customer;
        });

        axios.patch(`https://omar-server-side.vercel.app/customerInfo/${_id}`, { states: 'read' })
            .then(response => {
                if (response.data.updated) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'States updated to Read',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setCustomerInfo(updatedCustomerInfo); // Update state after successful update
                    // No need to reload the page; state update is sufficient
                } else {
                    console.warn('Update not successful:', response.data);
                }
            })
            .catch(error => {
                console.error('Error updating states:', error);
            });
    };

    return (
        <div className='p-4'>
            <h2 className='text-3xl font-bold p-4 mb-4'>Customer Queries</h2>
            <div className='space-4 grid grid-cols-3 gap-10'>
                {customerInfo.map((customer) => (
                    <div key={customer._id} className={`p-4 border rounded shadow-xl ${customer.states === 'unread' ? 'bg-cyan-500' : 'bg-gray-100'}`}>
                        <div className='flex'>
                            <p className='text-xl'><strong>{customer.name}</strong></p>
                            <p className='text-lg ms-4'>{'<'}{customer.email}{'>'}</p>
                        </div>
                        <p className='text-lg'>Date: {customer.date}</p>
                        <br />
                        <p className='text-xl'><strong>Sub:</strong> {customer.subject}</p>
                        <br />
                        <p className='text-xl font-bold'>Dear Omar,</p>
                        <p className='text-xl' style={{ textIndent: '5rem' }}>{customer.massage}</p>
                        <br />
                        <p className='text-xl'>Please contact: {customer.number}</p>
                        <br />
                        {customer.states === 'unread' && (
                            <button className="btn hover:btn-neutral" onClick={() => handleStatesToggle(customer._id)}>
                                Mark as Read
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerQuery;
