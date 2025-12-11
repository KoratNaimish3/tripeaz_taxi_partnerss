import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email:
    {
        type: String,
        unique: true
    },

    password: {
        type: String
    }

})

const Admin = mongoose.model("admin", AdminSchema)
export default Admin