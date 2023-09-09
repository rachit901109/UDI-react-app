import React from 'react';
import NavBar1 from '../components/NavBar1';

export const LandingPage = () => {
  return (
    <>
      <NavBar1 />
      <div className="bg-fixed">
        <div className="flex items-center justify-center h-screen w-screen">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'none', // Remove the background image
            }}
          >
            &nbsp; {/* Your content goes here */}
          </div>
        </div>
      </div>
    </>
  );
};
