import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function LeaveRequestForm({user }) {
    const [formData, setFormData] = useState({
        empId: "",
        empName: "",
        empPhone: "",
        managerName: "",
        fromDate: "",
        toDate: "",
        totalDays: "",
        reason: "",
        status:"Approved"
    });
    useEffect(() => {
        console.log(formData)
        if (user) {
            setFormData({
                empId:  user.empId,
                empName: user.empName,
                empPhone: user.empPhone || " ", 
                managerName: '',
                fromDate: '',
                toDate: '',
                totalDays: '',
                reason: '',
                status: 'pending'
            });
        }
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateTotalLeaveDays = () => {
        const from = new Date(formData.fromDate);
        const to = new Date(formData.toDate);
        if (to >= from) {
            const diffTime = Math.abs(to - from);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
            setFormData({ ...formData, totalLeaveDays: diffDays });
        }
        
        
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://localhost:7295/api/LeaveRequests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Data stored successfully');

            } else {
                const errorMessage = await response.text();
                throw new Error(`Error: ${response.status} - ${errorMessage}`);
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="bg-gray-300">
            <div className="max-w-md mx-auto">
                <div className="text-4xl font-bold"> Leave Request Application </div><br></br>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="empId" className="block font-medium text-gray-700">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            name="empId"
                            id="empId"
                            placeholder="Employee_Id"
                            value={formData.empId}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="empName" className="block font-medium text-gray-700">
                            Employee Name
                        </label>
                        <input
                            type="text"
                            name="empName"
                            id="empName"
                            placeholder="Employee_Name"
                            value={formData.empName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="empPhone" className="block font-medium text-gray-700">
                            Employee Phone
                        </label>
                        <input
                            type="text"
                            name="empPhone"
                            id="empPhone"
                            placeholder="Employee_Phone"
                            value={formData.empPhone}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="managerName" className="block font-medium text-gray-700">
                            Manager Name
                        </label>
                        <input
                            type="text"
                            name="managerName"
                            id="managerName"
                            placeholder="Manager_Name"
                            value={formData.managerName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fromDate" className="block font-medium text-gray-700">
                            From Date
                        </label>
                        <input
                            type="date"
                            name="fromDate"
                            id="fromDate"
                            value={formData.fromDate}
                            onChange={handleChange}
                            onBlur={calculateTotalLeaveDays}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        
                    </div>
                    <div>
                        <label htmlFor="toDate" className="block font-medium text-gray-700">
                            To Date
                        </label>
                        <input
                            type="date"
                            name="toDate"
                            id="toDate"
                            value={formData.toDate}
                            onChange={handleChange}
                            onBlur={calculateTotalLeaveDays}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        
                    </div>
                    
                    <div>
                        <label htmlFor="totalDays" className="block font-medium text-gray-700">
                            Total Leave Days
                        </label>
                        <input
                            type="number"
                            name="totalDays"
                            id="totalDays"
                            placeholder="Total Number of Leaves"
                            value={formData.totalLeaveDays}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="reason" className="block font-medium text-gray-700">
                            Reason for Leave
                        </label>
                        <textarea
                            name="reason"
                            id="reason"
                            placeholder="Reason for Leave"
                            value={formData.reason}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LeaveRequestForm;
