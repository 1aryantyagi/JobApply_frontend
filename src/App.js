import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UploadResume from './components/Dashboard/UploadResume';
import JobResults from './components/Dashboard/JobResults';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Status from './components/Dashboard/Status';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<PrivateRoute><UploadResume /> </PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><JobResults /></PrivateRoute>} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;