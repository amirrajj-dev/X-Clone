import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "post",
        required : true
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "user"
        }
    ]
} , {timestamps : true})

export const commentsModel = mongoose.models.comment || mongoose.model('comment' , schema)