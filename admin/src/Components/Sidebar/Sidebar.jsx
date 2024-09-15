import React, { useEffect } from 'react'
import './Sidebar.css'
import {Link, useLocation} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css';
const Sidebar = ({isSlidebarOpen, isTilted, setIsHeading}) => {
  const location=useLocation();
  const isActive=(path)=>{
    return location.pathname === path ;
  }
  return (
    <div className={`slidebar-container ${isSlidebarOpen ? 'open':''}`}>
      <div className={`sidebar-item ${isTilted ? 'open' : ''}`}>
        <ul>
          <li className='menu'onClick={()=> setIsHeading('Dashboard')}>
            <Link to={'/admin/dashboard/organisation'} className={isActive('/admin/dashboard/organisation')?'active':''}style={{textDecoration:"none"}}>
            <i className="ri-building-2-line"/>
            <span className='menu-text'>Add Organisation</span>
            </Link>
          </li>
          <li className='menu'onClick={()=> setIsHeading('About')}>
            <Link to={'/admin/dashboard/listproduct'} className={isActive('/admin/dashboard/listproduct')?'active':''} style={{textDecoration:"none"}}>
            <i className="ri-community-line"/>
            <span className='menu-text'>Organisation</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
