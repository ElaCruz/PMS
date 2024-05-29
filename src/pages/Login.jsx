import FormInput from "../components/reuseableComponents/FormInput"
// import React, { useState } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from '../assets/logo.svg'
import image1 from '../assets/login_image1.svg'
import image2 from '../assets/login_image2.svg'
import image3 from '../assets/login_image3.svg'
import sms from '../assets/sms.svg'
import eye from '../assets/eye.svg'
import { useState,useEffect } from "react"
import { Carousel } from 'react-bootstrap';
import Dashboard from "./Dashboard";
// eslint-disable-next-line no-unused-vars

import { Form,Link, redirect } from "react-router-dom"
import SubmitBtn from "../components/reuseableComponents/SubmitBtn"




function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // my own test login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
     setIsSubmitting(false);

    }, 3000);


    //I'm Checkin if email and password match the predefined values
    if (email === 'example@gmail.com' && password === '1234') {
      // Login successful
      toast.success('Login successful!', {
        autoClose: 3000, 
      });
      setTimeout(() => {
        window.location.href = '/dashboard'; 
      }, 2000); 

    } else {
      // Login failed
      toast.error('Please double check your credentials!');
    }
  };



  


    const [images, setImages] = useState([]); // State to store the images
    const [activeIndex, setActiveIndex] = useState(0); // State to track the active slide index
  
    useEffect(() => {
      // Fetch or import your images and store them in the 'images' state array
      const importedImages = [
        image1,image2,image3
      ];
  
      setImages(importedImages);
    }, []);
  
    useEffect(() => {
      // Increment the active slide index every 3 seconds
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 10000);
  
      return () => {
        clearInterval(interval); // Clear the interval on component unmount
      };
    }, [images]);
  
  return <>

    {/* What shows on smaller screens */}

    <div className="d-flex d-lg-none d-block flex-column justify-content-center align-items-center">
       <img src={logo} alt="" className="img-fluid" />
       <p className="text-center fs-5 mt-4" style={{fontFamily:'Montserrat'}}>Sorry, you cannot view this application on this device. Please get a device with a larger screen size.</p>
    </div>

    {/* What shows on larger{laptop} screens */}

      <div className="d-none d-lg-block">
        <div style={{ float: 'left',top:0 ,margin:0 ,}}>
            <img src={logo} alt='Jaily' className="img-fluid" />

        </div>
        
        {/* Form */}
        <div style={{ float: 'left', marginTop: '130px' }}>
          {/* { !isLoggedIn ? ( */}
              <form onSubmit={handleSubmit}>
                <div className=" mt-1">
                  <img src={sms} alt="" className="iconEmail   " style={{position:'absolute', right:'990px',marginTop:'53px'}}  />
                    {/* <FormInput type='email' label='Email' name='email' value={email} onChange={handleEmailChange}  /> */}
                  <div className="login-prob d-flex flex-column">
                    <label htmlFor="email"  style={{fontFamily:'Montserrat', fontWeight:'550', color:'#5a5a5a'}} className="input-title mb-5">Email</label>
                    <input  required className="form-control  log-input" type="email" value={email} onChange={handleEmailChange} />
                  </div>   
                </div>

                  <div className=" mt-4 mb-1">
                    <img src={eye} alt="" className=" iconPass " style={{position:'absolute',  right:'990px',marginTop:'53px'}} onClick={togglePasswordVisibility}  />
                    {/* <FormInput type={showPassword ? 'text' : 'password'}  label='Password' name='password' value={password}   onChange={handlePasswordChange}  />      */}
                    <div className="login-prob d-flex flex-column">
                      <label htmlFor="password"  style={{fontFamily:'Montserrat', fontWeight:'550', color:'#5a5a5a'}} className="input-title mb-5">Password</label>
                      <input className="form-control log-input" required type={showPassword ? 'text' : 'password'}  label='Password' value={password} onChange={handlePasswordChange} />
                    </div>
                  </div>

                {/* Forgot Password  */}
                  <p className='mb-5 ' style={{marginRight:'-280px', fontFamily:'Montserrat', fontWeight:'500', color:'#5B5FC7'}}>Forgot Password</p>
                  
                  {/* <SubmitBtn  onClick={handleSubmit} text='Log In'  className="mt-5 " /> */}
                  <button type="submit"  className="fs-5" style={{fontFamily:'Montserrat', fontWeight:'550', backgroundColor:'#5B5FC7', color:'white', width:'430px', height:'70px', borderStartEndRadius:'45px'}}>
                     {isSubmitting ? 'Sending...' : 'Login'} 
                    </button>
              </form>
            {/* // ): <Dashboard isLoggedIn={isLoggedIn}/>}   */}
          <ToastContainer />
          {/* {isLoggedIn && <Dashboard />} */}
          
        </div>
        

        {/* Carousel */}
        <div style={{ float: 'right', width: '40%' , maxWidth:'580px', maxHeight:'77vh', marginTop:'-20px' }} >
          <Carousel activeIndex={activeIndex} controls={false} indicators={false}>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img src={image} alt={`Slide ${index}`} className="d-block w-100 " />
                </Carousel.Item>
              ))}
            </Carousel>
        </div>

      </div> 
  
  </>
}

export default Login