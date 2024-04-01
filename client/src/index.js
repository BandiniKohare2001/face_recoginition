import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import Home from './views/Home/Home';
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';
import CriminalForm from './views/CriminalForm/CriminalForm';
import FaceDetection from './views/FaceDetection/FaceDetection';
import MissingPerson from './views/MissingPerson/MissingPerson';
import CriminalData from './views/CriminalData/CriminalData';
import MissingPersonData from './views/MissingPersonData/MissingPersonData';
import Button from './views/Button/Button';
import DetectPerson from './views/DetectPerson/DetectPerson';





const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/login',
    element: <Login/>
  },

  {
    path: '/criminalForm',
    element: <CriminalForm/>
  },
  {
    path: '/criminalData',
    element: <CriminalData/>
  },

  {
    path: '/missingPerson',
    element: <MissingPerson/>
  },
  {
    path: '/missingPersonData',
    element: <MissingPersonData/>
  },
  {
    path: '/button',
    element: <Button/>
  },

  {
    path: '/faceDetection',
    element: <FaceDetection/>
  },
  {
    path: '/detectperson',
    element:<DetectPerson />
  }
])
root.render(<RouterProvider router={router} />);


