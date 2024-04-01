import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import Img from "./facial_recognition.jpg";
import Img02 from "./facial_recognition.02jpg.jpg";
import { FaDatabase } from "react-icons/fa";
 import { FaEdit } from "react-icons/fa";
import { FaFaceGrinWide} from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { BsRocketTakeoff } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./Home.css"
import Footer from "../../component/Footer/Footer";
// import { execFile } from "child_process";
import FaceDetection from "../FaceDetection/FaceDetection";
function Home() {
  return (
    <div>



      <div>
       <Navbar />
       </div>

      <div className="container mx-auto flex  items-center  min-[320px]:flex-col md:flex-row justify-evenly">
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-blue-600">Criminal Or Missing Person Face Recongnition !</span>
          </h1>
          <p className="text-gray-700 mb-4">
          Our mission to identify the criminals in any investigation department from images of the criminals in our database along with his details and those images are segmented into many slices say eyes, hairs, lips, nose, etc.
          </p>
        
            <Link to="/login" className="link">
              {" "}
              <button className="home-page-btn" >
                <div className="">
                  <span className="">Get Started</span>{" "}
                  <span>
                    <BsRocketTakeoff />
                  </span>
                </div>
              </button>{" "}
            </Link>
      
        </div>

        <div class="md:w-1/2 p-2">
          <img
            data-aos="fade-left"
            data-aos-offset="400"
            data-aos-easing="ease-in-sine"
            src={Img}
            alt="Right Side Image"
            className="img"
          />
        </div>
      </div>


      <section>
        <div className="container mt-5">
          <div class="container mx-auto flex  items-center  min-[320px]:flex-col md:flex-row justify-evenly">
          <div class="md:w-1/2 p-1 ">
          <img
            data-aos="fade-left"
            data-aos-offset="400"
            data-aos-easing="ease-in-sine"
            src={Img02}
            
            class="h-[300px] w-[600px] rounded-md block mx-auto img-2 "
          />
        </div>
            
            <div className="left w-50 ms-2 ">
              <div className="flex  justify-evenly  min-[320px]:flex-col md:flex-row sm:mt-4 gap-x-3 gap-y-3 items-center mb-3  ">
               
              
              </div> 

              
              <div className="home-page-container-1 px-1">
              <Link to="/detectperson" className="link">  
              <div className="card card-1 mr">
                  <FaFaceGrinWide className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4" />
                 <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                   Face Regognition
                  </p>
                </div></Link>
                
                <Link to="/missingPersonData" className="link"><div className="card card-1">
                  < FaClipboardList  className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4"/>
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                   Missing person Information
                  </p>
                </div></Link> 
              </div>

                <div className="home-page-container-1 px-1">
                <Link to="/criminalData" className="link"><div className="card card-1 mr">
                  < FaDatabase className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4"/>
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                   Get criminal data
                  </p>
                </div></Link>
                <Link to="/criminalData" className="link"><div className="card card-1">
                  < FaDatabase className="text-blue-500 border-2 p-[6px]  shadow-md border-slate-500 text-[45px] rounded block mx-auto absolute top-4 left-4"/>
                  <p className="absolute bottom-2 text-[19px ] font-bold left-16">
                    All Data of recongnition
                  </p>
                </div></Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;