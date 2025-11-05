import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos exercitationem laudantium perferendis sit sequi, facere unde? Voluptates saepe animi architecto, perspiciatis fugit quae sapiente enim impedit, eveniet corporis accusantium excepturi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, amet?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae obcaecati corporis beatae quisquam ad neque repellendus modi ullam earum necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut neque illo quos earum fugit totam cum eum aspernatur sunt aliquam.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo accusamus, velit eius eveniet similique incidunt commodi reiciendis magnam architecto ducimus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, saepe.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, in. Neque quidem nesciunt consequuntur suscipit hic asperiores, similique aliquam sed accusantium blanditiis veniam officiis, nemo mollitia facere. Odit ratione id ipsam quaerat officia, inventore sed, quidem nemo corrupti quasi non.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, in. Neque quidem nesciunt consequuntur suscipit hic asperiores, similique aliquam sed accusantium blanditiis veniam officiis, nemo mollitia facere. Odit ratione id ipsam quaerat officia, inventore sed, quidem nemo corrupti quasi non.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, in. Neque quidem nesciunt consequuntur suscipit hic asperiores, similique aliquam sed accusantium blanditiis veniam officiis, nemo mollitia facere. Odit ratione id ipsam quaerat officia, inventore sed, quidem nemo corrupti quasi non.</p>
        </div>
      </div>

      

    </div>
  )
}

export default About
