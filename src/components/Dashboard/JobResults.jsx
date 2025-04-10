import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function JobResults() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const results = state?.data || [];

    const [showCredForm, setShowCredForm] = useState(false);
    const [currentLink, setCurrentLink] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApplyClick = (link) => {
        setCurrentLink(link);
        setShowCredForm(true);
    };


    const applyToJob = async (link, credentials = null) => {
        try {
            navigate('/status', { state: { status: 'Applying...', link } });

            const payload = credentials
                ? { link, username: credentials.username, password: credentials.password }
                : { link };

            const res = await axios.post('http://localhost:5000/apply', payload);

            navigate('/status', {
                state: {
                    status: res.data.message || 'Application Submitted!',
                    link
                }
            });
        } catch (err) {
            navigate('/status', {
                state: {
                    status: err.response?.data?.error || 'Application Failed!',
                    link
                }
            });
        }
    };

    const handleSubmitCredentials = (e) => {
        e.preventDefault();
        applyToJob(currentLink, { username, password });
        setShowCredForm(false);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="container">
            <h2 className="text-center">Recommended Job Roles</h2>

            <div className="results-container">
                {results.map((role, index) => (
                    <div key={index} className="role-card">
                        <h3>{role.role}</h3>

                        <div>
                            <h4>LinkedIn Jobs:</h4>
                            {role.linkedin_links.map((link, i) => (
                                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                                    <button onClick={() => handleApplyClick(link)}>Apply</button>
                                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h4>Workday Jobs:</h4>
                            {role.workday_links.map((link, i) => (
                                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                                    <button onClick={() => handleApplyClick(link)}>Apply</button>
                                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {showCredForm && (
                <div className="modal">
                    <form onSubmit={handleSubmitCredentials} className="cred-form">
                        <h3>Enter Workday Credentials</h3>
                        <input
                            type="text"
                            placeholder="Workday Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Workday Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setShowCredForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}
