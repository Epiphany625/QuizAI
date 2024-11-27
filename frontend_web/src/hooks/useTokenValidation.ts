import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useTokenValidation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            } else {
                try {
                    const response = await axios.post('http://localhost:3000/api/auth/verify-token', {}, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('User verified:', response.data);
                    localStorage.setItem('email', response.data.user.email);
                    console.log(localStorage.getItem('email'));
                } catch (error) {
                    console.error('Token verification failed:', error);
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        verifyToken();
    }, [navigate]);
};

export default useTokenValidation; 