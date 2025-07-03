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
    ],
    content: {
      type: String,
      required: true,
      maxLength: 280
    },
} , {timestamps : true})

export const commentsModel = mongoose.models.comment || mongoose.model('comment' , schema)