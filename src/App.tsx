import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import Catalogue from './components/Catalogue/Catalogue';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import { Route, Routes, Link } from "react-router-dom";
import { routes } from './utiles/routes';
import { CatalogueContext } from './utiles/CatalogueContext';
import { IProduct, UserContext } from './utiles/UserContext';
import { UserContextType } from './utiles/UserContext';
// import { IUser } from './utiles/UserContext';
import Product from './components/Catalogue/Product/Product';
import { UserCredential } from 'firebase/auth';
import {User} from "firebase/auth";

//export const CatalogueContext: any = createContext(null);

function App() {
  
const [catalogue, setCatalogue] = useState<IProduct | {}>([]);
const [user, setUser] = useState<null | UserCredential | User>(null);

// const useEffect = (() => {
//   if(user === null){
//     try {
//       setUser(user: User);
//     } catch (error) {
      
//     }
//   }
// }, [])


  return (
    <div className="App">
        <Header/>
        <CatalogueContext.Provider value={{catalogue, setCatalogue}}>
          <UserContext.Provider value={{user, setUser}}>
            <Routes>
              <Route path={routes.home} element={<Home/>}/>
              <Route path={routes.catalogue} element={<Catalogue/>}>
                {/* <Route index={true} path={routes.product} element={<Product/>}/> */}
              </Route>
              <Route path={"catalogue/product/:id"} element={<Product/>}/>
              <Route path={routes.cart} element={<Cart/>}/>
              <Route path={routes.profile} element={<Profile/>}/>

  

            </Routes>
          </UserContext.Provider>  
        </CatalogueContext.Provider>
        <Footer/>
    </div>
  );
}

export default App;
