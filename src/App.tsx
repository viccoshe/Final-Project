import React from 'react';
import './App.css';
import Catalogue from './components/Catalogue/Catalogue';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import { Route, Routes } from "react-router-dom";
import { routes } from './utiles/routes';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path={routes.home} element={<Home/>}/>
          <Route path={routes.catalogue} element={<Catalogue/>}/>
          <Route path={routes.cart} element={<Cart/>}/>
          <Route path={routes.profile} element={<Profile/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
