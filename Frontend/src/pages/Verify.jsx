import React from 'react'
import { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setcartitems, backendurl } = useContext(Shopcontext)
    const [searchparams, setsearchparams] = useSearchParams()

    const success = searchparams.get('success')
    const orderId = searchparams.get('orderId')

    const verifypayment = async () => {

        try {

            if (!token) {
                return null
            }

            const res = await axios.post(backendurl + '/api/order/verifystripe', { success, orderId }, { headers: { token } })

            if (res.data.success) {
                setcartitems({})
                navigate('/orders')
            }
            else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    useEffect(() => {
        verifypayment()
    }, [token])

    return (
        <div>

        </div>
    )
}

export default Verify
