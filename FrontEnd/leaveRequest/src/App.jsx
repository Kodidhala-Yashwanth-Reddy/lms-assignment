// App.jsx
import React, { useState } from 'react';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Login from './Components/Login/Login.jsx';

function App() {
    const [user, setUser] = useState(null);

    // Function to set user upon successful login
    const handleLogin = (userData) => {
        setUser(userData);
    };

    // Function to log out the user
    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="App">
            {user ? (
                <Dashboard user={user} handleLogout={handleLogout} />
            ) : (
                <Login setUser={handleLogin} />
            )}
        </div>
    );
}

export default App;
