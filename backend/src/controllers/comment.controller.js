import asyncHandler from "express-async-handler";
import { commentsModel } from "../models/comment.model.js";
import { postsModel } from "../models/post.model.js";
import { notificationsModel } from "../models/notification.model.js";
import { usersModel } from "../models/user.model.js";
import { getAuth } from "@clerk/express";

export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    return res
      .status(400)
      .json({ message: "Post id is required", success: false });
  }
  const comments = await commentsModel
    .find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username profilePic firstName lastName");
  return res
    .status(200)
    .json({ comments, success: true, message: "comments fetched succesfully" });
});

export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
  if (!postId) {
    return res
      .status(400)
      .json({ message: "Post id is required", success: false });
  }
  const post = await postsModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found", success: false });
  }
  const user = await usersModel.findOne({
    clerkId: userId,
  });
  const { content } = req.body;
  if (!content || !content.trim().length) {
    return res
      .status(400)
      .json({ message: "Comment content is required", success: false });
  }
  const comment = await commentsModel.create({
    content,
    post: postId,
    user: user._id,
  });
  if (post.user.toString() !== user._id.toString()) {
    await notificationsModel.create({
      type: "comment",
      from: user._id,
      to: post.user,
    });
  }
  await postsModel.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $push: {
        comments: comment._id,
      },
    }
  );
  return res
    .status(201)
    .json({ message: "Comment created succesfully", success: true, comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res
      .status(400)
      .json({ message: "Comment id is required", success: false });
  }
  const comment = await commentsModel.findById(commentId);
  if (!comment) {
    return res
      .status(404)
      .json({ message: "Comment not found", success: false });
  }
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
  const user = await usersModel.findOne({
    clerkId: userId,
  });
  if (comment.user.toString() !== user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this comment" });
  }
  await commentsModel.findByIdAndDelete(commentId);
  await postsModel.findOneAndUpdate(
    {
      _id: comment.post,
    },
    {
      $pull: {
        comments: commentId,
      },
    }
  );
  return res
    .status(200)
    .json({ message: "Comment deleted succesfully", success: true });
});

export const likeUnlikeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res
      .status(400)
      .json({ message: "Comment id is required", success: false });
  }
  const comment = await commentsModel.findById(commentId);
  if (!comment) {
    return res
      .status(404)
      .json({ message: "Comment not found", success: false });
  }
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({
      message: "unauthroized",
      success: false,
    });
  }
  const user = await usersModel.findOne({
    clerkId: userId,
  });
  const hadAlreadyLiked = comment.likes.includes(user._id);
  if (hadAlreadyLiked) {
    await commentsModel.findByIdAndUpdate(commentId, {
      $pull: {
        likes: user._id,
      },
    });
  } else {
    await commentsModel.findByIdAndUpdate(commentId, {
      $push: {
        likes: user._id,
      },
    });
    if (!hadAlreadyLiked && comment.user.toString() !== user._id.toString()) {
      await notificationsModel.create({
        from: user._id,
        to: comment.user,
        type: "like",
      });
    }
  }
  return res.status(200).json({
    message: hadAlreadyLiked
      ? "Comment unliked successfully"
      : "Comment liked successfully",
    success: true,
  });
});
