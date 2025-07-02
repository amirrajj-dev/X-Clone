import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user",
        required : true
    },
    to : {
         type : mongoose.Schema.Types.ObjectId ,
        ref : "user",
        required : true
    },
    type : {
        type : String ,
        required : true ,
        enum : ["follow" , "like" , "comment"]
    },
    post : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "post",
        required : false,
        default : null
    },
    comment : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "comment",
        required : false,
        default : null
    }
} , {timestamps : true})

export const notificationsModel = mongoose.models.notification || mongoose.model('notification' , schema)