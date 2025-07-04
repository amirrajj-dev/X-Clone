import {Router} from "express"
import { deleteNotification, getNotifications } from "../controllers/notification.controller.js";
import {protectRoute} from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/' , protectRoute , getNotifications)
router.delete('/notifId' , deleteNotification)

export default router;