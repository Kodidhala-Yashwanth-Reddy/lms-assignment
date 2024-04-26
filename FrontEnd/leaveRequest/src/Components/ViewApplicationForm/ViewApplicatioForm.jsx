import React, { useEffect, useState } from 'react';
import UpdateEmployeeForm from './handleUpdate';



function ViewApplicationForm() {
    const [employees, setEmployees] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const [showUpdateFormForEmpId, setShowUpdateFormForEmpId] = useState(null);


    useEffect(() => {
        const getData = async () => {
            const res = await fetch('https://localhost:7295/api/LeaveRequests')
            const data = await res.json()
            console.log(data)
            setEmployees(data)
        }
        getData()
        return;
    }, [])




    const handleDelete = async (empId) => {
        try {

            await fetch(`https://localhost:7295/api/LeaveRequests/${empId}`, {
                method: 'DELETE',
            });
            const updatedEmployees = employees.filter(employee => employee.empId !== empId);
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);

            alert(`Employee with ID ${empId} deleted successfully!`);
        } catch (error) {
            alert('Error deleting employee:', error);
        }
    };



    const handleUpdateButtonClick = (empId) => {
        setShowUpdateFormForEmpId(empId);7
    };

    const handleUpdate = (empId, updatedData) => {

        console.log(`Updating employee with ID ${empId}`);
        console.log('Updated data:', updatedData);
    };

    useEffect(() => {
        console.log("Employees:", employees);
        const filtered = employees.filter(employee =>
            employee.empName && employee.empName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filtered);
    }, [searchTerm, employees]);


    const calculateTotalDays = (fromDate, toDate) => {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const difference = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        return difference;
    };

    return (
        <div className="container mx-auto ml-[70px] py-4">
            <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-64 mb-4 px-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />


            <table className="w-2000px bg-white border border-gray-200 rounded-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Employee ID</th>
                        <th className="px-4 py-2">Employee Name</th>
                        <th className="px-4 py-2">Manager Name</th>
                        <th className="px-4 py-2">From Date</th>
                        <th className="px-4 py-2">To Date</th>
                        <th className="px-4 py-2">Total Leave Days</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee.empId}>
                            <td className="px-4 py-2">{employee.empId}</td>
                            <td className="px-4 py-2">{employee.empName}</td>
                            <td className="px-4 py-2">{employee.managerName}</td>
                            <td className="px-4 py-2">{employee.fromDate}</td>
                            <td className="px-4 py-2">{employee.toDate}</td>
                            <td className="px-4 py-2">{calculateTotalDays(employee.fromDate, employee.toDate)}</td>
                            <td className="px-4 py-2">{employee.status}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2"
                                    onClick={() => handleUpdateButtonClick(employee.empId)}
                                >
                                    Update
                                </button>
                                {showUpdateFormForEmpId === employee.empId && (
                                    <UpdateEmployeeForm
                                        empId={employee.empId}
                                        empName={employee.empName}
                                        managerName={employee.managerName}
                                        fromDate={employee.fromDate}
                                        toDate={employee.toDate}
                                        status={employee.status}
                                        onUpdate={handleUpdate}
                                        setShowUpdateFormForEmpId={setShowUpdateFormForEmpId }
                                    />
                                )}
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                                    onClick={() => handleDelete(employee.empId)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewApplicationForm;
