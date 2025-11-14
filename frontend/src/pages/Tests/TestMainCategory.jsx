import { useEffect, useState } from "react";
import { createMainCategory, deleteMainCategory, getAllMainCategories, updateMainCategory } from "../../api/testmaincategory";

export default function TestMainCategory() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ name: "" });
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        const res = await getAllMainCategories();
        setData(res.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await updateMainCategory(editId, form);
        } else {
            await createMainCategory(form);
        }

        setForm({ name: "" });
        setEditId(null);
        fetchData();
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setForm({ name: item.name });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        await deleteMainCategory(id)
        fetchData();
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <h1 className="text-2xl mb-4 font-semibold">Test Main Category</h1>
            <div className="flex justify-between">
                <div className="min-w-2/3 mb-6">
                    <table className="min-w-full border border-gray-200">
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className="text-left py-2 px-4 border">ID</th>
                                <th className="text-left py-2 px-4 border">Name</th>
                                <th className="text-center py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">{item.name}</td>
                                    <td className="py-2 px-4 border text-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="min-w-1/4">
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-2xl">
                        <h2 className="text-lg mb-3 font-medium">
                            {editId ? "Edit Main Category" : "Add Main Category"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Category Name"
                            className="border p-2 rounded w-full mb-3"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <button className="bg-blue-600 text-white px-4 py-2 rounded">
                            {editId ? "Update" : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
