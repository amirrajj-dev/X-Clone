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

// routes
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"

const app = express()
const port = ENV.PORT
app.use(helmet({
    contentSecurityPolicy: false
}))
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use(clerkMiddleware())

app.use('/api/users' , userRoutes)
app.use('/api/posts' , postRoutes)
app.use('/api/comments' , commentRoutes)

app.use(errorMiddleware)

app.listen(port , async ()=>{
    await connectToDb()
    console.log(`Server is running on port ${port}`)
})