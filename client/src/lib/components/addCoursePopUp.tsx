import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/customHooks";
import { fetchCatagory } from "../store/institute/catagory/instituteCatagorySlice";




export default function AddCousrsePopUp({closeCreateCousrseBox} : {closeCreateCousrseBox : ()=> void;} ){
  const dispatch = useAppDispatch()
  const {catagories} = useAppSelector(store => store.instituteCatagories)

  const level = [
    "Beginner",
    "Intermediate",
    "Advance"
  ]

  const handleSubmissionData = (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

  }

  const handleCourseInputData = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{

  }

  useEffect(()=>{
    if(catagories.length <=0){
      dispatch(fetchCatagory())
    }
  },[catagories]) 
  return(
          <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
        {/* overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
        ></div>
        {/* Modal */}
        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
          <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-white-800 relative rounded-xl mx-auto max-w-sm">
            <button
              onClick={closeCreateCousrseBox}
              type="button"
              className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            >
              <svg
                xlinkTitle="Close"
                className="h-4 w-4 hover:rotate-180 transition-all ease-in-out duration-500 cursor-pointer text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="space-y-2 p-2">
              <div className="p-2 space-y-2 text-center dark:text-teal-600">
                <h2
                  className="text-xl font-bold tracking-tight"
                  id="page-action.heading"
                >
                 Create Course
                </h2>
              </div>
            </div>
            <div className="space-y-2">
              <div
                aria-hidden="true"
                className="border-t border-gray-700 px-2"
              />
              <div className="grid grid-cols-1 place-items-center px-4 py-2">
                <form onSubmit={handleSubmissionData} className="space-y-4">
                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Name
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <input
                      name="courseName"
                      onChange={handleCourseInputData}
                      className="border p-3 shadow-md  border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                      type="text"
                      placeholder="React, NextJs, NodeJs"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Price
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <input
                      name="coursePrice"
                      onChange={handleCourseInputData}
                      className="border p-3 shadow-md  border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                      type="text"
                      placeholder="Rs.1999"
                      required
                    />
                  </div>     
                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Duration
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <input
                      name="courseDuration"
                      onChange={handleCourseInputData}
                      className="border p-3 shadow-md  border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                      type="text"
                      placeholder="1 month"
                      required
                    />
                  </div> 
                  <div className="flex">

                    <div>
                      <label className="mb-2 ml-0.5 text-gray-400 text-lg">
                        Level
                        <span className="text-red-600 inline-block p-1 text-sm">
                          *
                        </span>
                      </label>
                      <select name="courseLevel" className="border p-3 shadow-md  border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full">
                        {level && level.map(courseLevel =>
                            <option key={courseLevel} value={courseLevel}>{courseLevel}</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 text-gray-400 text-lg">
                        Category
                        <span className="text-red-600 inline-block p-1 text-sm">
                          *
                        </span>
                      </label>
                      <select name="catagoryId" className="border p-3 shadow-md  border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full">
                        {catagories.length > 0 && catagories.map(catagories =>
                            <option key={catagories.id} value={catagories.id}>{catagories.catagoryName}</option>
                        )}
                      </select>
                    </div>                                                     
                  </div>
                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Description
                      <span className="text-red-600 st inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <textarea
                      name="courseDescription"
                      onChange={handleCourseInputData}
                      className="border p-3  border-gray-700 shadow-md placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                      placeholder="This course contain..."
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div>
                    <label className="mb-2 text-gray-400 text-lg">
                      Thumbnail
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    <input
                      name="courseThumbnail"
                      onChange={handleCourseInputData}
                      className="border p-3 shadow-md  border-gray-700 placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                      type="file"
                      required
                    />
                  </div>   
              <div className="px-6 py-2">
                <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                  <button
                    onClick={closeCreateCousrseBox}
                    type="button"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-9 px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-red-600 dark:hover:bg-red-800 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-9 px-4 text-sm text-white shadow focus:ring-white border-transparent bg-teal-600 hover:bg-teal-800 focus:bg-[#11071F] focus:ring-offset-[#11071F]"
                  >
                    <span className="flex items-center gap-1">
                      Add
                    </span>
                  </button>
                </div>
              </div>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  )
}