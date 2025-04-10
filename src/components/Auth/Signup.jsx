import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth(); // Ensure this method exists in your AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add API call to your backend signup endpoint
        signup({ name, email }); // Mock signup
        navigate('/upload');
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" required
                    value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" required
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
