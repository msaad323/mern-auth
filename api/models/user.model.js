import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn.vectorstock.com/i/500p/11/69/blank-avatar-profile-picture-vector-45161169.jpg",
    }
})

export default mongoose.model("User", userSchema);