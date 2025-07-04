import { notificationsModel } from "../models/notification.model.js";
import {usersModel} from "../models/user.model.js"
import asyncHandler from "express-async-handler";
import {getAuth} from "@clerk/express"

export const getNotifications = asyncHandler(async (req , res)=>{
    const {userId} = getAuth(req)
    const user = await usersModel.findOne({
        clerkId: userId
    })
    if (!user){
        return res.status(404).json({message: "User not found" , success : false})
    }
    const notifications = await notificationsModel.find({to :user._id}).sort({createdAt:-1})
    .populate('from' , "firstName lastName username profilePicture")
    .populate('post' , 'image content')
    .populate('comment' , 'content')
    return res.status(200).json({
        success : true ,
        notifications,
        message : "Notifications fetched successfully"
    })
})

export const deleteNotification = asyncHandler(async (req , res)=>{
    const {notifId} = req.params
    const {userId} = getAuth(req)
    const user = await usersModel.findOne({
        clerkId: userId
    })
    if (!notifId){
        return res.status(404).json({message : "Notification not found" , success : false})
    }
    if (!user){
        return res.status(404).json({message: "User not found" , success : false})
    }
    const notification = await notificationsModel.findOne({
        _id : notifId,
        to : user._id
    })
    if (!notification){
        return res.status(404).json({message : "Notification not found" , success : false})
    }
    await notificationsModel.findByIdAndDelete(notifId)
    return res.status(200).json({
        success : true ,
        message : "Notification deleted successfully"
    })
})