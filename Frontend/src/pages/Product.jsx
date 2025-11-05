import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Shopcontext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import Relatedproducts from '../components/Relatedproducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addtocart } = useContext(Shopcontext);
  
  const [productdata, setproductdata] = useState(false)
  const [image, setimage] = useState('')
  const [size, setsize] = useState('')

  const fetchproductdata = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setproductdata(item)
        setimage(item.image[0])

        return null;
      }
    })

  }

  useEffect(() => {
    fetchproductdata();
    window.scrollTo(0, 0);
    
  }, [productId,products])

  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productdata.image.map((item, index) => (
                <img onClick={() => setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/*product info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
          <div className='flex flex-col my-8 gap-4'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productdata.sizes.map((item, index) => (
                <button onClick={() => setsize(item)} key={index} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-500' : ''}`}> {item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addtocart(productdata._id, size)} className='bg-black text-white px-8 py-3 text-sm cursor-pointer active:bg-gray-700'>Add To Cart</button>
          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1' >
            <p>100% Original Product</p>
            <p>Cash On Delivery is available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/*Description & Review */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Accusamus impedit veritatis eos repudiandae
            saepe delectus excepturi velit quasi atque animi,
            consectetur, fugit nam ad assumenda!
          </p>
          
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing 
            elit. Earum explicabo, recusandae, libero enim autem 
            ipsam commodi impedit ut quasi asperiores nisi 
            deleniti distinctio id quod!
          </p>
        </div>
      </div>

      {/*display related products */}
      <Relatedproducts category={productdata.category} subCategory={productdata.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
