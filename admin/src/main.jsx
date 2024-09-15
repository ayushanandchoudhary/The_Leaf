import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './Components/Login/Login.jsx'
import './index.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import 'remixicon/fonts/remixicon.css';
import AddProduct from './Components/Organisation/Organisation.jsx'
import Layout from './Layout.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate to="/admin"/>}/>
          <Route path='/admin' element={<Login/>}/>
          <Route path='/admin/dashboard' element={<Layout/>}>
            <Route path='Organisation' element={<AddProduct/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>    
  </React.StrictMode>,
)
