import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './App.css';

import Home from './pages/Home.jsx';
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

function App() {

  // const user = true;

  return (

    <BrowserRouter>
      <Routes>

        <Route path='/' exact element={<Home />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
    </BrowserRouter >

  );
}

export default App;
