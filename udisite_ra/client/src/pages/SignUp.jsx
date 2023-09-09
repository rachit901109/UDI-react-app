import React, { useState } from 'react';
import NavBar1 from '../components/NavBar1';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    reEnterPassword: '',
    documents: [], // Store the uploaded documents here as an array
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      // Convert FileList to an array of file names
      const fileNames = Array.from(files).map(file => file.name);
      setFormData({
        ...formData,
        [name]: fileNames,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare data for submission in JSON format
    const jsonData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      reEnterPassword: formData.reEnterPassword,
      documents: formData.documents,
    };
  
    // Make a POST request to your Flask backend with JSON data
    axios.post('/api/signup', jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // Handle successful response (e.g., redirect, show success message)
        console.log('Response from server:', response.data);
      })
      .catch((error) => {
        // Handle error (e.g., display error message)
        console.error('Error:', error);
      });
  };
  

  return (
    <>
      <NavBar1 />
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-5xl text-white font-bold">
                Welcome. Create Your Own Unique Identity
              </h1>
            </div>

            <div className="max-w-sm mx-auto bg-zinc-800/60 p-8 rounded-xl shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      htmlFor="username"
                      className="block text-gray-300 text-sm font-medium mb-1"
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-input w-full text-gray h-10 border border-black-300 rounded-lg"
                      placeholder="username"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      htmlFor="email"
                      className="block text-gray-300 text-sm font-medium mb-1"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input w-full text-gray h-10 border border-black-300 rounded-lg"
                      placeholder="you@yourcompany.com"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      htmlFor="password"
                      className="block text-gray-300 text-sm font-medium mb-1"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input w-full text-gray h-10 border border-black-300 rounded-lg"
                      placeholder="password"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      htmlFor="reEnterPassword"
                      className="block text-gray-300 text-sm font-medium mb-1"
                    >
                      Re-enter Password:
                    </label>
                    <input
                      type="password"
                      id="reEnterPassword"
                      name="reEnterPassword"
                      value={formData.reEnterPassword}
                      onChange={handleChange}
                      className="form-input w-full text-gray h-10 border border-black-300 rounded-lg"
                      placeholder="re-enter password"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      htmlFor="document"
                      className="block text-gray-300 text-sm font-medium mb-1"
                    >
                      Upload Document(s):
                    </label>
                    <input
                      type="file"
                      id="document"
                      name="documents"
                      accept=".pdf, .doc, .docx, .jpg, .png" // Add acceptable file types
                      onChange={handleChange}
                      className="form-input w-full text-gray h-12 border border-black-300 rounded-lg bg-white text-purple-600 focus:ring-purple-400 focus:border-purple-400"
                      multiple // Allow multiple files to be selected
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3 p-3">
                    <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full h-10 rounded-lg">
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-4">
                Already registered?{' '}
                <Link
                  to="/signin"
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
