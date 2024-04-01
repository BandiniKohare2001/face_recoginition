import React, { useState, useEffect } from 'react';
import './CriminalForm.css';
import { MdDelete } from "react-icons/md";
import showToast from "crunchy-toast";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../../component/Navbar/Navbar';
// import Footer from '../../component/Footer/Footer';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const CriminalForm = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [arrestedDate, setArrestedDate] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [crimeInvloved, setCrimeInvloved] = useState("");
  const [criminalID, setCriminalID] = useState("");
  const [data, setData] = useState([]);
  const [result,setResult]=useState(null);
  const [isValid, setIsValid] = useState(true);


  
  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/criminal-record/get-all-criminal');
      setData(response?.data?.data);
    } catch (error) {
      console.error('Error loading criminal records:', error);
      showToast('Failed to load criminal records. Please try again later.', 'error', 4000);
    }
  }

  useEffect(() => {
    const getloggedInUser = JSON.parse(localStorage.getItem("user" || "{}"));

    if (!getloggedInUser) {
      swal({
        title: `👋 Hey Buddy ! `,
        text: "Please login first",
        icon: "warning",
      }).then(() => {
        window.location.href = "/login";
      });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  

  


  const saveCriminalData = async () => {
   

    const response = await axios.post("http://localhost:8080/criminal-record/insert", {
      criminalID,
      address,
      name,
      state,
      image,
      crimeInvloved,
      dob,
      arrestedDate,
      age,
      gender

    }
    );

    if (response?.data?.success) {
      // alert(response?.data?.message)
      showToast(response?.data?.message, "success", 4000);
      // window.location.href = "/login";
    } else {
      showToast(response?.data?.message, "warning", 4000);
    }

    loadData();

    setName("");
    setCrimeInvloved("");
    setCriminalID("")
    setDob("");
    setAge("");
    setGender("");
    setImage("");
    setAddress("");
    setState("")
  };


  const del = async (_id) => {
    const response = await axios.delete(
      `criminalRecord/${_id}`
    );
    if (response?.data?.message) {
      showToast(response?.data?.message, "warning", 4000);
      loadData();
    }
  };


  
  // const UpdateCriminalData = async (_id) => {
  //   // if (!amount) {
  //   //   showToast("amount is required", "alert", 4000);
  //   //   return;
  //   // }
  //   // if (!transactionType) {
  //   //   showToast("Transaction Type is required", "alert", 4000);
  //   //   return;
  //   // }

  //   const updateDetails = {
  //     criminalID,
  //     address,
  //     Name,
  //     state,
  //     photo,
  //     crimeInvloved,
  //     dob,
  //     arrestedDate,
  //     age,
  //     gender
  //   };

  //   const response = await axios.put(
  //     `criminalRecord/${_id}`,
  //     updateDetails
  //   );
  //   if (response?.data?.message) {
  //     showToast(response?.data?.message, "warning", 4000);
  //     loadData();
  //   }
  // };
  const calculateAge = () => {
    if (dob) {
      const birthDateObj = new Date(dob);
      const currentDate = new Date();
      const timeDifference = currentDate - birthDateObj;

      // Calculate age in years
      const ageInYears = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
      setAge(ageInYears);
    } else {
      setAge('Please enter a valid birthdate');
    }
  };

  const handleArrestedDateChange = (event) => {
    const newArrestedDate = event.target.value;
    setArrestedDate(newArrestedDate);

    // Check if arrested date is valid after setting arrested date
    setIsValid(checkValidity(dob, newArrestedDate));
  };
  const checkValidity = (dob, arrestedDate) => {
    // Implement your logic for checking validity
    // For example, compare the dates and return true if arrested date is after birthdate
    return new Date(dob) < new Date(arrestedDate);
  };





  return (
    <>
      <Navbar />


      <h2 className='text-blue-700 text-center text-4xl my-6'>Criminal Information Form</h2>
      <div className="form-container">


        <form role='form' encType='multipart/form-data'>
          <div className='form-container-2'>
            <div className="form-section">

              <div className="form-group">
                <label className='font-semibold text-lg'>Criminal ID:</label>
                <input type="number"
                  className='input-box'
                  placeholder='Enter your criminal id'    
                  id="criminalId" 
                  value={criminalID} 
                  onChange={(e) => {
                    setCriminalID(e.target.value)
                  }} />
              </div>  
                             
              <div className="form-group">
                <label className='font-semibold text-lg'> Name:</label>
                <input type="text"
                  placeholder='Enter your  name'
                  id="name"
                  className='input-box'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              {/* <div className="form-group">
            <label className='font-semibold text-lg'>Alias Name:</label>
            <input type="text"
            placeholder= 'Enter your alias'
            id="aliasName" 
            className='input-box'
            value={aliasName} 
            onChange={(e) => {
              setAliasName(e.target.value);
            }}
            />
          </div> */}

              <div className="form-group">
                <label className='font-semibold text-lg'>Date of Birth:</label>
                <input type="date"
                  placeholder='Enter your birth date'
                  id="dob"
                  className='input-box'
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    
                  }}
                />
              </div>

              <div className="form-group">
                <label className='font-semibold text-lg'>Age:</label>
                <input type="number"
                  className='input-box'
                  placeholder='Enter your age'
                  id="age"
                  value={age}
                 
                  // onChange={(e) => {
                  //   setAge(e.target.value)
                   
                  // }}  
                  onClick={calculateAge} readOnly/>
              </div>


              <div className="gender-container">
                <label className='font-semibold text-lg mt-4'>Gender:</label>
                Male <input
                  type="radio"
                  id='male'
                  name='gender'
                  className='gender-input me-5'
                  checked={gender === "male"}
                  onChange={() => {
                    setGender("male");
                  }}
                />

                Female  <input
                  type="radio"
                  id='female'
                  name='gender'
                  className='gender-input'
                  checked={gender === "female"}
                  onChange={() => {
                    setGender("female");
                  }}
                />

              </div>

            </div>
            <div className="form-section">


              <div className="form-group">
                <label className='font-semibold text-lg'>Address:</label>
                <input type="text"
                  className='input-box'
                  placeholder='Enter your Address'
                  id="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }} />
              </div>


              <div className="form-group">
                <label className='font-semibold text-lg'>State:</label>
                <input type="text"
                  className='input-box'
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value)
                  }} />
              </div>

              <div className="form-group">
                <label className='font-semibold text-lg'>Arrested Date:</label>
                <input type="date" name="arrestedDate" className='input-box'
                  value={arrestedDate}
                  onChange={handleArrestedDateChange}
                  style={{ borderColor: isValid ? 'initial' : 'red' }}
                />
                 {!isValid && <p style={{ color: 'red' }}>Please Enter Valid Date</p>}
              </div>

              <div className="form-group">
                <label className='font-semibold text-lg'>Crime Involved In:</label>
                <input type="text" name="crimeInvolved" className='input-box'
                  value={crimeInvloved}
                  onChange={(e) => {
                    setCrimeInvloved(e.target.value);
                  }}
                />
              </div>

              {/* <div className="form-group">
            <label className='font-semibold text-lg'>Image Path:</label>
            <input type="text" name="imagePath" className='input-box'/>
          </div> */}

<div className="form-group">
            <label className='font-semibold text-lg'>Image URL:</label>
            <input type="text" 
            className='input-box' 
            id="image"
            value={image}
            onChange={(e) => {
              setImage(e.target.value)
            }}/>
          </div>
            </div>

          </div>
          {/* <button type="button" onClick={saveCriminalData} className="bg-slate-950 hover:bg-blue-800 text-white font-bold mt-5 py-2 px-5 block mx-auto rounded-lg btn" >Submit</button> */}
          <button type="button" onClick={saveCriminalData} className="btn" style={{backgroundColor: ' #4a90e2'}} >Submit</button>
        </form>
      </div>
      
      <Link to="/criminalData"  className='text-white no-underline link' style={{marginLeft: '-0px'}}>
      <button type='button' style={{backgroundColor: ' #4a90e2', width: '300px'}}   className="btn">  Get Criminal Data →</button></Link>
     

      {/* <Footer /> */}
    </>
  );
};

export default CriminalForm;

