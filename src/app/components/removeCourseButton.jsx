import { useState } from "react";
import toast from "react-hot-toast";

export default function RemoveCourseButton(props) {
    
    const courseName = props.courseName;
    const [isAvailable, setIsAvailable] = useState(props.availability);

    async function toggleAvailability(){{

        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/admin/courses/${courseName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability: !isAvailable })
        })
        if(!res.ok){
            toast.error("Error updating course. Please try again.");
            return
        }
        setIsAvailable(!isAvailable);
        toast.success("Course updated successfully!");
    }}

    return (
    <>
        {isAvailable ? <button className="border px-2 py-1 bg-red-600 rounded-md hover:bg-red-500 cursor-pointer" onClick={toggleAvailability}>
            Remove
        </button> : <button className="border px-2 py-1 bg-green-600 rounded-md hover:bg-green-500 cursor-pointer" onClick={toggleAvailability}>
            Restore
        </button>}
    </>

  )
}

