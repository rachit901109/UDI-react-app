// ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <section className="bg-purple-800 opacity-100 py-2 w-full mt-auto">
      <div className="container mx-auto px-4 mb-2 text-center">
        <h2 className="text-3xl font-semibold text-white mb-2">
          Contact Us
        </h2>
        <p className="text-gray-200 mb-4">
          Have questions? Feel free to get in touch with us.
        </p>
        <a
          href="udicontact@gmail.com"
          className="inline-block bg-white hover:bg-purple-600 text-purple-800 font-semibold py-3 px-6 rounded-lg text-sm"
        >
          Email Us
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
