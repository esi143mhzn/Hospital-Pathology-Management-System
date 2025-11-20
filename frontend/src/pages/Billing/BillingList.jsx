import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext.jsx';
import { deleteBill, getAllBills } from '../../api/billing.js';

const BillingList = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const { successMsg, showSuccess } = useNotification();

    const fetchBillsData = async () => {
        try {
            const res = await getAllBills();
            setBills(res.data.data)

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this bill?")) {
            try {
                const res = await deleteBill(id);
                setBills(bills.filter((bill) => bill.id !== id));
                showSuccess(res.data.message);
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchBillsData();
    }, [])

    return (
        <div className='bg-white rounded-xl shadow p-6 overflow-x-auto'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-800'>Billing Records</h2>
                {successMsg &&
                    <p className="text-green-500 bg-green-100 p-2 text-center rounded mb-4">{successMsg}</p>
                }
                <Link to="/billing/create" className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>+ Add New Bill</Link>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className='min-w-full border border-gray-200'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='text-left py-2 px-4 border'>Bill No.</th>
                            <th className='text-left py-2 px-4 border'>Patient Name</th>
                            <th className='text-left py-2 px-4 border'>Total Amount</th>
                            <th className='text-left py-2 px-4 border'>Discount</th>
                            <th className='text-left py-2 px-4 border'>Paid Amount</th>
                            <th className='text-left py-2 px-4 border'>Status</th>
                            <th className='text-left py-2 px-4 border'>Created By</th>
                            <th className='text-left py-2 px-4 border'>Bill Date </th>
                            <th className='text-center py-2 px-4 border'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.length > 0 ? (bills.map((bill) => (
                            <tr key={bill.id} className='hover:bg-gray-50'>
                                <td className='py-2 px-4 border'>{bill.bill_no}</td>
                                <td className='py-2 px-4 border'>{bill.patient_name}</td>
                                <td className='py-2 px-4 border'>{bill.total_amount}</td>
                                <td className='py-2 px-4 border'>{bill.discount}</td>
                                <td className='py-2 px-4 border'>{bill.paid_amount}</td>
                                <td className='py-2 px-4 border'>{bill.status}</td>
                                <td className='py-2 px-4 border'>{bill.created_by_name}</td>
                                <td className='py-2 px-4 border'>{new Date(bill.created_at).toLocaleString()}</td>
                                <td className='py-2 px-4 border text-center space-x-2'>
                                    <Link to={`/billing/${bill.id}`} className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'>Edit</Link>
                                    <button onClick={() => handleDelete(bill.id)} className='bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700'>Delete</button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr className='text-center'>
                                <td colSpan="5" className='py-4 text-gray-500'>No bills found.</td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default BillingList