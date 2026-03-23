
import Dashboard from "@/src/lib/components/dashboard";
import React from "react";


export default function InstituteDashboardlayout({children}:Readonly<{children:React.ReactNode}>){
  return(
    <>
      <Dashboard>
        {children}
      </Dashboard>
    </>
  )
}