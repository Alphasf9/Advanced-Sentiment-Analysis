import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const token = localStorage.getItem('token');

                await fetch('https://advanced-sentiment-analysis-1.onrender.com/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    credentials: 'include', 
                });

                localStorage.removeItem('token');

                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error);
                navigate('/login');
            }
        };

        logout();
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-700">Logging out...</h2>
        </div>
    );
}

export default UserLogout;
