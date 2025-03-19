import Footer from '@/components/Footer'
import Header from '@/components/Header'
import BlogCards from '@/components/BlogCards'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <div className='min-h-screen px-4 md:px-40'>
      <BlogCards/>
      </div>
      <Footer/>
    </div>

  )
}

export default page