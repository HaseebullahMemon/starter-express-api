import express from 'express'
import {DeleteAdmin,GetAllAdmin,LoginAdmin,RegisterAdmin}from '../Controller/AdminAuthController.js'
import isAuthAdmin from '../MiddleWare/AdminAuth.js'
const route=express.Router()

route.post('/login',LoginAdmin)
route.post('/register',RegisterAdmin)
route.get('/getAllAdmin',isAuthAdmin,GetAllAdmin)
route.delete('/deleteAdmin/:id',isAuthAdmin,DeleteAdmin)

export default route