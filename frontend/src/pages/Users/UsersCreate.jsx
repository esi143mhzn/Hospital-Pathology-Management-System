import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/users.js";
import { useNotification } from "../../context/NotificationContext.jsx";

const UserCreate = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    });
    const { showSuccess } = useNotification();
    const [errorMsg, setErrorMsg] = useState();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createUser(form);
            navigate("/user");
            showSuccess(res.data.message);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Create User</h2>
            {errorMsg &&
                <p className="text-red-500 bg-red-100 p-2 text-center rounded mb-4">{errorMsg}</p>
            }
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2" required />
                <select name="role" value={form.role} onChange={handleChange} className="border p-2 required">
                    <option value="">--Select Role--</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="lab">Lab</option>
                </select>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2" required/>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => navigate("/user")} className="px-4 py-2 border rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
                </div>
            </form>
        </div>
    );
};

export default UserCreate;
