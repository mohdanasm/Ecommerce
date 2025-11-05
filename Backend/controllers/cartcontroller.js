import userModel from "../models/usermodel.js"

//add products to user cart
const addcart = async(req,res) => {

    try {
        
        const {userId, itemId, size} = req.body

        const userdata = await userModel.findById(userId)
        let cartdata = await userdata.cartdata

        if (cartdata[itemId]) {
            if (cartdata[itemId][size]) {
                cartdata[itemId][size] +=1
            }

            else{
                cartdata[itemId][size] =1
            }
            
        }
        else{
            cartdata[itemId]={}
            cartdata[itemId][size] =1
        }

        await userModel.findByIdAndUpdate(userId, {cartdata})

        res.json({success:true , message:'Added To Cart'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }

}

//update products in user cart
const updatecart = async(req,res) => {

    try {

        const {userId, itemId, size, quantity} = req.body

        const userdata = await userModel.findById(userId)
        let cartdata = await userdata.cartdata

        cartdata[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartdata})

        res.json({success:true , message:'Cart Updated'})


        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }

}

//get user cart data
const getusercart = async(req,res) => {

    try {
        
        const {userId} = req.body

        const userdata = await userModel.findById(userId)
        let cartdata = await userdata.cartdata

        res.json({success: true, cartdata})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }

}


export {addcart,updatecart,getusercart}