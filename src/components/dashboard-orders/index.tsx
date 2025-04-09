import React from 'react'
import OrderCard from './OrderCard'

const OrderPage = () => {
  return (
    <div className='border bg-white   m-auto shadow-md p-8 max-sm:p-4 max-sm:mt-5'>
        <h1 className='text-xl font-semibold mb-6 border-b pb-2'>All Orders</h1>
        <OrderCard/>
    </div>
  )
}

export default OrderPage
