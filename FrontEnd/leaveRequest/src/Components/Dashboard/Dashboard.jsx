// Dashboard.jsx
import React, { useState } from 'react';
import LeaveRequestForm from '../LeaveRequestForm/LeaveRequestForm.jsx';
import ViewApplicationForm from '../ViewApplicationForm/ViewApplicatioForm.jsx';
import './index.css'
function Dashboard({ user, handleLogout }) {
    
    const [activeTab, setActiveTab] = useState('leaveApplication');

    return (
        <div className="container mx-auto py-0 ml-[200px] mr-[200px]">
            <div>
                <h1 className="text-6xl font-bold text-center bg-gray-400 h-[80px]">
                    Winwire Leave Application
                </h1>
            </div>
            <div className="flex">
                <div className="tabs-container flex flex-col space-y-3">
                    <h1 className="text-4xl font-bold">DashBoard</h1>
                    <button
                        className={`tab-button ${activeTab === 'leaveApplication' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leaveApplication')}
                    >
                        Leave Application
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'viewApplication' ? 'active' : ''}`}
                        onClick={() => setActiveTab('viewApplication')}
                    >
                        View Application
                    </button>
                    <button className="bg-red-500 text-xl" onClick={handleLogout}>Logout</button> {/* Logout button */}
                </div>
            </div>
            <div className="form-container">
                {activeTab === 'leaveApplication' && <LeaveRequestForm user={user} />}
                {activeTab === 'viewApplication' && <ViewApplicationForm />}
            </div>
        </div>
    );
}

export default Dashboard;
