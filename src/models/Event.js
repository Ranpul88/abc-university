import TimeTable from "@/app/admin/time-table/page";
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const Event = mongoose.model('event', eventSchema)

export default Event