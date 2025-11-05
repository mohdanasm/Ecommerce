import orderModel from "../models/ordermodel.js"
import userModel from "../models/usermodel.js"
import Stripe from 'stripe'
import razorpay from 'razorpay'

//global variable
const currency = 'inr'
const delivercharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razor = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//placing orders using COD

const placeorder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        const orderdata = {
            userId,
            items,
            address,
            amount,
            paymentmethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const order = new orderModel(orderdata)
        await order.save()

        await userModel.findByIdAndUpdate(userId, { cartdata: {} })

        res.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//placing orders using Stripe

const placeorderstripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderdata = {
            userId,
            items,
            address,
            amount,
            paymentmethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const order = new orderModel(orderdata)
        await order.save()

        const line_items = items.map((item, index) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: delivercharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const verifystripe = async (req, res) => {

    const { orderId, success, userId } = req.body

    try {

        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartdata: {} })
            res.json({ success: true })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


//placing orders using Razor

const placeorderrazor = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body


        const orderdata = {
            userId,
            items,
            address,
            amount,
            paymentmethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const order = new orderModel(orderdata)
        await order.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: order._id.toString()
        }

        await razor.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error })
            }

            res.json({ success: true, order })
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const verifyrazor = async (req, res) => {
    try {

        const { userId, razorpay_order_id } = req.body

        const orderinfo = await razor.orders.fetch(razorpay_order_id)
        if (orderinfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderinfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartdata: {} })
            res.json({ success: true, message: 'Payment Successful' })
        } else {
            res.json({ success: false, message: 'Payment Failed' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//All orders for admin panel

const allorders = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//User orders for user

const userorder = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Update order status from admin panel

const updatestatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export { verifyrazor, verifystripe, placeorder, placeorderstripe, placeorderrazor, allorders, userorder, updatestatus }