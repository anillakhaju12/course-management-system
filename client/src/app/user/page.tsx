import { useAppSelector } from "@/src/lib/store/customHooks"


export default function User() {

  const data = useAppSelector((store)=>{store.demoSlice})

  return (
    <div>
        <h1>This is just demo</h1>
    </div>
  )
}
