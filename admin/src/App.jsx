import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import Navbar from './Components/Navbar/Navbar'; 
import Admin from './Pages/Admin/Admin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [message, setMessage] = useState('');
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);
  const [isTilted, setIsTilted] = useState(false);
  const [isHeading, setIsHeading] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const toggleTilt = () => {
    setIsSlidebarOpen(!isSlidebarOpen);
    setIsTilted(!isTilted);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      

      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log('Decoded Token:', decoded); 
          setUsername(decoded.username); 
          setRole(decoded.role);    
        } catch (error) {
          console.error('Token is invalid', error); 
          setMessage('Invalid token. Please login.');
          return; 
        }
      } else {
        setMessage('No token found. Please login.');
        return; 
      }

      try {
        const response = await fetch('http://localhost:4000/admin/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Fetching data failed:', error); // Log the error
        setMessage('Session expired. Please login.');
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="home">
      <Navbar isTilted={isTilted} toggleTilt={toggleTilt} isHeading={isHeading} username={username} role={role} message={message} />
      <Admin isTilted={isTilted} isSlidebarOpen={isSlidebarOpen} setIsHeading={setIsHeading} />
    </div>
  );
};

export default App;
