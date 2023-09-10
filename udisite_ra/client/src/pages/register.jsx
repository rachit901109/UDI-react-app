import React, { useState } from 'react';
import NavBar1 from '../components/NavBar1';
import { Link } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [documents, setDocuments] = useState([]);

    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      if (type === 'file') {
        // Handle file input
        const selectedFiles = Array.from(files);
        setDocuments(selectedFiles);
      } else {
        // Handle other input fields
        if (name === 'username') {
          setUsername(value);
        } else if (name === 'email') {
          setEmail(value);
        } else if (name === 'password') {
          setPassword(value);
        } else if (name === 'reEnterPassword') {
          setReEnterPassword(value);
        }
      }
    };

    const handleRemoveFile = (index) => {
      const updatedFiles = [...documents];
      updatedFiles.splice(index, 1);
      setDocuments(updatedFiles);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = {
        username,
        email,
        password,
        reEnterPassword,
        documents,
      };

      try {
      // Make a POST request with FormData using fetch
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful response (e.g., redirect, show success message)
        console.log('Response from server:', data);
      } else {
        // Handle error (e.g., display error message)
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    };
    return (
        <>
          <NavBar1 />
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="text-5xl text-white font-bold">
                    Welcome! Create Your Own Unique Identity
                  </h1>
                </div>
    
                <div className="max-w-sm mx-auto bg-zinc-800/60 p-8 rounded-xl shadow-md">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3 mb-4">
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
                      <div className="w-full px-3 mb-4">
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
                      <div className="w-full px-3 mb-4">
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
                      <div className="w-full px-3 mb-4">
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
                    <div className="mt-4">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <span className="mr-2 text-white hover:text-grey">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" name="documents" accept=".pdf, .doc, .docx, .jpg, .png" onChange={handleChange} className="hidden" multiple />
                      </label>
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