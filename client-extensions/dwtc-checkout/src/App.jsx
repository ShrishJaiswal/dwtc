import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import { CartPage } from './common/sections/CartPage';
import React from 'react';
import { CartProvider } from './context/CartContext';
import { SpecialInstructionProvider } from './context/SpecialInstruction';
import { TakeAway } from './common/sections/TakeAway';
import { HomeDelivery } from './common/sections/HomeDelivery';
import { PaymentOptions } from './common/sections/PaymentOptions';
import { CouponCodes } from './common/sections/CouponCodes';
import OrderSummary from './common/sections/OrderSummary';

function App() {
  const [count, setCount] = useState(0)

  return (
    <CartProvider>
      <SpecialInstructionProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<CartPage />} />
            <Route path='/takeaway' element={<TakeAway />} />
            <Route path='/homedelivery' element={<HomeDelivery />} />
            <Route path='/payment' element={<PaymentOptions />} />
            <Route path='/summary' element={<OrderSummary />} />
            <Route path='/coupon' element={<CouponCodes />} />
          </Routes>
        </MemoryRouter>
      </SpecialInstructionProvider>
    </CartProvider>
  )
}

export default App
