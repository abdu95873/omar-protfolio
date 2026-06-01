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
        const sortedData = response.data.sort((a, b) => b.name.localeCompare(a.name));
        setCustomerInfo(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

const handleStatesToggle = (_id) => {
  // Update local state immediately
  setCustomerInfo(prev =>
    prev.map(customer =>
      customer._id === _id ? { ...customer, states: 'read' } : customer
    )
  );

  // Send patch request
  axios.patch(`https://omar-server-side.vercel.app/customerInfo/${_id}`, { states: 'read' })
    .then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Marked as Read',
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch(error => console.error('Error updating states:', error));
};


  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-orange-500 tracking-wide">
        Customer Queries
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {customerInfo.map((customer) => (
          <div
            key={customer._id}
            className={`flex flex-col p-6 rounded-3xl shadow-md transition-transform duration-300 hover:scale-105
              ${customer.states === 'unread' ? 'bg-gradient-to-r from-cyan-100 to-cyan-50' : 'bg-white'}`}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{customer.name}</h3>
              <span className="text-sm text-gray-500 md:ml-2 italic">&lt;{customer.email}&gt;</span>
            </div>

            {/* Info */}
            <div className="text-gray-700 mb-4 space-y-1">
              <p className="text-sm"><span className="font-semibold">Date:</span> {customer.date}</p>
              <p className="text-sm"><span className="font-semibold">Subject:</span> {customer.subject}</p>
            </div>

            {/* Message */}
            <div className="mb-4 border-l-4 border-orange-400 pl-4">
              <p className="font-semibold text-gray-800 mb-1">Dear Omar,</p>
              <p className="text-gray-700 text-sm leading-relaxed">{customer.massage}</p>
            </div>

            {/* Contact */}
            <p className="text-gray-600 text-sm mb-4"><span className="font-semibold">Contact:</span> {customer.number}</p>

            {/* Action */}
            {customer.states === 'unread' && (
              <button
                onClick={() => handleStatesToggle(customer._id)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-2 px-4 w-full transition-colors duration-200"
              >
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
