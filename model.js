import mongoose from 'mongoose';


const form = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    email: {type: String, required: true},
    password: { type: String, required: true},
    feedback: {type: String, }
}, {timestamps: true});


const appForm = mongoose.model('appForm', form);
export default appForm;