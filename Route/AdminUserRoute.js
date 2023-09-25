import express from 'express'
import {getAllUser}  from '../Controller/UserAdminController.js'
import isAuthAdmin from '../MiddleWare/AdminAuth.js'
const route=express.Router()

route.get('/getAllUser',isAuthAdmin,getAllUser)


export default route