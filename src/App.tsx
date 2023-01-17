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
import {auth,  database  } from './utiles';
import { get, ref, set, child, push, update, getDatabase, onValue  } from "firebase/database";
import { FavsContext } from './utiles/FavsContext';
import Services from './components/Services/Services';
import { CartContext } from './utiles/cartActions';
import { FilterContext } from './utiles/CatalogueContext';


function App() {
  
  const [catalogue, setCatalogue] = useState<Array<IProduct> | any>([]);
  const [user, setUser] = useState<any | UserCredential | User | null>(null);
  const [filteredTitle, setFilteredTitle] = useState<any>('')
 
    let currentUser: any;
    const dbRef = ref(database);
    if(!user ??  user === null){
        onAuthStateChanged(auth, (newUser) => {
            if(newUser) {
                currentUser = {
                    id: newUser.uid,
                    name: newUser.displayName,
                    favProducts: [],
                    cart: [],
                }
            console.log(currentUser);
            getNewUserData(currentUser)
            } else {
              setUser(null);
              console.log('User is signed out');
            }
        });
}  

async function getNewUserData(currentUser: IUser){
        await get(child(dbRef, 'mystore/'+ currentUser?.id)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const dbUser = snapshot.val();
                  if(dbUser?.cart?.length > 0 ?? false){
                    currentUser.cart = dbUser.cart;
                  }if(dbUser?.favProducts?.length > 0 ?? false){
                    currentUser.favProducts = dbUser.favProducts;
                  }
                console.log(currentUser);
                setUser(currentUser);
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
        console.log(`ERROR: ${error}`);
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


  const getToCart = (id: string): Array<IProduct> | null => {
    if(user.cart){
        let currentCartProduct: IProduct = catalogue.find((item: IProduct) => {
            if(item.id === id){
                return item;
            };
        });
        console.log(currentCartProduct); 
        if(user.cart?.length > 0 ?? false ){
            editUserData(user.id, user.name, currentCartProduct);
        }
    }else{
        prompt('Sign in to continue');
        //navigate(routes.profile);
    }
    return user.cart;
}


const removeOneQuantity = (id: string): Array<IProduct> | null => {
    if(user){
        let updatedCart = [];
        console.log(user.cart);
        if (user.cart?.length > 0 ?? false ) {
        user?.cart.map((item: IProduct) => {
                if(item.id === id){
                    if(item.counter <= 1){
                        deleteFromCart(id); 
                    }else{
                      item.counter -= 1;
                    }
                }
            })
        }
        const data = {
            ...user,
            cart: user.cart,
        }
        const updates = {};
        //@ts-ignore
        updates['mystore/' + user.id] = data;
        update(ref(database), updates);
        setUser(data); 
      }else{
          prompt('Sign in to continue');
      }
      return user?.cart;
}



const deleteFromCart = (id: string): Array<IProduct> | null => {
    if(user){
        const data = {
            ...user,
            cart: user.cart ? user?.cart.filter((item: IProduct) => item.id != id) : null,
        }
        const updates = {};
        //@ts-ignore
        updates['mystore/' + user.id] = data;
        update(ref(database), updates);
        setUser(data);
    }
    return user?.cart;
}


useEffect(() => {
  fetch('https://fakestoreapi.com/products')
      .then (response => {
          if (response.ok) {
              return response.json();
          }
      }) 
      .then(data => {
          setCatalogue(data);
      })
}, [])




  return (
    <div className="App">
       <CatalogueContext.Provider value={{catalogue, setCatalogue}}>
          <FilterContext.Provider value={{filteredTitle, setFilteredTitle}}>
          <Header/>
          <UserContext.Provider value={{user, setUser}}>
            <FavsContext.Provider value={{toggleFavs}}>
              <CartContext.Provider value={{deleteFromCart, removeOneQuantity, getToCart}}>
                <Routes>
              <Route path={routes.home} element={<Home/>}/>
              <Route path={routes.catalogue} element={<Catalogue editUserData={editUserData} writeUserData={writeUserData}/>}>
                {/* <Route index={true} path={routes.product} element={<Product/>}/> */}
                </Route>
                <Route path={"catalogue/product/:id"} element={<Product/>}/>
                <Route path={routes.cart} element={<Cart editUserData={editUserData} writeUserData={writeUserData}/>}/>
                <Route path={routes.profile} element={<Profile getNewUserData={getNewUserData} />}/>
                <Route path={routes.services} element={<Services editUserData={editUserData} writeUserData={writeUserData} />}/>
                
              </Routes>
                </CartContext.Provider>
                
              </FavsContext.Provider>
            </UserContext.Provider>  
            </FilterContext.Provider>
          </CatalogueContext.Provider>
          <Footer/>
    </div>
  );
}

export default App;



