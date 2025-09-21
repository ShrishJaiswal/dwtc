import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import SavedAddresses from './section/SavedAddresses'
import { AddOrEditAddress } from './section/AddOrEditAddrss'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<SavedAddresses />} />
          <Route path='/address/:accountId/:addressId' element={<AddOrEditAddress />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
