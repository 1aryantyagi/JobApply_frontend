import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center">
                <h1 className="text-3xl font-bold text-indigo-700 mb-4">Welcome to Resume Analyzer</h1>
                <p className="text-gray-600 mb-6">Please log in to upload and analyze your resume.</p>
                <Link
                    to="/login"
                    className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
