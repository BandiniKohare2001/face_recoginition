import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import showToast from 'crunchy-toast';
import emailjs from 'emailjs-com';
import Navbar from '../../component/Navbar/Navbar';
// import emailjs from '@emailjs/browser';

function FaceDetection() {
  const [data, setData] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
 

  const loadData = async () => {
    try {
      const response = await axios.get('/missingPersons');
      setData(response?.data?.data);
    } catch (error) {
      console.error('Error fetching missing records:', error);
    }
  };

  // const sendMail = async (matchedCriminalName) => {
  //   try {
  //     const templateParams = {
  //       to_email: 'bandinikohare16@gmail.com', // Replace with recipient's email address
  //       subject: 'Matched Criminal Detected',
  //       message: `Matched with criminal: ${matchedCriminalName}`
  //     };
  //     await emailjs.send('service_bn7agej', 'template_1a1brv2', templateParams, 'XLUhC0oBDnLv47Zz1');
  //     showToast('Email sent successfully', 'success', 3000);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     showToast('Failed to send email', 'error', 3000);
  //   }
  // };

  const sendMail = async (matchedmissingPersons) => {
    try {
      const templateParams = {
        to_email: 'bandinikohare16@gmail.com', // Replace with recipient's email address
        subject: 'Matched Criminal Detected',
        message: `
        image: ${matchedmissingPersons.image}
        Matched with matchedmissingPersons: ${matchedmissingPersons.name}
        Details:
        Age: ${matchedmissingPersons.age}
        Gender: ${matchedmissingPersons.gender}
        Address: ${matchedmissingPersons.address}
        State: ${matchedmissingPersons.state}
        `
      };
      await emailjs.send('service_bn7agej', 'template_ers3469', templateParams, 'XLUhC0oBDnLv47Zz1');
      showToast('Email sent successfully', 'success', 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      showToast('Failed to send email', 'error', 3000);
    }
  };
  

  useEffect(() => {
    loadData();
  }, []); // Fetch criminal records once when the component mounts

  useEffect(() => {
    const loadModelsAndStartWebcam = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        startWebcam();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    const startWebcam = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    };

    const recognizeFaces = async () => {
      const labeledDescriptors = await getLabeledFaceDescriptors();
    
      if (labeledDescriptors.length === 0) {
        console.error('No labeled face descriptors found.');
        return;
      }
    
      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    
      let matchFound = false; // Initialize a boolean variable to track if a match has been found
    
      videoRef.current.addEventListener('play', async () => {
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        canvasRef.current.append(canvas);
    
        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvas, displaySize);
    
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoRef.current)
            .withFaceLandmarks()
            .withFaceDescriptors();
    
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
    
          resizedDetections.forEach(detection => {
            if (!matchFound) { // Check if matchFound is false before executing the if condition
              const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
              const box = detection.detection.box;
              const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
              drawBox.draw(canvas);
    
              if (bestMatch.label !== 'unknown') {
                const matchedmissingPersons = data.find(criminal => criminal.name === bestMatch.label);
                if (matchedmissingPersons) {
                  showToast(`Matched with missing Persons: ${matchedmissingPersons.name}`, 'success', 3000);
                  alert(`Matched with missing Persons: ${matchedmissingPersons.name} You want to send criminal record`);
                  sendMail(matchedmissingPersons); // Pass the entire matchedCriminal object
                  matchFound = true; // Set matchFound to true after the match is found
                }
                
              }
            }
          });
        }, 100); 
      });
    };
    

    const getLabeledFaceDescriptors = async () => {
      const labeledDescriptors = [];

      for (const criminal of data) {
        const descriptions = [];
        try {
          const img = await faceapi.fetchImage(criminal.image);
          const detection = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detection.descriptor);
        } catch (error) {
          console.error('Error fetching image or detecting face:', error);
        }

        if (descriptions.length > 0) {
          labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(criminal.name, descriptions));
        }
      }

      return labeledDescriptors;
    };

    loadModelsAndStartWebcam();
    recognizeFaces();
  }, [data]); // Fetch criminal records whenever data changes

  return (
    <>
    <div> <div>
       <Navbar />
     </div>
       <div className="container">
         <video ref={videoRef} id="video" width="600" className="current-image" height="550" autoPlay></video>
         <div className="canvas" ref={canvasRef}></div>
       </div></div>
     </>
  );
}

export default FaceDetection;

