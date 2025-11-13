import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext.jsx';
import { deletePatient, getAllPatients } from '../../api/patients.js';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { successMsg, showSuccess } = useNotification();

  const fetchPatientsData = async () => {
    try {
      const res = await getAllPatients();
      setPatients(res.data.data)
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const res = await deletePatient(id);
        setPatients(patients.filter((patient) => patient.id !== id));
        showSuccess(res.data.message);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchPatientsData();
  }, [])

  return (
    <div className='bg-white rounded-xl shadow p-6 overflow-x-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>Patient Records</h2>
        {successMsg && 
            <p className="text-green-500 bg-green-100 p-2 text-center rounded mb-4">{successMsg}</p>
        }
        <Link to="/patient/create" className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>+ Add Patient</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='min-w-full border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='text-left py-2 px-4 border'>S.N.</th>
              <th className='text-left py-2 px-4 border'>Name</th>
              <th className='text-left py-2 px-4 border'>Gender</th>
              <th className='text-left py-2 px-4 border'>Age</th>
              <th className='text-left py-2 px-4 border'>Address</th>
              <th className='text-left py-2 px-4 border'>Identity Type</th>
              <th className='text-left py-2 px-4 border'>Identity Number</th>
              <th className='text-center py-2 px-4 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (patients.map((patient, index) => (
              <tr key={patient.id} className='hover:bg-gray-50'>
                <td className='py-2 px-4 border'>{index + 1}</td>
                <td className='py-2 px-4 border'>{patient.name}</td>
                <td className='py-2 px-4 border'>{patient.gender}</td>
                <td className='py-2 px-4 border'>{patient.age}</td>
                <td className='py-2 px-4 border'>{patient.address}</td>
                <td className='py-2 px-4 border'>{patient.identity_type ? patient.identity_type : "N/A"}</td>
                <td className='py-2 px-4 border'>{patient.identity_number ? patient.identity_number : "N/A"}</td>
                <td className='py-2 px-4 border text-center space-x-2'>
                  <Link to={`/patient/${patient.id}`} className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600'>Edit</Link>
                  <button onClick={() => handleDelete(patient.id)} className='bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700'>Delete</button>
                </td>
              </tr>
            ))
            ) : (
                    <tr className='text-center'>
                        <td colSpan="5" className='py-4 text-gray-500'>No patients found.</td>
                    </tr>
                )
            }
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PatientsList;