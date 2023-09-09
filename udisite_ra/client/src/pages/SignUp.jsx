import React, { useState } from 'react';
import NavBar1 from '../components/NavBar1';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, such as sending data to a server.
    // You can access the user's input in formData.
    console.log('Form submitted with data:', formData);
  };

  return (
<>
    <NavBar1 />
    <section className="relative">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="text-5xl text-white font-bold">Welcome. Create Your Own Unique Identity</h1>
      </div>

    <div className="max-w-sm mx-auto bg-zinc-800/60 p-8 rounded-xl shadow-md">
   
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-1" >Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input w-full text-gray h-5 border border-black-300" placeholder="username" required 
           
          />
        </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4" >
        <div className="w-full px-3">
          <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input w-full text-gray h-5  border border-black-300" placeholder="you@yourcompany.com" required 
          />
        </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1" >Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input w-full text-gray h-5  border border-black-300" placeholder="password" required 
          />
        </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3 p-3">
                <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
              </div>
            </div>

      </form>
      <div className="text-gray-400 text-center mt-4">
           Already registered? <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
          </div>
    </div>
    </div>

</div>

</section>

    </>
  );
}

export default SignUp;
