import { useLocation } from 'react-router-dom';

export default function Status() {
    const { state } = useLocation();
    const status = state?.status || 'Loading...';
    const link = state?.link;

    return (
        <div className="status-container">
            <h2>Status Update</h2>
            <p><strong>Job Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
            <p><strong>Message:</strong> {status}</p>
        </div>
    );
}
