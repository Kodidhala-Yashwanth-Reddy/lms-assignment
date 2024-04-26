import React, { useState } from 'react';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        empName: '',
        empPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7295/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                const errorMessage = await response.text();
                throw new Error(`Error: ${response.status} - ${errorMessage}`);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-6xl text-center mb-4 text-bold">Manager Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-l font-bold mb-2" htmlFor="empName">
                        Manager Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="empName"
                        type='text'
                        value={formData.empName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text- font-bold mb-2" htmlFor="empPassword">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="empPassword"
                        type='password'
                        value={formData.empPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type='submit'
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
