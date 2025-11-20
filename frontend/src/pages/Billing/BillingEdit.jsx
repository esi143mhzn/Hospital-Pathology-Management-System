import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { getPatientById } from "../../api/patients";
import { deleteBillItem, getBillById, updateBill } from "../../api/billing";
import { getAllCategories } from "../../api/testcategory";

const BillingEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { successMsg, showSuccess } = useNotification();

    const [error, setError] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [bill, setBill] = useState([]);
    const [categories, setCategories] = useState([]);

    const [rows, setRows] = useState([{ id: Date.now(), test_category_id: "", price: 0 }]);
    
    const [paidAmount, setPaidAmount] = useState(0);
    const [status, setStatus] = useState("unpaid");
    const [isPaidEdited, setIsPaidEdited] = useState(false);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const billRes = await getBillById(id);
                const billData = billRes.data.data[0];
                setBill(billData);

                const patientRes = await getPatientById(billData.patient_id);
                setSelectedPatient(patientRes.data.data);
                setRows(
                    billData.bill_items.map(item => ({
                        id: item.id,
                        test_category_id: item.test_category_id,
                        price: Number(item.price)
                    }))
                );

                setPaidAmount(Number(billData.paid_amount) || 0);
                setIsPaidEdited(true);

            } catch (err) {
                console.log(err);
            }
        };
        
        const loadCategories = async () => {
                try {
                    const res = await getAllCategories();
                    setCategories(res.data.data)
        
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        load();
        loadCategories();
    }, [id]);

    const handleTestChange = (index, test_category_id) => {
            const selectedId = parseInt(test_category_id);
            const category = categories.find((c) => c.id === selectedId);
            const newRows = [...rows];
            newRows[index] = {
                ...newRows[index],
                test_category_id: selectedId,
                price: Number(category?.price || 0)
            }
            setRows(newRows);
        }

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
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                bill_no: bill.bill_no,
                patient_id: selectedPatient.id,
                discount: discountAmount,
                total_amount: subtotal,
                paid_amount: paidAmount,
                status,
                remarks: "",
                bill_items: rows.map(r => ({
                    id: r.id,
                    test_category_id: r.test_category_id,
                    price: r.price
                }))
            };
            const res = await updateBill(id, payload);
            navigate("/billing");
            showSuccess(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const addRow = () => setRows([...rows, { id: undefined, test_category_id: "", price: 0 }]);
    const removeRow = async (index) => {
        const item = rows[index];
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                if(item.id) {
                   const res = await deleteBillItem(item.id)
                   showSuccess(res.data.message);
                }
                setRows(rows.filter((_, i) => i !== index))
            } catch (err) {
            console.error(err);
            }
        }
        
    };

    if (!selectedPatient) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 max-w-full mx-auto mt-5 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
            {error && (
                <p className="text-red-500 bg-red-100 p-2 text-center rounded mb-4">
                    {error}
                </p>
            )}
            {selectedPatient && (
                <div className="mb-4 p-3 bg-gray-100 rounded">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block font-medium">Name <span className="text-red-500"> *</span></label>
                            <input
                                type="text"
                                value={selectedPatient.name}
                                className="w-full border border-gray-300 rounded p-2"
                                readOnly
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
                                        
                                        readOnly
                                    />
                                    Male
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={selectedPatient.gender === "Female"}
                                        
                                        readOnly
                                    />
                                    Female
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Others"
                                        checked={selectedPatient.gender === "Others"}
                                        
                                        readOnly
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
                                readOnly
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
                                readOnly
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>

                        <div className="w-full md:w-1/3">
                            <label className="block font-medium">Identity Type</label>
                            <select
                                name="identity_type"
                                value={selectedPatient.identity_type}
                                readOnly
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
                                readOnly
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                    </div>
                </div>
            )}

            {selectedPatient && (
                <form onSubmit={handleSubmit} className='max-w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4'>
                    {successMsg && 
                        <p className="text-green-500 bg-green-100 p-2 text-center rounded mb-4">{successMsg}</p>
                    }
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
                                type="number"
                                value={paidAmount}
                                onChange={(e) => {setPaidAmount(Number(e.target.value) || 0); setIsPaidEdited(true)}}
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
};

export default BillingEdit;
