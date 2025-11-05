import express, { Router } from'express'
import {verifyrazor,verifystripe,placeorder,placeorderstripe,placeorderrazor,allorders,userorder,updatestatus} from '../controllers/ordercontroller.js'
import adminauth from "../middleware/adminauth.js"
import authuser from '../middleware/auth.js'


const orderrouter = express.Router()

// admin features
orderrouter.post('/list',adminauth,allorders)
orderrouter.post('/status',adminauth,updatestatus)

//payment feauters
orderrouter.post('/place',authuser,placeorder)
orderrouter.post('/stripe',authuser,placeorderstripe)
orderrouter.post('/razor',authuser,placeorderrazor)

//user feauters
orderrouter.post('/myorders',authuser,userorder)

//verify payment
orderrouter.post('/verifystripe',authuser,verifystripe)
orderrouter.post('/verifyrazor',authuser,verifyrazor)

export default orderrouter
