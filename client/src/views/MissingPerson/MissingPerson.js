import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../component/Navbar/Navbar';
import showToast from "crunchy-toast";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const CriminalForm = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [data, setData] = useState([]);

  const missingPersonData = async () => {
    const response = await axios.post("/missingPerson", {
      name,
      dob,
      age,
      gender,
      address,
      state,
      image,
    });

    if (response?.data?.success) {
      showToast(response?.data?.message, "success", 4000);
    } else {
      showToast(response?.data?.message, "warning", 4000);
    }
    loadData();
    clearFields();
  };
  const loadData = async () => {
    try {
      const response = await axios.get('/missingPersons');
      setData(response.data.data);
    } catch (error) {
      console.error('Error loading data:', error);
      // Handle error, display a message to the user, or retry the request
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const del = async (_id) => {
    const response = await axios.delete(`missingperson/${_id}`);
    if (response?.data?.message) {
      showToast(response?.data?.message, "warning", 4000);
      loadData();
    }
  };

  const calculateAge = () => {
    if (dob) {
      const birthDateObj = new Date(dob);
      const currentDate = new Date();
      const timeDifference = currentDate - birthDateObj;
      const ageInYears = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
      setAge(ageInYears);
    } else {
      setAge('Please enter a valid birthdate');
    }
  };

  const clearFields = () => {
    setName("");
    setDob("");
    setAge("");
    setGender("");
    setImage("");
    setAddress("");
    setState("");
  };

  return (
    <>
      <Navbar />
      <h2 className='text-blue-700 text-center text-4xl my-6'>Missing Person Information Form</h2>
      <div className="form-container">
        <form>
          <div className='form-container-2'>
            <div className="form-section">
              <div className="form-group">
                <label className='font-semibold text-lg'> Name:</label>
                <input
                  type="text"
                  placeholder='Enter your name'
                  className='input-box'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className='font-semibold text-lg'>Date of Birth:</label>
                <input
                  type="date"
                  placeholder='Enter your birth date'
                  className='input-box'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className='font-semibold text-lg'>Age:</label>
                <input
                  type="number"
                  className='input-box'
                  placeholder='Enter your age'
                  value={age}
                  onClick={calculateAge}
                  readOnly
                />
              </div>
              <div className="gender-container">
                <label className='font-semibold text-lg mt-4'>Gender:</label>
                <input
                  type="radio"
                  id='male'
                  name='gender'
                  className='gender-input me-4 '
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                /> Male
                <input
                  type="radio"
                  id='female'
                  name='gender'
                  className='gender-input '
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                /> Female
              </div>
            </div>
            <div className="form-section">
              <div className="form-group">
                <label className='font-semibold text-lg'>Address:</label>
                <input
                  type="text"
                  className='input-box'
                  placeholder='Enter your Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className='font-semibold text-lg'>State:</label>
                <input
                  type="text"
                  className='input-box'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              {/* <div className="form-group">
                <label className='font-semibold text-lg'>Image URL:</label>
                <input
                  type="text"
                  className='input-box'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div> */}
              <div className="form-group">
    <label className='font-semibold text-lg'>Upload Image:</label>
    <input type="file" 
    className='input-box' 
    id="image"
    accept="image/*"
    onChange={(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
    }}/>
</div>
            </div>
          </div>
          <button
            type="button"
            onClick={missingPersonData} style={{backgroundColor: ' #4a90e2'}} 
            className="btn"
          >
            Submit
          </button>
        </form>
      </div>
      <button
        type='button' style={{backgroundColor: ' #4a90e2', width: '300px'}} 
        className="btn"
      >
        <Link to="/missingPersonData" className='text-white no-underline link' style={{marginLeft: '-0px'}}>
          Get Missing Person's Data →
        </Link>
      </button>

      <Link to="/detectperson" className="link abso">
        face Recognition
      </Link>
    </>
  );
};

export default CriminalForm;
