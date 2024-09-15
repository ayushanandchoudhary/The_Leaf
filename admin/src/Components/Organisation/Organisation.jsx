import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridExample = () => {
  const [rowData, setRowData] = useState([]);
  const [paginationPageSize] = useState(10);

  useEffect(() => {
    fetch('http://localhost:4000/admin/orglist')
      .then((res) => res.json())
      .then((data) => setRowData(data));
  }, []);

  const columns = [
    { headerName: 'Organisation Name', field: 'Organisation_Name' },
    { headerName: 'Email', field: 'Email' },
    { headerName: 'Phone', field: 'Phone' },
  ];

  return (
    <div className="add-product">
    <div className="ag-theme-alpine" style={{ top:100, left:20, height: 500, width: 900 }}>
      <AgGridReact
        rowData={rowData} // Correct prop name for passing data to AgGrid
        columnDefs={columns}
        pagination={true}
        paginationPageSize={paginationPageSize}
      />
    </div>
    </div>
  );
};

export default GridExample;

// import React, { useState } from 'react'
// import './Organisation.css'
// import upload_area from '../../assets/upload_area.svg'
// <link
//   rel="stylesheet"
//   href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
// />

// const AddProduct = () => {
//   const[image, setImage] = useState(false);
//   const[productDetails, setProductDetails] = useState({
//     name:"",
//     image:"",
//     category:"women",
//     new_price:"",
//     old_price:""
//   })
//   const imageHandler = (e) => {
//     setImage(e.target.files[0]);
//   }
//   const changeHandler = (e) =>{
//     setProductDetails({...productDetails,[e.target.name]:e.target.value})
//   }
//   const Add_Product= async()=>{
//       console.log(productDetails);
//       let responseData;
//       let product = productDetails;
//       let formData= new FormData();
//       formData.append('product', image);

//       await fetch('http://localhost:4000/upload',{
//         method:'POST',
//         headers:{
//           Accept:'application/json',
//         },
//         body:formData,
//       }).then((resp)=> resp.json()).then((data)=>{responseData=data})

//       if(responseData.success){
//         product.image = responseData.image_url;
//         console.log(product);
//         await fetch('http://localhost:4000/addproduct',{
//           method:'POST',
//           headers:{
//             Accept:'application/json',
//             'Content-Type':'application/json',
//           },
//           body:JSON.stringify(product),
//         }).then((resp)=>resp.json()).then((data)=>{
//           data.success?alert("Product Added"):alert("Failed")
//         })
//       }
//   }
//   return (
//     // <div className="card" style={{ width: '18rem' }}>
//     //   <div className="card-body">
//     //     <h5 className="card-title">Card title</h5>
//     //     <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     //     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     //     <a href="#" className="card-link">Card link</a>
//     //     <a href="#" className="card-link">Another link</a>
//     //   </div>
//     // </div>
//     <div className='add_product'>
//       <div className="addproduct-itemfield">
//         <p>Product Title</p>
//         <input value={productDetails.name} onChange={changeHandler} type='text'  name='name' placeholder='Type Here'/>
//       </div>
//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//           <p>Price</p>
//           <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
//         </div>
//       </div>
//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>
//           <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
//         </div>
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Product Category</p>
//         <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
//           <option value='women'>Women</option>
//           <option value='men'>Men</option>
//           <option value='kids'>Kid</option>
//         </select>
//       </div>
//       <div className="addproduct-itemfield">
//         <label htmlFor="file-input">
//           <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img'alt="" />
//         </label>
//         <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
//       </div>
//       <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
//     </div>
//   )
// }

// export default AddProduct 
