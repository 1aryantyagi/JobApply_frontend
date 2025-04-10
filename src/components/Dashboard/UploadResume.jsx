import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UploadResume() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/upload', formData);
            navigate('/results', { state: { data: response.data.links } });
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload Resume</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="file" accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Upload'}
                </button>
            </form>
        </div>
    );
}