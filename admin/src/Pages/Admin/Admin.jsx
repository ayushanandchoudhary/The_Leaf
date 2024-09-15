import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes , Route } from 'react-router-dom'
import AddProduct from '../../Components/Organisation/Organisation'
import ListProduct from '../../Components/List Product/ListProduct'
const Admin = ({isSlidebarOpen, isTilted, setIsHeading}) => {
  return (
    <div className='admin'>
      <Sidebar isTilted={isTilted} isSlidebarOpen={isSlidebarOpen} setIsHeading={setIsHeading}/>
      <Routes>
        <Route path='/admin/dashboard/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}

export default Admin
