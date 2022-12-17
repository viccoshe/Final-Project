//@ts-ignore
import style from "./Cart.module.css";
//@ts-ignore
import Bin from "../../img/musor.svg";
//@ts-ignore
import Like from "../../img/heart.svg";
//@ts-ignore
import RedLike from "../../img/heart2.svg";
import { IProduct, UserContext } from "../../utiles/UserContext";
import { CatalogueContext } from "../../utiles/CatalogueContext";
import { useContext, useEffect, useState } from "react";
import {User, UserCredential} from "firebase/auth";
import { database } from "../../utiles";
import { get, ref, set, child, push, update, getDatabase, onValue  } from "firebase/database";
import { UserData, EditData} from "../../utiles/buttonTypes";
import { FavsContext } from "../../utiles/FavsContext";

const Cart:React.FC<UserData & EditData> = (props) => {
    const {writeUserData, editUserData} = props;
    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const {user, setUser} = useContext<any | User | UserCredential>(UserContext);
    const [counter, setCounter]  = useState<number>(0);
    const [cart, setCart]  = useState<any>([]);
    const {toggleFavs} = useContext<any>(FavsContext);

    // if(user){
    //     console.log(user.cart);
    //     getUserData(user.id);
    // }


    async function getUserData(id: string | undefined) {
        const dbRef = ref(database);
          await get(child(dbRef, 'mystore/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val();
                console.log(data.cart);
                user.cart = data.cart;
                console.log(user);
                setUser(user);
               // getCart();
            }else{
               console.log('no data available');
            }
        }).catch((error) => {
            console.log(error);
         })
    }


    const getToCart = (id: string): Array<IProduct> | null => {
        if(user.cart){
            let currentCartProduct: IProduct = user.cart.find((item: IProduct) => {
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
            console.log(data);
              //setCounter(counter - 1); 
              
          }else{
              prompt('Sign in to continue');
          }
          return user.cart;
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
        return user.cart;
    }


    useEffect(() => {
        getUserData(user.id);
    }, [user])


    return (
        <main className={style.main}>
            <div className={style.container}>
                <h3>Cart</h3>

                {/* <div className={style.cat}>
                    <ul className={style.block}>
                        <li className={style.active}>Shipping and payment</li>
                        <li>Favorites</li>
                        <li>Cart</li>
                    </ul>
                </div>
             */}
                <div className={style.cartContainer}>

                    <div className={style.itemsContainer}>
                        {user && user.cart.length > 0 
                        ?
                            user.cart.map((item: IProduct, i: string) => {
                            console.log(item);
                             
    
                            const {id, title, price, description: desc, category: cat, image, counter: count} = item;
                            return  <div key={id} className={style.cartItem}>
                                        <div className={style.img}><img src={image} alt="product" /></div>
                                        <h6 className={style.cartTitle}>{title}</h6>
                                        <p className={style.cartDesc}></p>
                                        <div className={style.buttons}>
                                            <div onClick={() =>{toggleFavs(id)}}className={style.fav}><img src={user?.favProducts.some((i: IProduct) => {return i.id === id}) ? RedLike : Like} alt="like" /></div>
                                            <div onClick={() =>{removeOneQuantity(id)}}  className={style.minus}>-</div>
                                            <div className={style.counter}>{count}</div>
                                            <div onClick={() =>{getToCart(id)}} className={style.plus} >+</div>
                                            <div onClick={() =>{deleteFromCart(id)}} className={style.remove} ><img src={Bin} alt="bin" /></div>
                                        </div>
                                </div>
                        }) 
                        
                        : <h3>Cart is empty</h3>
                        }
                    </div>

                    <div className={style.orderContainer}>
                        <h3>Your order</h3>
                    {user.cart.length > 0
                    ?
                    user.cart.map((item: IProduct, i: string) =>{
                        const {id, title, price, description: desc, category: cat, image} = item;
                        return <div className={style.orderItem}>
                            <div className={style.orderTitle}>{title}</div>
                            <div className={style.orderDesc}></div>
                            <div className={style.orderPrice}>{price} $</div>
                        </div>                        
                    })

                    :
                        <h3>Add something to your cart</h3>
                    }
                        
                        
                        <button className={style.button}>Make order</button>
                    </div>



                </div>
            </div>
            
        </main>
    )
}   
                 {/* <div className={style.recommendationsContainer}>
                    <div className={style.tems}>
                        <div className={style.cartItem}>
                            <div className={style.img}><img src="" alt="" /></div>
                            <h6 className={style.cartTitle}>Grammercy</h6>
                            <p className={style.cartDesc}>Coffee table dark wood</p>
                            <div className={style.buttons}>
                                <div className={style.fav}><img src={Like} alt="" /></div>
                                <div className={style.minus}>-</div>
                                <div className={style.counter}>0</div>
                                <div className={style.plus} >+</div>
                                <div className={style.remove} ><img src={Bin} alt="" /></div>
                            </div>
                        </div>
                    </div>
                    </div> */}
                    

export default Cart;