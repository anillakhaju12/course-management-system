"use client"
import { useAppDispatch } from "@/src/lib/store/customHooks";
import { createInstitute } from "@/src/lib/store/institute/instituteSlice";
import { IInstituteData } from "@/src/lib/store/institute/instituteSliceType";
import React, { ChangeEvent, useState } from "react";


type OptionType = "vat" | "pan" | "";

export default function CreateInstitute(){

  const dispatch = useAppDispatch()
  const [data, setData] = useState<IInstituteData>({
    instituteName : "",
    instituteEmail : "",
    instituteAddress : "",
    institutePhoneNumber : "",
    institutePanNumber : "",
    instituteVatNumber : ""
  })

  console.log(data)
  const [type, setType] = useState<OptionType>("");
  const [instituteNumber, setInstituteNumber] = useState("");

  const getName = () => {
    if (type === "vat") return "instituteVatNumber";
    if (type === "pan") return "institutePanNumber";
    return "";
  };

  const getLabel = () => {
    if (type === "vat") return "Enter VAT Number";
    if (type === "pan") return "Enter PAN Number";
    return "";
  };
  

  const handleInstituteInputData = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target

    setData({
      ...data,
      [name] : value,
  
    })

  }
  const handleSubmissionData = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    dispatch(createInstitute(data))
    
  }

  return(
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full flex items-center justify-center">
        <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">Create Institute</h2>
          <form onSubmit={handleSubmissionData}>            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Institute Name</label>
              <input
                type="text"
                name="instituteName"
                onChange={handleInstituteInputData}
                placeholder="Enter Institute Name"
                className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                name="instituteEmail"
                onChange={handleInstituteInputData}
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="institutePhoneNumber"
                onChange={handleInstituteInputData}
                placeholder="Enter Your Number"
                className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Address
              </label>
              <input
                type="text"
                name="instituteAddress"
                onChange={handleInstituteInputData}
                placeholder="Enter Your Address"
                className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Select Type:</label>

              <select
                value={type}
                onChange={(e) => {
                  const selected = e.target.value as OptionType;
                  setType(selected);

                  // Clear both first
                  setData({
                    ...data,
                    institutePanNumber: "",
                    instituteVatNumber: "",
                  });
                }}
                className="block w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">-- Select --</option>
                <option value="vat">Institute VAT Number</option>
                <option value="pan">Institute PAN Number</option>
              </select>

              {type && (
                <div className="mt-2">
                  <input
                    type="text"
                    name={getName()}
                    placeholder={getLabel()}
                    value={
                      type === "vat"
                        ? data.instituteVatNumber
                        : data.institutePanNumber
                    }
                    onChange={handleInstituteInputData}
                    className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              )}
            </div>

            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}