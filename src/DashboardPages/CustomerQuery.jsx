import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";

const CustomerQuery = () => {
  const [customerInfo, setCustomerInfo] = useState([]);

  useEffect(() => {
    fetchCustomerInfo();
  }, []);

  const fetchCustomerInfo = () => {
    axios
      .get("https://omar-server-side.vercel.app/customerInfo")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.name.localeCompare(a.name));
        setCustomerInfo(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleStatesToggle = (_id) => {
    setCustomerInfo((prev) =>
      prev.map((customer) =>
        customer._id === _id ? { ...customer, states: "read" } : customer
      )
    );

    axios
      .patch(`https://omar-server-side.vercel.app/customerInfo/${_id}`, { states: "read" })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Marked as Read",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.error("Error updating states:", error));
  };

  const unreadCount = customerInfo.filter((c) => c.states === "unread").length;

  return (
    <div>
      <DashboardPageHeader
        label="Inbox"
        title="Customer queries"
        subtitle="Messages from the contact form on your site."
        action={
          unreadCount > 0 ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {unreadCount} unread
            </span>
          ) : null
        }
      />

      {customerInfo.length === 0 ? (
        <div className="dashboard-panel p-10 text-center text-neutral-500">
          No customer messages yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {customerInfo.map((customer) => {
            const unread = customer.states === "unread";
            return (
              <article
                key={customer._id}
                className={`dashboard-panel flex flex-col p-6 transition-shadow hover:shadow-md ${
                  unread ? "ring-2 ring-orange-200 ring-offset-2" : ""
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-2">
                  <h3 className="font-serif text-xl text-neutral-900">{customer.name}</h3>
                  {unread && (
                    <span className="shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      New
                    </span>
                  )}
                </div>
                <p className="mb-3 truncate text-sm text-neutral-500">{customer.email}</p>

                <div className="mb-4 space-y-1 text-sm text-neutral-600">
                  <p>
                    <span className="font-medium text-neutral-800">Date:</span> {customer.date}
                  </p>
                  <p>
                    <span className="font-medium text-neutral-800">Subject:</span>{" "}
                    {customer.subject}
                  </p>
                  <p>
                    <span className="font-medium text-neutral-800">Phone:</span> {customer.number}
                  </p>
                </div>

                <div className="mb-4 flex-1 rounded-xl border-l-4 border-orange-400 bg-neutral-50 py-3 pl-4 pr-3">
                  <p className="text-sm leading-relaxed text-neutral-700">{customer.massage}</p>
                </div>

                {unread && (
                  <button
                    type="button"
                    onClick={() => handleStatesToggle(customer._id)}
                    className="btn-brand !w-full !py-2.5 !text-sm"
                  >
                    Mark as read
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerQuery;
