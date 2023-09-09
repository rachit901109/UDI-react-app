import React from 'react';
import NavBar1 from '../components/NavBar1';
import AboutUDI from '../components/AboutUDI'; // Import the AboutUDI component
import ContactUs from '../components/ContactUs'; // Import the ContactUs component
import backgroundImage from '../images/background.jpeg';

export const LandingPage = () => {
  return (
    <>
      <NavBar1 />
      <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2, // Adjust the opacity here (0.0 - 1.0)
          }}
        ></div>

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        
        {/* Use the AboutUDI component here */}
        <AboutUDI />
        
        {/* Rest of your content */}

        {/* Use the ContactUs component here */}
        <ContactUs />
        
      </div>
    </>
  );
};
