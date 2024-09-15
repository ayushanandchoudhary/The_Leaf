import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import Navbar from './Components/Navbar/Navbar'; 
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/Sidebar/Sidebar';
import {toast, ToastContainer} from 'react-toastify'
import { Outlet } from 'react-router-dom';
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
          try {
            const response = await fetch('http://localhost:4000/admin/dashboard', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              toast.success("Invalid Token")
              setTimeout(()=>{
                window.location.href='/admin';
              },2000)
              throw new Error('Network response was not ok'); 
            }
            const data = await response.json();
            setMessage(data.message);
          } catch (error) {
            console.error('Fetching data failed:', error); 
            setMessage('Session expired. Please login.');
          }
          const decoded = jwtDecode(token);
          console.log('Decoded Token:', decoded); 
          setUsername(decoded.username); 
          setRole(decoded.role);    
        } catch (error) {
          console.error('Token is invalid', error); 
          setMessage('Invalid token. Please login.');
          toast.error("Invalid Token")
          setTimeout(()=>{
            window.location.href='/admin/login';
          },2000) 
        }
      } else {
        setMessage('No token found. Please login.');
        toast.error("No token found. Please login.")
        setTimeout(()=>{
          window.location.href='/admin/login';
        },2000)
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
    <div className="layout">
      <Navbar isTilted={isTilted} toggleTilt={toggleTilt} isHeading={isHeading || 'Admin Panel'} username={username} role={role} message={message} />
      <Sidebar isTilted={isTilted} isSlidebarOpen={isSlidebarOpen} setIsHeading={setIsHeading} />
    </div>
    <div className="main-content">
        <Outlet/>
    </div>
    </div>
  );
};

export default App;
