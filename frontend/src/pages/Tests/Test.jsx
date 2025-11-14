import { useEffect, useState } from "react";
import { getAllSubCategories } from "../../api/testsubcategory";
import { createTest, deleteTest, getAllTest, updateTest } from "../../api/test";

export default function Test() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        subcategory_id: "",
        name: "", 
        short_name: "",
        unit: "",
        reference_range: ""
    });
    const [subcategories, setSubCategories] = useState([]);
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        const res = await getAllTest();
        setData(res.data.data);
    };

    const loadSubCategories = async () => {
        const res = await getAllSubCategories();
        setSubCategories(res.data.data);
    }

    useEffect(() => {
        fetchData();
        loadSubCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await updateTest(editId, form);
        } else {
            await createTest(form);
        }

        setForm({
            subcategory_id: "",
            name: "", 
            short_name: "",
            unit: "",
            reference_range: ""
        });
        setEditId(null);
        fetchData();
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setForm({ 
            name: item.name ?? "",
            short_name: item.short_name ?? "",
            subcategory_id: item.subcategory_id ?? "",
            unit: item.unit ?? "",
            reference_range: item.reference_range ?? "",
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        await deleteTest(id)
        fetchData();
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <h1 className="text-2xl mb-4 font-semibold">Test</h1>
            <div className="flex justify-between gap-4">
                <div className="w-3/4 mb-6">
                    <table className="min-w-full border border-gray-200">
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className="text-left py-2 px-4 border">ID</th>
                                <th className="text-left py-2 px-4 border">Name</th>
                                <th className="text-left py-2 px-4 border">Sub Category</th>
                                <th className="text-left py-2 px-4 border">Reference Range</th>
                                <th className="text-center py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">{item.name} {item.short_name ? `(${item.short_name})` : ""}</td>
                                    <td className="py-2 px-4 border">{subcategories.find(cat => cat.id === item.subcategory_id)?.short_name }</td>
                                    <td className="py-2 px-4 border">{item.reference_range}{item.unit}</td>
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
                <div className="w-1/4">
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-2xl">
                        <h2 className="text-lg mb-3 font-medium">
                            {editId ? "Edit Test" : "Add Test"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Name"
                            className="border p-2 rounded w-full mb-3"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Short Name"
                            className="border p-2 rounded w-full mb-3"
                            value={form.short_name}
                            onChange={(e) => setForm({ ...form, short_name: e.target.value })}
                        />

                        <select
                            type="text"
                            className="border p-2 rounded w-full mb-3"
                            value={form.subcategory_id}
                            onChange={(e) => setForm({ ...form, subcategory_id: e.target.value })}
                            required
                        >
                            <option>--Select SubCategory--</option>
                            {subcategories.map((main) => (
                                <option key={main.id} value={main.id}>{main.name}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Unit"
                            className="border p-2 rounded w-full mb-3"
                            value={form.unit}
                            onChange={(e) => setForm({ ...form, unit: e.target.value })}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Reference Range"
                            className="border p-2 rounded w-full mb-3"
                            value={form.reference_range}
                            onChange={(e) => setForm({ ...form, reference_range: e.target.value })}
                            required
                        />
                        
                        <button type="button" onClick={() => {
                            setForm({
                                subcategory_id: "",
                                name: "", 
                                short_name: "",
                                unit: "",
                                reference_range: ""
                            });
                            setEditId(null);
                        }} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancel</button>

                        <button className="bg-blue-600 text-white px-4 py-2 rounded">
                            {editId ? "Update" : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
