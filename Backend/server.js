import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userrouter from './routes/userroutes.js'
import productrouter from './routes/productroute.js'
import cartrouter from './routes/cartroute.js'
import orderrouter from './routes/orderroute.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userrouter)
app.use('/api/product',productrouter)
app.use('/api/cart',cartrouter)
app.use('/api/order',orderrouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server Started on Port : '+ port)
)