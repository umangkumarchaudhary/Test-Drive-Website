import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Update import
import { useAuth } from '../../hooks/useAuth';
import './Login.css'; // Import the CSS file



const Login = () => {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(username)) {
            navigate('/booking'); // Redirect to booking page on successful login
        } else {
            alert('Invalid username');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
