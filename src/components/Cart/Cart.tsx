//@ts-ignore
import style from "./Cart.module.css";
//@ts-ignore
import Bin from "../../img/musor.svg";
//@ts-ignore
import Like from "../../img/heart.svg";

const Cart:React.FC = () => {
    return (
        <main className={style.main}>
            <div className={style.container}>
                <h3>Cart</h3>
                <div className={style.cat}>
                    <ul className={style.block}>
                        <li className={style.active}>Shipping and payment</li>
                        <li>Favorites</li>
                        <li>Cart</li>
                    </ul>
                </div>
            
                <div className={style.cartContainer}>

                    <div className={style.itemsContainer}>
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

                    <div className={style.orderContainer}>
                        <h3>Your order</h3>
                        <div className={style.orderItem}>
                            <div className={style.orderTitle}></div>
                            <div className={style.orderDesc}></div>
                        </div>
                        <div className={style.orderPrice}></div>
                        <button className={style.button}>Make order</button>
                    </div>

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
                    

                </div>
            </div>
            
        </main>
    )
}

export default Cart;