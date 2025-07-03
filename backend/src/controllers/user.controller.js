import asyncHandler from 'express-async-handler'
import {usersModel} from '../models/user.model.js'
import { notificationsModel } from '../models/notification.model.js'
import {clerkClient, getAuth} from "@clerk/express"

export const getUserProfile = asyncHandler(async (req , res)=>{
    const {username} = req.body
    const user = await usersModel.findOne({username})
    if(!user){
        return res.status(404).json({message : 'User not found'})
    }
    return res.status(200).json({
        message : "user fetched succesfully",
        user,
        success : true
    })
})

export const updateUserProfile = asyncHandler(async (req , res)=>{
    const {userId} = getAuth(req)
    const user = await usersModel.findOneAndUpdate({
        clerkId : userId
    } , req.body , {new : true})
    if(!user){
        return res.status(404).json({message : 'User not found'})
    }
    return res.status(200).json({
        message : "user updated succesfully",
        user,
        success : true
    })
})

export const syncUser = asyncHandler(async (req , res)=>{
    const {userId} = getAuth(req)
    const user = await usersModel.findOne({
        clerkId : userId
    })
    if(!user){
        return res.status(404).json({message : 'User not found' , success : false})
    }
    const clerkUser = await clerkClient.users.getUser(userId)
    const userData = {
        username : clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        email : clerkUser.emailAddresses[0].emailAddress,
        firstName : clerkUser.firstName || "",
        lastName : clerkUser.lastName || "",
        clerkId : userId,
        profilePicture : clerkUser.imageUrl || ""
    }
    const newUser = await usersModel.create({
        ...userData
    })
    return res.status(201).json({
        message : "user synced succesfully",
        user : newUser,
        success : true
    })

})


export const getCurrentUser = asyncHandler(async (req , res)=>{
    const {userId} = getAuth(req)
    const user = await usersModel.findOne({
        clerkId : userId
    })
    if(!user){
        return res.status(404).json({message : 'User not found' , success : false})
    }
    return res.status(200).json({
        message : "user found succesfully",
        user,
        success : true
    })
})

export const followUnfollowUser = asyncHandler(async (req , res) =>{
    const {userId : currentUserId} = getAuth(req)
    const {userId : userToFollowId} = req.body()

    if (currentUserId === userToFollowId) {
        return res.status(400).json({ message: 'You cannot follow yourself :)', success: false})
    }

    const userToFollow = await usersModel.findById(userToFollowId)
    if(!userToFollow){
        return res.status(404).json({message : 'User not found' , success : false})
    }
    const userWhoWantsToFollow = await usersModel.findOne({
        clerkId : currentUserId
    })
    const isFollowing = userWhoWantsToFollow.following.includes(userToFollow._id) 
    
    if(isFollowing){
        // unfollow user
        await usersModel.updateOne({
            _id : currentUserId
        } , {
            $pull : {
                following : userToFollowId
            }
        })
        return res.status(200).json({
            message : "user unfollowed succesfully",
            success : true
        })
    }
    // follow user
    await usersModel.updateOne({
        _id : currentUserId
    } , {
        $push : {
            following : userToFollowId
        }
    })
    // create notification 
    await  notificationsModel.create({
        from : userWhoWantsToFollow._id,
        to : userToFollowId,
        type : 'follow'
    })
    return res.status(200).json({
        message : isFollowing ? "user unfollowed succesfully" :  "user followed succesfully",
        success : true
    })
})