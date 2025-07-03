import {Router} from "express"
import { getPost, getPosts, getUserPosts , createPost, likeUnlikePost, deletePost } from "../controllers/post.controller.js";
import {protectRoute}  from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js";

const router = Router()

router.get('/' , getPosts)
router.get('/:postId' , getPost)
router.get("/user/:username" , getUserPosts)
router.post("/" , protectRoute , upload.single("image") , createPost)
router.post("/:postId/like" , protectRoute , likeUnlikePost)
router.delete("/:postId" , protectRoute , deletePost)

export default router;