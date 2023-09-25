import mongoose from 'mongoose'

const serviceSchema= new mongoose.Schema({
    serviceName:{
    type:String,
    required:true,
    trim:true,
    unique:true
    },
    image:{
    type:String,
    required:true,
        },
},{timestamps:true})



export default mongoose.model('Service',serviceSchema)