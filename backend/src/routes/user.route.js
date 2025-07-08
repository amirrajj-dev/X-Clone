import {Router} from "express"
import { followUnfollowUser, getCurrentUser, getUserProfile, syncUser, updateUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/profile/:username' , getUserProfile)
router.put('/profile' , protectRoute , updateUserProfile)
router.post('/sync' , protectRoute , syncUser)
router.get('/me' , protectRoute , getCurrentUser)
router.post('/follow/:userId' , protectRoute , followUnfollowUser)

export default router;