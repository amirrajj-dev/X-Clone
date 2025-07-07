import express from "express"

//configs
import { ENV } from "./utils/env.js"
import { connectToDb } from "./utils/connectDb.js"

//middlewares
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import {clerkMiddleware} from  "@clerk/express"
import errorMiddleware from "./middlewares/error.middleware.js"
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js"

// routes
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import notificationRoutes from "./routes/notification.route.js"

const app = express()
const port = ENV.PORT
app.use(helmet({
    contentSecurityPolicy: false
}))
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(clerkMiddleware())
app.use(arcjetMiddleware)

app.use('/api/users' , userRoutes)
app.use('/api/posts' , postRoutes)
app.use('/api/comments' , commentRoutes)
app.use('/api/notifications' , notificationRoutes)

app.use(errorMiddleware)

const startServer = async () => {
  try {
    await connectToDb();
    // listen for local development
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));
    }
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer()

export default app;