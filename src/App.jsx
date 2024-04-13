//REACT IMPORTS-
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CityProvider } from './contexts/CityContext'

//-------------------------------------------------------------------------------------------------------------------------
//COMPONENETS IMPORT
import Product from './pages/Product'
import Homepage from './pages/Homepage'
import Price from './pages/Price'
import Not from './pages/Not'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import Citilist from './components/Citilist'
import Countrieslist from './components/Countrieslist'
import City from './components/City'
import Form from './components/Form';


//--------------------------------------------------------------------------------------------------------------------------

// "*" is used to match a route which is not defined and produces an error message on screnn
//-------------------------------------------------------------------------------------------------------------------------
function App () {



  return (
    <>
      <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path='pricing' element={<Price />} />
            <Route path='product' element={<Product />} />
            <Route path='app' element={<AppLayout />}>
              <Route index element={<Navigate to='cities' />} />
              <Route  path='cities' element={<Citilist />} />
              <Route path='cities/:id' element={<City />} />
              <Route path='countries' element={<Countrieslist />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route replace='true' path='login' element={<Login />} />
            <Route path='*' element={<Not />} />
          </Routes>
        </BrowserRouter>
      </CityProvider>
    </>
  )
}

export default App;
