import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [employeename, setEmployeename] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8082/api/v1/employee/save', {
                employeename: employeename,
                email: email,
                password: password
            });

            setMessage(response.data); // Assuming response data contains the success message
        } catch (error) {
            console.error('There was an error registering!', error);
            setMessage('Registration failed: Server error');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Employee Name</label>
                    <input type="text" value={employeename} onChange={(e) => setEmployeename(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
