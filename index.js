import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import UserRoute from './Route/UserRoute.js'
import AdminAuthRoute from './Route/AdminRoute.js'
import UserAdminRoute from './Route/AdminUserRoute.js'


dotenv.config({ path: './.env' })
mongoose.connect(process.env.MON_URL, console.log('Database connection successfully'))
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan('common'))
app.use(cors())
app.get('/',(req,res)=>{
    res.status(200).json({success:true,message:"sever is running successfully"})
})


////  User API ///// 
app.use('/api',UserRoute)




/////////  Admin Api //////

app.use('/admin',AdminAuthRoute)
app.use('/admin',UserAdminRoute)




const port = process.env.PORT 
app.listen(port, () => {
    console.log('listening on port', process.env.PORT)
})



