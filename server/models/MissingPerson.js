import { Schema, model } from "mongoose";

const missingPersonSchema = new Schema({

    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    dob: {
        type: String,

    },

   image: {
        type:String,
    },

    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
    }
}, {
    timestamps: true
});

const MissingPersonRecord = model("MissingPersonRecord", missingPersonSchema);

export default MissingPersonRecord;
