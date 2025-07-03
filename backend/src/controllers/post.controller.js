import asyncHandler from "express-async-handler";
import { postsModel } from "../models/post.model.js";
import { usersModel } from "../models/user.model.js";
import { notificationsModel } from "../models/notification.model.js";
import { commentsModel } from "../models/comment.model.js";
import { getAuth } from "@clerk/express";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinaryActions.js";

export const getPosts = asyncHandler(async (req, res) => {
  const posts = await postsModel
    .find({})
    .sort({ createdAt: -1 })
    .populate("user", "username profilePicture firstName lastName")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username profilePicture firstName lastName",
      },
    });
  return res.status(200).json({
    success: true,
    message: "posts fetched succesfully",
    posts,
  });
});

export const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({
      success: false,
      message: "invalid post id",
    });
  }
  const post = await postsModel
    .findById(postId)
    .populate("user", "username profilePicture firstName lastName")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username profilePicture firstName lastName",
      },
    });
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "post not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "post fetched succesfully",
    post,
  });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "invalid username",
    });
  }
  const user = await usersModel.findOne({ username });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  const posts = await postsModel
    .find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "firstName lastName profilePicture username")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username profilePicture firstName lastName",
      },
    });
  return res.status(200).json({
    success: true,
    message: "posts fetched successfully",
    posts,
  });
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "unauthorized",
    });
  }
  const { content } = req.body;
  const image = req.file;
  if (!content.trim() && !image) {
    return res.status(400).json({
      success: false,
      message: "content or image is required",
    });
  }
  const user = await usersModel.findOne({
    clerkId: userId,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  let imageUrl = "";
  let imagePublicId = "";
  if (image) {
    const imageUpload = await uploadToCloudinary(image);
    imageUrl = imageUpload.secure_url;
    imagePublicId = imageUpload.public_id;
  }
  const post = await postsModel.create({
    content: content.trim() || "",
    user: user._id,
    image: imageUrl,
    imagePublicId,
  });
  return res.status(201).json({
    success: true,
    message: "post created successfully",
    post,
  });
});

export const likeUnlikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);
  const post = await postsModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "post not found",
    });
  }
  const user = await usersModel.findOne({
    clerkId: userId,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  const liked = post.likes.includes(user._id);
  if (liked) {
    await postsModel.findByIdAndUpdate(postId, {
      $pull: {
        likes: user._id,
      },
    });
  } else {
    await postsModel.findByIdAndUpdate(postId, {
      $push: {
        likes: user._id,
      },
    });
  }

  if (post.user.toString() !== user._id.toString()) {
    // create notification
    const notification = await notificationsModel.create({
      from: user._id,
      to: post.user,
      type: "like",
      post: postId,
    });
  }

  return res.status(200).json({
    success: true,
    message: liked ? "unliked post successfully" : "liked post successfully",
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  if (!postId) {
    return res.status(400).json({
      success: false,
      message: "post id is required",
    });
  }
  const user = await usersModel.findOne({
    clerkId: userId,
  });
  const post = await postsModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "post not found",
    });
  }
  if (post.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "you can't delete this post",
    });
  }
  if (post.image) {
    await deleteFromCloudinary(post.imagePublicId, "image");
  }
  await Promise.all([
    commentsModel.deleteMany({ post: postId }),
    postsModel.findByIdAndDelete(postId),
  ]);
  return res.status(200).json({
    success: true,
    message: "post deleted successfully",
  });
});
