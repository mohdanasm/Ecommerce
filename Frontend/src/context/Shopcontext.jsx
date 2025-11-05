import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Shopcontext = createContext();

const Shopcontextprovider = (props) => {

    const currency = '₹';
    const deliveryfee = 10;
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [search, setsearch] = useState('')
    const [showsearch, setshowsearch] = useState(false)
    const [cartitems, setcartitems] = useState({})
    const [products,setproducts] = useState([])
    const [token,settoken] = useState("")
    const navigate = useNavigate()


    const addtocart =async (itemId, size) => {
        let cartdata = structuredClone(cartitems)


        if (!size) {
            toast.error('Select Product Size')
            return
        }
        if (cartdata[itemId]) {
            if (cartdata[itemId][size]) {
                cartdata[itemId][size] += 1
            }
            else {
                cartdata[itemId][size] = 1
            }
        }
        else {
            cartdata[itemId] = {}
            cartdata[itemId][size] = 1
        }
        setcartitems(cartdata)

        if (token) {
            try {

                await axios.post(backendurl+'/api/cart/add',{itemId,size},{headers:{token}})
                
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
    }

    const getcartcount = () =>{
        let totalcount = 0;
        for(const items in cartitems){
            for(const item in cartitems[items]){
                try {
                    if (cartitems[items][item] > 0) {
                        totalcount+=cartitems[items][item];
                    }
                    
                } catch (error) {
                    
                }
            }
        }
        return totalcount;
    }

    const updatequantity = async (itemId,size,quantity) =>{
        let cartdata = structuredClone(cartitems)

        cartdata[itemId][size] = quantity;

        setcartitems(cartdata)

        if (token) {
            try {

                await axios.post(backendurl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
                
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
    
    }

    const getcartamount =  () =>{
        let totalamount = 0;
        for(const items in cartitems){
            let iteminfo = products.find((product)=> product._id === items)
            for(const item in cartitems[items]){
                try {
                    if (cartitems[items][item] > 0) {
                        totalamount+=iteminfo.price * cartitems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalamount;
    }


    const getproductsdata = async ()=>{
        try {

            const response =  await axios.get(backendurl+'/api/product/list')
            if (response.data.success) {
                
                setproducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    const getusercart = async (token) =>{
        try {

            const response = await axios.post(backendurl +'/api/cart/get',{},{headers:{token}})
            if(response.data.success) {
                setcartitems(response.data.cartdata)
            }

        } catch (error) {
             console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getproductsdata()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            settoken(localStorage.getItem('token'))
            getusercart(localStorage.getItem('token'))
        }
    },[])
    console.log("Backend URL:", backendurl);


    const value = {
        products, currency, deliveryfee,
        search, setsearch, showsearch, setshowsearch,
        cartitems,setcartitems, addtocart,getcartcount,updatequantity,getcartamount,
        navigate,token,settoken,backendurl
    }

    return (
        <Shopcontext.Provider value={value}>
            {props.children}
        </Shopcontext.Provider>

    )
}

export default Shopcontextprovider;