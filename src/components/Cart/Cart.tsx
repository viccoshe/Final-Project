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
import { useContext, useEffect, useState, useRef } from "react";
import {User, UserCredential} from "firebase/auth";
import { database } from "../../utiles";
import { get, ref, set, child, push, update, getDatabase, onValue  } from "firebase/database";
import { UserData, EditData} from "../../utiles/buttonTypes";
import { FavsContext } from "../../utiles/FavsContext";
import { CartContext } from "../../utiles/cartActions";
//@ts-ignore
import ArrowRight from "../../img/arrow-right.svg";
//@ts-ignore
import ArrowLeft from "../../img/arrow-left.svg";
import Loader from "../../utiles/Loader/Loader";


const Cart:React.FC<UserData & EditData> = (props) => {
    const {writeUserData, editUserData} = props;
    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const {user, setUser} = useContext<any | User | UserCredential>(UserContext);
    const [loading, setLoading] = useState<boolean>(false);
    const {toggleFavs} = useContext<any>(FavsContext);
    const {deleteFromCart, removeOneQuantity, getToCart} = useContext<any>(CartContext);
    const windowRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState<number>(0);

    const itemWidth = 288;


    const dragToTheLeft = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - itemWidth
            const maxOffset = -(itemWidth * (user?.cart?.length - 3));
            return Math.max(newOffset, maxOffset);
        });
    }
    const dragToTheRight = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + itemWidth
            return Math.min(newOffset, 0);
        });
    }

    
    if (loading) {
    return (
        <main style={{
            minHeight: '70vh',
            height: 'fit-content',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <div><Loader/></div> 
        </main>
        
    )
    }else return (
        <main className={style.main}>
            <div className={style.container}>
                <h3>Cart</h3>
                <div className={style.cartContainer}>
                    
                <div className={style.window}>
                    <div style={{
                            transform: `translateX(${offset}px)`
                        }}  
                        className={style.itemsContainer}>

                        {user && user?.cart.length > 0 
                        ?
                            user?.cart.map((item: IProduct, i: string) => {
                            console.log(item);
                            const {id, title, price, description: desc, category: cat, image, counter: count} = item;
                            return  <div key={id} className={style.cartItem}>
                                        <div className={style.img}><img src={image} alt="product" /></div>
                                        <h6 className={style.cartTitle}>{title}</h6>
                                        <p className={style.cartDesc}></p>
                                        <div className={style.buttons}>
                                            <div onClick={() =>{toggleFavs(id)}}className={style.fav}><img src={user?.favProducts?.some((i: IProduct) => {return i.id === id}) ? RedLike : Like} alt="like" /></div>
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
                </div>

                <div onClick={() =>{dragToTheLeft()}} className={style.arrow}><img src={ArrowRight} alt="arrow" /></div>
                <div onClick={() =>{dragToTheRight()}} className={style.arrowRight}><img src={ArrowLeft} alt="arrow" /></div>


                
                    <div className={style.orderContainer}>
                        <h3>Your order</h3>
                        {user?.cart.length > 0
                        ?
                        user?.cart.map((item: IProduct, i: string) =>{
                            const {id, title, price, description: desc, category: cat, image, counter: count} = item;
                            return <div className={style.orderItem}>
                                <div>
                                    <div className={style.orderTitle}>{title}</div>
                                    <div className={style.orderDesc}></div>
                                    <div>x {count}</div>
                                </div>
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

export default Cart;