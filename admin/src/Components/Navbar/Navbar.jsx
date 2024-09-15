import React, { useState, useRef, useEffect } from 'react';
import '../Navbar/Navbar.css';
import logo from '../../assets/leaf_login.jpg'
import profile from '../../assets/profile-pic.jpg';

const Navbar = ({isTilted, toggleTilt,  username, isHeading}) => {
  const [showOptionBox, setShowOptionBox] = useState(false);
  const optionBoxRef = useRef(null);
  const imageRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      optionBoxRef.current &&
      !optionBoxRef.current.contains(event.target) &&
      imageRef.current &&
      !imageRef.current.contains(event.target)
    ) {
      setShowOptionBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleImageClick = (event) => {
    if (optionBoxRef.current) {
      const rect = event.target.getBoundingClientRect();
      optionBoxRef.current.style.top = `${rect.bottom}px`;
      optionBoxRef.current.style.left = `${rect.left}px`;
    }
    setShowOptionBox(!showOptionBox);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have been logged out');
    window.location.href = '/';
  };
  return (
    <div className="navbar">
        <div className='nav-logo'>
          <img src={logo} alt="profile" className={`tilt-image ${isTilted ? 'tilted' : ''}`} onClick={toggleTilt}/>
        </div>
        <div className="nav-label">
          <h1>{isHeading}</h1>
        </div>
        <div className="nav-profile">
          <div className="nav-details">
          <h4>{username}</h4>  
          <span>Admin</span>
          </div>
          <div>
          <img src={profile} alt="Profile" ref={imageRef} onClick={handleImageClick} className="profile-pic"/>
          {showOptionBox && (
            <div ref={optionBoxRef} className="option-box">
              <ul>
                <li>Profile</li>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
          )}
          </div>
        </div>
    </div>
  );
};

export default Navbar;
