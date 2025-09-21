import React from 'react'
import OrderHistory from './common/sections/OrderHistory'
import ProductRating from './common/sections/ProductRating'
import { BrowserRouter, HashRouter, MemoryRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<OrderHistory />} />
          <Route path="/feedbackrating/:cartId/:erc" element={<ProductRating />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
