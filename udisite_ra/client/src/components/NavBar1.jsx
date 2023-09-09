import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NavBar1 = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleClose = () => {
    setNav(false);
  };

  return (
    <div className='flex justify-between items-center h-24 mx-0 px-6 text-purple-600 absolute inset-0 top-0 left-0 z-50 bg-black'>
      <h1>
        <Link to="/" className='text-5xl font-bold Trocchi left-2 m-4 '>
          UDI
        </Link>
      </h1>

      <ul className='hidden md:flex'>
        <li>
          <Link
            to="/signin"
            className='p-4 btn-sm text-white text-lg bg-purple-700 hover:bg-purple-500 py-3 px-5 ml-5 rounded'
          >
            Sign In
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className='p-4 btn-sm text-white text-lg bg-purple-700 hover:bg-purple-500 py-3 px-5 ml-5 rounded'
          >
            Sign Up
          </Link>
        </li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? (
          <AiOutlineClose onClose={handleClose} size={20} />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </div>
      <div
        onClose={handleClose}
        className={
          !nav
            ? 'block md:hidden fixed left-0 top-0 w-75% h-full border-r border-r-gray-900 bg-gray-900 ease-in-out duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <h1>
          <Link to="/" className='text-3xl font-bold left-0 m-5 uppercase'>
            UDI
          </Link>
        </h1>
        <ul className='pt-4'>
          <li>
            <button className="p-4 text-purple-600">
              <Link to="/signin" className='p-10 hover:text-gray-200'>
                Sign In
              </Link>
            </button>
          </li>
          <li>
            <button className="p-4 text-purple-600">
              <Link to="/signup" className='p-10 hover:text-gray-200'>
                Sign Up
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar1;
