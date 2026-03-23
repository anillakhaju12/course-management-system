"use client"

import React, { ChangeEvent, useState } from "react";
import { IUserLoginData } from "./types";
import { useAppDispatch } from "@/src/lib/store/customHooks";
import { loginUser } from "@/src/lib/store/auth/authSlice";
// import { Status } from "@/src/lib/types/types";



function loginUserComponent() {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<IUserLoginData>({
    "email":"",
    "password":""
  })
 
  const handleUserInputData = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name, value } = e.target
    setData({
      ...data,
      [name] : value
    })
  }
    const handleSubmissionData = (e : React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      dispatch(loginUser(data))
      
      // if(Status.SUCCESS){}
    }
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full flex items-center justify-center">
        <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">Sign in</h2>
          <form onSubmit={handleSubmissionData}>            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleUserInputData}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleUserInputData}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
              Log in
            </button>
          </form>
          <button className="w-full mt-4 border text-teal-600 border-gray-300 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign-up with Google
          </button>
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?
            <a href="/signin" className="text-teal-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
 }

export default loginUserComponent
