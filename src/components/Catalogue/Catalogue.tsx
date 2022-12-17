import { useContext } from "react";
//@ts-ignore
import style from "./Catalogue.module.css";
import  { useEffect, useState } from "react";
//@ts-ignore
import Bin from "../../img/musor.svg";
//@ts-ignore
import Like from "../../img/heart.svg";
import { Link, Outlet, useNavigate} from "react-router-dom";
//@ts-ignore
import Loader from "../../utiles/Loader/Loader";
import { CatalogueContext } from "../../utiles/CatalogueContext";
import {User, UserCredential} from "firebase/auth";
import { IProduct } from "../../utiles/UserContext";
import { UserContext } from "../../utiles/UserContext";
import { UserData, EditData, GetData } from "../../utiles/buttonTypes";


const Catalogue: React.FC<UserData & EditData & GetData> = (props) => {
    const {writeUserData, editUserData, getUserData} = props;
    const [loading, setLoading] = useState<boolean>(true);
    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const {user, setUser} = useContext<any | UserCredential | User >(UserContext);
    const [cart, setCart]  = useState<any>([]);
    const navigate = useNavigate();
    

    const getCategory = (cat: string) =>{
        const filteredResult: Array<{}> = catalogue.filter((item: { category: string}, i: string) => {
            if(item.category === cat){
                return item;
            }
        })
        console.log(filteredResult);
        setSelectedCategory(filteredResult);
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
                setLoading(false);
            })
    }, [])

   const  getToCart = async(id: string) => {
        await getUserData(user.id);
        if(user){
            let currentCartProduct: IProduct = catalogue.find((item: IProduct) => {
                if(item.id === id){
                    return item;
                };
            });
            if(user.cart?.length > 0 ?? false ){
                editUserData(user.id, user.name, currentCartProduct);
            }else{
                writeUserData(user.id,  user.name, currentCartProduct);
            }      
        }else{
            prompt('Sign in to continue');
            //navigate(routes.profile);
        }
        return user.cart;
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
                <h3>Catalogue</h3>
                <div className={style.cat}>
                    <div onClick={() => {setSelectedCategory([])}} className={style.productCategory}>All</div>
                    <div onClick={() => {getCategory(`men's clothing`)}} className={style.productCategory}>Men</div>
                    <div onClick={() => {getCategory(`women's clothing`)}} className={style.productCategory}>Women</div>
                    <div onClick={() => {getCategory('electronics')}} className={style.productCategory}>Electronics</div>
                    <div onClick={() => {getCategory('jewelery')}} className={style.productCategory}>Jewelery</div>
                </div>

                <div className={style.productsContainer}>

                    {selectedCategory.length > 0 
                    
                    ? selectedCategory.map((item: IProduct, i: string) => {
                            console.log(item);
                            const {id, title, price, description: desc, category: cat, image} = item;
                            return <div key={id} className={style.productItem}> 
                                <div className={style.img}>
                                    <div className={style.productCat}>{cat}</div>
                                    <Link to={`product/:${id}`}>
                                        <div className={style.img}><img src={image} alt="product"/></div>
                                    </Link>
                                    
                                </div>
                                <div className={style.productInfo}>
                                    <Link to={`product/:${id}`}><h5>{title}</h5></Link>
                                    <p className={style.productDesc}>{desc}</p>
                                    <p className={style.productPrice}>{price} $</p> 
                                    <button onClick={() =>{getToCart(id)}} className={style.button} >Add</button>
                            </div> 
                            
                        </div>
                        })
                    :  selectedCategory.length <= 0 && catalogue.length > 0
                    
                    ? catalogue.map((item: {id: string, title: string, price: string, description: string, category: string, image: string}, i: string) => {
                        console.log(item);
                        const {id, title, price, description: desc, category: cat, image} = item;
                        return <div key={id} className={style.productItem}> 
                            <div className={style.img}>
                                <div className={style.productCat}>{cat}</div>
                                
                                <Link to={`product/:${id}`}>
                                    <div className={style.img}><img src={image} alt="product"/></div>
                                </Link>
                                
                                
                            </div>
                            <div className={style.productInfo}>
                                <Link to={`product/:${id}`}><h5>{title}</h5></Link>
                                <p className={style.productDesc}>{desc}</p>
                                <p className={style.productPrice}>{price} $</p> 
                                <button onClick={() =>{getToCart(id)}} className={style.button} >Add</button>
                        </div>
                     <Outlet/>
                    </div>
                    
                    })
                    : <h3>THERE'S AN ERROR :C</h3>
                    }
                </div>

            </div>
        </main>
    )
}

export default Catalogue;