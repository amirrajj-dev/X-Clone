import mongoose from 'mongoose'

export const connectToDb = async ()=>{
    try {
        if (mongoose.connections[0].readyState){
            console.log('already connected to db ❄️🐧')
            return
        }
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log('connected to db successfully 🌟🐧')
        })
    } catch (error) {
        console.log('error connecting to db ❄️🐧 =>' , error)
        process.exit(1)
    }
}