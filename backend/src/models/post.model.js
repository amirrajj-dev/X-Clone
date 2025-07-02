import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    content : {
        type : String,
        required : true,
        trim : true,
        maxLength : 250
    },
    image : {
        type : String,
        required : false,
        trim : true,
        default : ""
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    ],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'comment'
        }
    ]
} , {timestamps : true})

export const postsModel = mongoose.models.post || mongoose.model('post' , schema)