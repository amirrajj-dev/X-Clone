import express from "express"
import { ENV } from "./utils/env.js"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { connectToDb } from "./utils/connectDb.js"

const app = express()
const port = ENV.PORT
app.use(helmet({
    contentSecurityPolicy: false
}))
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.get('/' , (req , res)=>{
    res.send("Hello World")
})

app.listen(port , async ()=>{
    await connectToDb()
    console.log(`Server is running on port ${port}`)
})