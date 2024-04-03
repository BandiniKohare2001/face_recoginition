import React from 'react'
import { MdDelete } from "react-icons/md";
import showToast from "crunchy-toast";

import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar/Navbar';

function CriminalData() {
    const [data, setData] = useState([]);

  
  const loadData = async () => {
    const response = await axios.get('/criminalRecords');

    setData(response?.data?.data)
  }

  useEffect(() => {
    loadData();
  }, []);

  const del = async (_id) => {
    const response = await axios.delete(
      `criminalRecord/${_id}`
    );
    if (response?.data?.message) {
      showToast(response?.data?.message, "warning", 4000);
      loadData();
    }
  };

  return (
    <div>
        <Navbar/>
     
        <h2 className='text-blue-700 text-center text-4xl my-2'>All Criminal Data</h2>
        <div className='data-container'>
        {
          data?.map((obj, index) => {
            const { 
              _id,
              criminalID,
              name,
              age,
              arrestedDate,
              crimeInvloved,
              gender,
              image,
              address,
              state } = obj;

            return (
              <div className='data-card space-y-2'>
                    <img src={image} className='mx-auto mb-2' style={{width:'330px', height:'260px'}} />     
                <p> <b>Name : </b> {name} </p>
                <p> <b>Criminal Id : </b>{criminalID}</p>
                <p> <b>gender : </b> {gender}</p>
                <p> <b>Age : </b> {age}</p>
                <p> <b>Address : </b> {address}</p>             
                <p> <b>State : </b> {state}</p>             
                <p> <b> crime Invloved : </b>{ crimeInvloved}</p>
                <p ><b> Arrested Date : </b> {arrestedDate}  </p>
                {/* Photo : <img src={photo} /> */}

                <MdDelete className="text-blue-500 text-[30px] ms-auto " onClick={() => del(_id) } />
                {/* <FaEdit className="text-blue-500 text-[30px] ms-auto " onClick={() => UpdateCriminalData(_id) } /> */}

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CriminalData;