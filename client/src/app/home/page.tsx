"use client"

import { useAppDispatch } from "@/src/lib/store/customHooks"
import { setAddress, setUserName } from "@/src/lib/store/userSlice"

function Home(){
  const dispatch = useAppDispatch()
  dispatch(setUserName("Anil Lakhaju"))
  dispatch(setAddress("Bhaktapur"))
  return(
    <>
      <h1>Hi, this is home page</h1>
    </>
  )
}

export default Home