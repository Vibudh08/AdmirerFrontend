import React from 'react'

import Cart from '../cart-checkout/cart'
import Checkout from '../cart-checkout/checkout'

const Complete_cart_checkout = () => {
  return (
    <div  className='flex w-[80%] m-auto max-md:flex-col max-md:w-[95%]  mt-8 border'>
      <Cart/>
      <Checkout/>
    </div>
  )
}

export default Complete_cart_checkout
