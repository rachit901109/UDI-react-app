import React from 'react';
import { Link } from 'react-router-dom';
import NavBar1 from '../components/NavBar1';

function SignIn() {
  return (
    <>
      <NavBar1 />
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="text-5xl text-white font-bold">
                Welcome back. We exist to make entrepreneurship easier.
              </h1>
            </div>

            {/* Form */}
            <div className="max-w-sm mx-auto bg-zinc-800/60 p-8 rounded-xl shadow-md">
              <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full text-black py-2 px-3 rounded-lg"
                      placeholder="you@yourcompany.com"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full text-black py-2 px-3 rounded-lg"
                      placeholder="Password (at least 10 characters)"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                        />
                        <span className="text-gray-400 ml-2">
                          Keep me signed in
                        </span>
                      </label>
                      {/* <Link
                        href="/reset-password"
                        className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                      >
                        Forgot Password?
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3 p-3">
                    <button
                      className="btn text-white bg-purple-600 hover:bg-purple-700 w-full py-2 px-4 rounded-lg"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
