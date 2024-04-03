import React from 'react'
import { MdDelete } from "react-icons/md";
import showToast from "crunchy-toast";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import { Link } from 'react-router-dom';


function MissingPersonData() {
    const [data, setData] = useState([]);
    console.log(data)
    const loadData = async () => {
      try {
        const response = await axios.get('/missingPersons');
        setData(response?.data?.data);
      } catch (error) {
        console.error('Error loading data:', error);
        showToast('Error loading data. Please try again later.', 'error', 4000); 
      }
    }
    
    
  
    useEffect(() => {
      loadData();
    }, []);

      

     

      
const del = async (_id) => {
  const response = await axios.delete(
    `missingperson/${_id}`
  );
  if (response?.data?.message) {
    showToast(response?.data?.message, "warning", 4000);
    loadData();
  }
};




  return (
    <>
    <Navbar/>
    <h2 className='text-blue-700 text-center text-4xl my-3'>All Missing Person's Data</h2>

    <div className='data-container'>
    
  {
   
    data?.map( (obj, index) =>{
      const { 
        name,
        image,
        _id,
        dob,
        age,
        gender,
        address,
        state} = obj;

      return  (
       
        <div className='data-card space-y-2'> 
          <img src={image} className='mx-auto mb-2' style={{width:'330px', height:'260px'}} />         
          <p> <b>Name : </b> {name} </p>
          <p> <b>Gender : </b> {gender}</p>
          <p> <b>DOB : </b> {dob}</p>
          <p> <b>Age : </b> {age}</p>  
          <p ><b> State : </b> {state}  </p>  
          <p> <b>Address : </b> {address}</p>  
          <MdDelete className="text-blue-500 text-[28px] ms-auto " onClick={() => del(_id) } /> 
          
          </div>
         


      )
    })
  }
</div>
</>
  )
}

export default MissingPersonData