import React, {useState, useEffect, useContext } from 'react';
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
import Product from './components/Catalogue/Product/Product';
import { UserCredential } from 'firebase/auth';
import {User} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { IUser } from './utiles/CatalogueContext';
import { auth, database  } from './utiles';
import { get, ref, set, child, push, update, getDatabase, onValue  } from "firebase/database";
import { FavsContext } from './utiles/FavsContext';
import Services from './components/Services/Services';

function App() {
  
  const [catalogue, setCatalogue] = useState<Array<IProduct> | any>([]);
  const [user, setUser] = useState<any | UserCredential | User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        const currentUser: IUser = {
            id: user.uid,
            name: user.displayName,
            favProducts: [],
            cart: [],
        }
        setUser(currentUser);
        console.log(currentUser);
        console.log(user);
        getUserData(user.uid);
    } else {
        setUser(null); 
        console.error('User is signed out');
    }
    });
    console.log(user);
  }, []);

  
  async function getUserData(id: string | undefined){
    const dbRef = ref(database);
      await get(child(dbRef, 'mystore/'+ id)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const dbCart = snapshot.val();
            console.log(dbCart.cart);
            user.cart = dbCart.cart;
            console.log(user);
            setUser(user);
        }else{
           console.log('no data available');
        }
    }).catch((error) => {
        console.log(error);
     })
}

  
  async function writeUserData(id: string,  name: string | null,  product: IProduct): Promise<any> {
      const counter = 1;
      try {
        await set(ref(database, 'mystore/' + id), {
            username: name,
            cart: [{
              ...product,
              counter: counter
            }],
        });
        console.log('Success');
      } catch (error) {
        console.error(`ERROR: ${error}`);
      }
  }

  async function editUserData(id: string,  name: string | null,  product: IProduct) {
    if(id){
        const response = await get(child(ref(database), 'mystore/'+ id));
        if(response.exists()) {
            console.log(product.id);
            const oldCart = response.val();
            let exists = oldCart.cart.some((item:IProduct) => {
              return item.id === product.id;
            })

            if(exists){
              oldCart.cart.map((item: IProduct) => {
                if(item.id === product.id){
                  item.counter += 1;
                  oldCart.cart = [...oldCart.cart];
                }
              })
            }else{
              product.counter = 1;
              oldCart.cart = [...oldCart.cart, product];
            }   
            const data = {
              ...user,
              cart: oldCart.cart
            }
            console.log(data);
            setUser(data);  
            await update(ref(database, 'mystore/'+ id), oldCart);
        }
        try {
        } catch (error) {
            console.error(`ERROR: ${error}`);
        }
    }
    return null; 
  }


  async function toggleFavs(id: string) {
    const dbRef = ref(database);
    console.log(catalogue);
    await get(child(dbRef, 'mystore/'+ user.id)).then((snapshot) => {
      if (snapshot.exists()) {
            const data = snapshot.val();
            const theFav = catalogue?.find((i: IProduct) => {
                return i.id === id
            })
            let updatedData= {};
            if(data?.favProducts?.length === undefined ?? false){
                updatedData = {
                    ...data,

                    favProducts: [theFav],
                }
            }else{
                if(data?.favProducts.some((i: IProduct) => {return i.id === id})){
                    updatedData = {
                        ...data,

                        favProducts: data?.favProducts.filter((i: IProduct) => {return i.id !== id}),
                    }
                }else{
                    updatedData = {
                        ...data,

                        favProducts: [...data?.favProducts, theFav],
                    }
                }
            }
            console.log(updatedData);
            const updates = {};
            //@ts-ignore
            updates['mystore/' + user.id] = updatedData;
            update(ref(database), updates);
            let uUser = {
                ...updatedData,
                id: user.id
            }
            setUser(uUser);
      }else{
         console.log('no data available');
      }
  }).catch((error) => {
      console.log(error);
   })
  }


  return (
    <div className="App">
        <Header/>
        <CatalogueContext.Provider value={{catalogue, setCatalogue}}>
          <UserContext.Provider value={{user, setUser}}>
            <FavsContext.Provider value={{toggleFavs}}>
              <Routes>
              <Route path={routes.home} element={<Home/>}/>
              <Route path={routes.catalogue} element={<Catalogue getUserData={getUserData} editUserData={editUserData} writeUserData={writeUserData}/>}>
                {/* <Route index={true} path={routes.product} element={<Product/>}/> */}
              </Route>
              <Route path={"catalogue/product/:id"} element={<Product editUserData={editUserData} writeUserData={writeUserData}/>}/>
              <Route path={routes.cart} element={<Cart editUserData={editUserData} writeUserData={writeUserData}/>}/>
              <Route path={routes.profile} element={<Profile />}/>
              <Route path={routes.services} element={<Services />}/>
              
            </Routes>
            </FavsContext.Provider>
          </UserContext.Provider>  
        </CatalogueContext.Provider>
        <Footer/>
    </div>
  );
}

export default App;
