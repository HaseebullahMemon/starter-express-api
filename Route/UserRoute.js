import express  from 'express'  
import {Login,Register,VerifyOTP,ResendOTP,ForgetPassword,ChangePassword, getProfile} from '../Controller/UserController.js'
import Auth  from '../MiddleWare/Auth.js'
const route =express.Router()
route.post('/register',Register)
route.post('/verifyOTP',VerifyOTP)
route.post('/resendOTP',ResendOTP)
route.post('/forgetPassword',ForgetPassword)
route.post('/changePassword',Auth,ChangePassword)
route.get('/profile',Auth,getProfile)
route.post('/login',Login)

export default route