import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext.jsx';
import { createBill } from '../../api/billing.js';
import { getPatientById } from '../../api/patients.js';
import { getAllCategories } from '../../api/testcategory.js';

const BillingCreate = () => {
    const navigate = useNavigate();
    const { showSuccess } = useNotification();
    const [errorMsg, setErrorMsg] = useState();
    const [categories, setCategories] = useState([]);
    const [patientId, setPatientId] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [rows, setRows] = useState([{ id: Date.now(), test_category_id: "", price: 0 }]);
    const [paidAmount, setPaidAmount] = useState(0);
    const [status, setStatus] = useState("unpaid");
    const [isPaidEdited, setIsPaidEdited] = useState(false);

    const fetchPatientsData = async (id) => {
        try {
            const res = await getPatientById(id);
            setPatientId(res.data.data)

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const fetchCategoryData = async () => {
        try {
            const res = await getAllCategories();
            setCategories(res.data.data)

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPatientsData();
        fetchCategoryData()
    }, [])

    // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFilterPatient = async () => {
        const found = await getPatientById(patientId);
        if (!found) {
            alert("Patient not found!");
            setSelectedPatient(null);
        } else {
            setSelectedPatient(found.data.data);
        }
    }

    const handleTestChange = (index, test_category_id) => {
        const selectedId = parseInt(test_category_id);
        const selectedCategory = categories.find((c) => c.id === selectedId);
        const newRows = [...rows];
        newRows[index] = {
            ...newRows[index],
            test_category_id: selectedId,
            price: Number(selectedCategory?.price || 0)
        }
        setRows(newRows);
    }

    const addRow = () => setRows([...rows, { id: Date.now(), test_category_id: "", price: 0 }]);
    const calculateDiscountPercent = () => {
        const type = selectedPatient?.identity_type;
        const number = selectedPatient?.identity_number;

        if (!type || !number) return 0;

        switch (type) {
            case "Citizenship ID":
                return 15;
            case "Senior Citizenship ID":
                return 25;
            case "Staff ID":
                return 50;
            default:
                return 0;
        }
    };


    const discountPercent = calculateDiscountPercent();
    const subtotal = rows.reduce((sum, r) => sum + Number(r.price), 0);
    const discountAmount = (subtotal * discountPercent) / 100
    const total = subtotal - discountAmount;
    const autoPaid = total; // auto calculate paid if needed

    useEffect(() => {
        if(!isPaidEdited) setPaidAmount(autoPaid);
        setStatus(paidAmount === 0 ? "unpaid" : total === paidAmount ? "paid" : "partial");
    }, [total, paidAmount, autoPaid, isPaidEdited]);

    const removeRow = (index) => setRows(rows.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                patient_id: selectedPatient.id,
                discount: discountAmount,
                total_amount: subtotal,
                paid_amount: paidAmount,
                status,
                remarks: "",
                bill_items: rows.map(r => ({
                    test_category_id: r.test_category_id,
                    price: r.price
                }))
            }
            const res = await createBill(payload);
            navigate("/billing");
            showSuccess(res.data.message);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="p-6 max-w-full mx-auto mt-5 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Create New Bill</h2>
            {errorMsg &&
                <p className="text-red-500 bg-red-100 p-2 text-center rounded mb-4">{errorMsg}</p>
            }
            <div className="w-1/4 mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Enter Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="border p-2 rounded flex-1"
                />
                <button
                    onClick={handleFilterPatient}
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Filter
                </button>
            </div>

            {selectedPatient && (
                <div className="mb-4 p-3 bg-gray-100 rounded">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Name <span className="text-red-500"> *</span></label>
                            <input
                                type="text"
                                name="name"
                                value={selectedPatient.name}
                                
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>

                        <div className="w-full md:w-1/3">
                            <label className="block font-medium mb-2">Gender <span className="text-red-500"> *</span></label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={selectedPatient.gender === "Male"}
                                        
                                        required
                                    />
                                    Male
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={selectedPatient.gender === "Female"}
                                        
                                        required
                                    />
                                    Female
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Others"
                                        checked={selectedPatient.gender === "Others"}
                                        
                                        required
                                    />
                                    Others
                                </label>
                            </div>
                        </div>

                        <div className="w-full md:w-1/4">
                            <label className="block font-medium">Age <span className="text-red-500"> *</span></label>
                            <input
                                type="number"
                                name="age"
                                value={selectedPatient.age}
                                
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={selectedPatient.address}
                                
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>

                        <div className="w-full md:w-1/3">
                            <label className="block font-medium">Identity Type</label>
                            <select
                                name="identity_type"
                                value={selectedPatient.identity_type}
                                
                                className="w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">-- Select Identity Type --</option>
                                <option>Citizenship ID</option>
                                <option>Senior Citizenship ID</option>
                                <option>Staff ID</option>
                            </select>
                        </div>

                        <div className="w-full md:w-1/4">
                            <label className="block font-medium">Identity Number</label>
                            <input
                                type="text"
                                name="identity_number"
                                value={selectedPatient.identity_number}
                                
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                    </div>
                </div>
            )}

            {selectedPatient && (
                <form onSubmit={handleSubmit} className='max-w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4'>
                    <table className="w-full border mb-3">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Test Name</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td className="border p-2">
                                        <select
                                            value={row.test_category_id || ""}
                                            onChange={(e) => handleTestChange(index, e.target.value)}
                                            className="border p-1 w-full"
                                        >
                                            <option value="">Select Test</option>
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border p-2 text-right">{row.price || "0.00"}</td>
                                    <td className="border p-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => removeRow(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button type="button" onClick={addRow} className="bg-gray-600 text-white px-3 py-1 rounded mb-3">
                        Add Test Row
                    </button>

                    <div className="flex flex-col md:flex-row gap-4">
                        
                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Subtotal Amount</label>
                            <input
                                type="text"
                                name="subtotal"
                                value={subtotal}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Discount %</label>
                            <input
                                type="text"
                                name="name"
                                value={discountPercent}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Discount Amount</label>
                            <input
                                type="text"
                                name="name"
                                value={discountAmount}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Total Amount </label>
                            <input
                                type="text"
                                name="name"
                                value={total}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Paid Amount</label>
                            <input
                                type="text"
                                name="name"
                                value={paidAmount}
                                onChange={(e) => {setPaidAmount(parseFloat(e.target.value) || 0); setIsPaidEdited(true)}}
                                className="w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4 text-center">
                        <button
                            type="submit"
                            className="w-1/6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" disabled={loading}
                        >
                            {loading ? "Saving" : "Save Bill"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default BillingCreate;