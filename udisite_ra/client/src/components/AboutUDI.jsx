// AboutUDI.js
import React from 'react';

const AboutUDI = () => {
  return (
    <section className="bg-black-100 text-white py-12 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="px-4 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            UDI: Unique Digital Identity
          </h1>
          <p className="text-gray-200">
            The Unique Digital Identity (UDI) Verification System is a secure web application that provides users with unique IDs based on their Aadhar numbers. Users can securely store their documents on this platform, making it convenient and safe to access government services. Our system offers a simple API for government sites to verify user information using their UDI, reducing the need for extensive document sharing.

            With UDI, you can ensure your identity is protected while easily accessing essential government services. Join us in the digital age with UDI!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUDI;
