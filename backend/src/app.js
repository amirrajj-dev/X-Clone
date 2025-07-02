import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

dotenv.config()

const app = express()

app.use(helmet({
    contentSecurityPolicy: false
}))
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.get('/' , (req , res)=>{
    res.send("Hello World")
})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})