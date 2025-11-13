import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { getPatientById, updatePatient } from "../../api/patients";

const PatientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        address: "",
        identity_type: "",
        identity_number: "",
        age: "",
        gender: "",
    });
    const { showSuccess } = useNotification();
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await getPatientById(id);
                setForm(res.data.data);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        };
        fetchPatient();
    }, [id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updatePatient(id, form);
            navigate("/patient");
            showSuccess(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="p-6 max-w-full mx-auto mt-5 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
            {error && (
                <p className="text-red-500 bg-red-100 p-2 text-center rounded mb-4">
                    {error}
                </p>
            )}
            <form
                onSubmit={handleSubmit}
                className="max-w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                        <label className="block font-medium">Name <span className="text-red-500"> *</span></label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
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
                                    checked={form.gender === "Male"}
                                    onChange={handleChange}
                                    required
                                />
                                Male
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={form.gender === "Female"}
                                    onChange={handleChange}
                                    required
                                />
                                Female
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Others"
                                    checked={form.gender === "Others"}
                                    onChange={handleChange}
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
                            value={form.age}
                            onChange={handleChange}
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
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <div className="w-full md:w-1/3">
                        <label className="block font-medium">Identity Type</label>
                        <select
                            name="identity_type"
                            value={form.identity_type}
                            onChange={handleChange}
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
                            value={form.identity_number}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2"
                        />
                    </div>
                </div>

                <div className="pt-4 text-center">
                    <button
                        type="submit"
                        className="w-1/6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Update Patient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientEdit;
