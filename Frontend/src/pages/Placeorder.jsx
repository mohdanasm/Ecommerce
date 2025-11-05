import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { assets } from '../assets/assets'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Placeorder = () => {

  const { navigate, backendurl, token, cartitems, setcartitems, getcartamount, deliveryfee, products } = useContext(Shopcontext)
  const [method, setmethod] = useState('cod')

  const [formdata, setformdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  })

  const onchange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setformdata(data => ({ ...data, [name]: value }))
  }


  const init = async (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {

          const { data } = await axios.post(backendurl + '/api/order/verifyrazor', response, { headers: { token } })
          if (data.success) {
            navigate('/orders')
            setcartitems({})
          }

        } catch (error) {
          console.log(error);
          toast.error(error)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      let orderitems = []

      for (const items in cartitems) {
        for (const item in cartitems[items]) {
          if (cartitems[items][item] > 0) {
            const iteminfo = structuredClone(products.find(product => product._id === items))
            if (iteminfo) {
              iteminfo.size = item
              iteminfo.quantity = cartitems[items][item]
              orderitems.push(iteminfo)
            }
          }
        }
      }

      let orderdata = {
        address: formdata,
        items: orderitems,
        amount: getcartamount() + deliveryfee
      }

      switch (method) {

        //api calls for cod
        case 'cod':
          const res = await axios.post(backendurl + '/api/order/place', orderdata, { headers: { token } })
          if (res.data.success) {
            setcartitems({})
            navigate('/orders')
          } else {
            toast.error(res.data.message)
          }
          break;

        case 'stripe':

          const resstripe = await axios.post(backendurl + '/api/order/stripe', orderdata, { headers: { token } })
          if (resstripe.data.success) {
            const { session_url } = resstripe.data
            window.location.replace(session_url)
          }
          else {
            toast.error(resstripe.data.message)
          }

          break;

        case 'razorpay':

          const resrazorpay = await axios.post(backendurl + '/api/order/razor', orderdata, { headers: { token } })
          if (resrazorpay.data.success){            
            init(resrazorpay.data.order)
          }
          else {
            toast.error(resrazorpay.data.message)
          }

          break;

        default:
          break;
      }



    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/*Left side*/}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>

        <div className='flex gap-3'>
          <input onChange={onchange} name='firstname' value={formdata.firstname} required type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input onChange={onchange} name='lastname' value={formdata.lastname} required type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input onChange={onchange} name='email' value={formdata.email} required type="email" placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input onChange={onchange} name='street' value={formdata.street} required type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input onChange={onchange} name='city' value={formdata.city} required type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input onChange={onchange} name='state' value={formdata.state} required type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='flex gap-3'>
          <input onChange={onchange} name='pincode' value={formdata.pincode} required type="number" placeholder='Pincode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input onChange={onchange} name='country' value={formdata.country} required type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input onChange={onchange} name='phone' value={formdata.phone} required type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/*Right side */}

      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <Carttotal />
        </div>

        <div className='mt-12'>
          <Title text1={"Payment"} text2={"Method"} />

          {/*payment method */}
          <div className="flex gap-3 flex-col lg:flex-row">

            <div onClick={() => setmethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={() => setmethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>

            <div onClick={() => setmethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-700 text-sm font-medium mx-4'>Cash On Delivery</p>
            </div>

          </div>

          <div className='w-full text-end mt-8'>
            <button type="submit" className='cursor-pointer rounded-lg active:bg-gray-800 bg-black text-white px-16 py-3 text-sm'>Place Order</button>
          </div>

        </div>
      </div>

    </form>
  )
}

export default Placeorder
