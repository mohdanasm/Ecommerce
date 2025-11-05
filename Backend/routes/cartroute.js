import express from 'express'
import { addcart,updatecart,getusercart } from '../controllers/cartcontroller.js'
import authuser from '../middleware/auth.js'

const cartrouter = express.Router()

cartrouter.post('/add',authuser,addcart)
cartrouter.post('/update',authuser,updatecart)
cartrouter.post('/get',authuser,getusercart)

export default cartrouter