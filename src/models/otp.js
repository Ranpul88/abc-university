import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    OTP: {
        type: String,
        required: true
    }
})

const Otp = mongoose.models.Otp || mongoose.model('Otp', otpSchema)

export default Otp