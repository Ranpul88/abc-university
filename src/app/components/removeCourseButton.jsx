import { useState } from "react";
import toast from "react-hot-toast";

export default function RemoveCourseButton(props) {
    
    const courseName = props.courseName;
    const [isAvailable, setIsAvailable] = useState(props.availability);

    async function toggleAvailability(){{
        setIsAvailable(!isAvailable);
        
        try{
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/admin/courses/${courseName}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ availability: isAvailable })
            })

            if(!res.ok) {
                toast.error("Error updating course availability. Please try again.");
                return;
            }
            toast.success("Course availability updated successfully!");

        }catch(error){
            console.log("Error updating course availability");
            console.log(error);
            toast.error("Error updating course availability. Please try again.");
        }
    }}

    return (
    <>
        {isAvailable ? <button className="border px-2 py-1 bg-green-600 rounded-md hover:bg-green-500 cursor-pointer" onClick={toggleAvailability}>
            Restore
        </button> : <button className="border px-2 py-1 bg-red-600 rounded-md hover:bg-red-500 cursor-pointer" onClick={toggleAvailability}>
            Remove
        </button>}
    </>

  )
}

