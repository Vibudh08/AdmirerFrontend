import React from 'react'

import Cart from '../cart-checkout/cart'
import Checkout from '../cart-checkout/checkout/Index'

const Complete_cart_checkout = () => {
  return (
    <div  className='flex w-[80%] m-auto mt-8 border'>
      <Cart/>
      <Checkout/>
    </div>
  )
}

export default Complete_cart_checkout
