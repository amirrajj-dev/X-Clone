import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    clerkId : {
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String , 
        required : true ,
        trim : true 
    },
    profilePicture : {
        type : String,
        required : false,
        trim : true,
        default : ''
    },
    bannerImg : {
        type : String,
        required : false,
        trim : true,
        default : ''
    },
    bio : {
        type : String,
        required : false,
        trim : true,
        default : '',
        maxLength : 200
    },
    location : {
        type : String,
        required : false,
        trim : true,
        default : ''
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ]
} , {timestamps : true})

export const usersModel = mongoose.models.user || mongoose.model('user' , schema)