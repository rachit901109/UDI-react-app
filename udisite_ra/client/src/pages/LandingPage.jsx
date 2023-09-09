import React from 'react';
import bgimage from '../images/bgimage.jpg';
import NavBar1 from '../components/NavBar1';

export const LandingPage = () => {
  return (
<>    
<NavBar1/>
  <div className="bg-fixed">
      <div className="flex items-center justify-center h-screen w-screen">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: '100%',
          }}
        >
          &nbsp; {/* Your content goes here */}
        </div>
      </div>
    </div>
</>
  );
};
