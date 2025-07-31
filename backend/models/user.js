import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     isGuest: {
//         type: Boolean,
//         default: false,  
//     },
//     verifyOtp:{
//         type:String,
//         default:""
//     },
//      verifyOtpExpiresAt:{
//         type:Number,
//         default:0
//     },
//      isAccountVerified:{
//         type:Boolean,
//         default:false
//     },
//     taskList:[
//         {
//             type:mongoose.Schema.ObjectId,
//             ref:"task"
//         }
//     ],
//     resetOtp:{
//         type:String,
//         default:""
//     },
//     resetOtpExpiresAt:{
//         type:Number,
//         default:0
//     }

// }, { timestamps: true });

// const userModel = mongoose.model('user',userSchema)
// export default userModel;



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: function () { return !this.isGuest }, // Email required only if it's not a guest
        unique: true,
        sparse: true, // This allows the field to be missing (null or undefined) for guest users
    },
    password: {
        type: String,
        required: function () { return !this.isGuest }, // Password required only if it's not a guest
    },
    verifyOtp: {
        type: String,
        default: "",
    },
    verifyOtpExpiresAt: {
        type: Number,
        default: 0,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    taskList: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "task",
        },
    ],
    resetOtp: {
        type: String,
        default: "",
    },
    resetOtpExpiresAt: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
export default userModel;
