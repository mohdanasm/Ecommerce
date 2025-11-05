import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title'
import Productitem from './Productitem'

const Relatedproducts = ({category,subCategory}) => {

    const {products} = useContext(Shopcontext)
    const[related,setrelated] = useState([])

    useEffect(()=>{
        if (products.length > 0) {
            let productscopy = products.slice()

            productscopy = productscopy.filter((item)=> category === item.category)
            productscopy = productscopy.filter((item)=> subCategory === item.subCategory)

            setrelated(productscopy.slice(0,5));
            
        }
    },[products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={"Related"} text2={"Products"}/>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item,index)=>(
            <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
        ))}
      </div>
    </div>
  )
}

export default Relatedproducts
