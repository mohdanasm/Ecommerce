import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Productitem from '../components/Productitem'

const Collection = () => {
  const {products,search,showsearch} = useContext(Shopcontext)
  const [showfilter,setshowfilter]= useState(false)
  const [filterprod,setfilterprod]=useState([])
  const [category,setcategory]=useState([])
  const [subcategory,setsubcategory] = useState([])
  const [sorttype,setsorttype] = useState('relevant')

  const togglecat = (e)=>{
    if(category.includes(e.target.value)){
      setcategory(p=> p.filter((item) => item !== e.target.value))
      
      
    }

    else{
      setcategory(p=> [...p,e.target.value])
    }
  }

  const togglesubcat = (e)=>{
    if(subcategory.includes(e.target.value)){
      setsubcategory(p=> p.filter((item) => item !== e.target.value))
    }

    else{
      setsubcategory(p=> [...p,e.target.value])
    }
  }


  const applyfilter = ()=> {
    let productscopy = products.slice()

    if(showsearch && search)
    {
      productscopy = productscopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productscopy=productscopy.filter((item)=>category.includes(item.category))
    }


    if (subcategory.length > 0) {
      productscopy=productscopy.filter((item)=>subcategory.includes(item.subcategory))
    }

    setfilterprod(productscopy)
  }


  const sortprod = () =>{

    let fpcopy = filterprod.slice()

    switch(sorttype){
      case "low-high":
        setfilterprod(fpcopy.sort((a,b)=>(a.price - b.price)))
        break;

      case "high-low":
        setfilterprod(fpcopy.sort((a,b)=>(b.price - a.price)))
        break;

      default:
        applyfilter()
        break;
    }
  }


useEffect(()=>{
    applyfilter()
    window.scrollTo(0, 0);
    
  },[category,subcategory,search,showsearch,products])

useEffect(()=>{
    sortprod()
    window.scrollTo(0, 0);
  },[sorttype,products])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-4'>
      
    {/*Filter options*/}
    <div className='min-w-60'>
      <p onClick={()=>(setshowfilter(!showfilter))} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
        <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
      </p>


      {/*gender filter*/}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter? ' ' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>Categories</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3 cursor-pointer' type="checkbox" value={'Men'} onChange={togglecat}/>Men
          </p>

          <p className='flex gap-2'>
            <input className='w-3 cursor-pointer' type="checkbox" value={'Women'} onChange={togglecat}/>Women
          </p>

          <p className='flex gap-2'>
            <input className='w-3 cursor-pointer' type="checkbox" value={'Kids'} onChange={togglecat}/>Kids
          </p>
        </div>
      </div>



      {/* topbottom filter */}
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter? ' ' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>Type</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className='w-3 cursor-pointer' type="checkbox" value={'Topwear'} onChange={togglesubcat} />Topwear
          </p>

          <p className='flex gap-2'>
            <input className='w-3 cursor-pointer' type="checkbox" value={'Bottomwear'} onChange={togglesubcat}/>Bottomwear
          </p>

          <p className='flex gap-2'>
            <input className='w-3 cursor-pointer' type="checkbox" value={'Winterwear'} onChange={togglesubcat}/>Winterwear
          </p>
        </div>
      </div>
    </div>

    {/* Rightside */}
    <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'Collections'}/>

          {/*Product sort*/}
          <select onChange={(e)=>setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low-High</option>
            <option value="high-low">Sort By: High-Low</option>
          </select>
      </div>

      {/*Map products */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterprod.map((item,index)=>(
            <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
      
    </div>

    </div>
  )
}

export default Collection
