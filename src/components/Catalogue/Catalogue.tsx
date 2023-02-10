import { useContext } from "react";
//@ts-ignore
import style from "./Catalogue.module.css";
import  { useEffect, useState } from "react";
//@ts-ignore
import RedLike from "../../img/heart2.svg";
//@ts-ignore
import BrownLike from "../../img/heart-brown.svg";
import { Link, Outlet, useNavigate} from "react-router-dom";
//@ts-ignore
import Loader from "../../utiles/Loader/Loader";
import { CatalogueContext, FilterContext } from "../../utiles/CatalogueContext";
import {User, UserCredential} from "firebase/auth";
import { IProduct } from "../../utiles/UserContext";
import { UserContext } from "../../utiles/UserContext";
import { UserData, EditData} from "../../utiles/buttonTypes";
import { FavsContext } from "../../utiles/FavsContext";
import ProductItem from "./ProductItem.tsx/ProductsItem";
import { getProductToCart } from "../../utiles/cartActions";
import { PropsProduct } from "../../utiles/UserContext";

const Catalogue: React.FC<UserData & EditData> = (props) => {
    const {writeUserData, editUserData} = props;
    const [loading, setLoading] = useState<boolean>(true);
    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const {user, setUser} = useContext<any | UserCredential | User >(UserContext);
    const {filteredTitle, setFilteredTitle} = useContext<Array<IProduct> | Array<[]> | any>(FilterContext);
    const navigate = useNavigate();
    const {toggleFavs} = useContext<any>(FavsContext);
    const [search, setSearch] = useState<string>('');
    
    const currentSearch = window.location.search.slice(3);

    let currentProducts: Array<IProduct> = catalogue;
    
    // filteredTitle.length > 0 ? currentProducts = filteredTitle 
    //         : selectedCategory.length > 0 ?  currentProducts = selectedCategory 
    //         : currentProducts = catalogue;


useEffect(() => {
    setLoading(false);
}, [])



if(catalogue){
    if(filteredTitle?.length > 0){
        currentProducts = filteredTitle;
    }if(selectedCategory?.length > 0){
        currentProducts = selectedCategory;
    }if(filteredTitle?.length === 0 && selectedCategory?.length === 0){
        currentProducts = catalogue;
    }
}
console.log(currentProducts)

    
    const getCategory = (cat: string) =>{
        const filteredResult: Array<IProduct> = catalogue.filter((item: { category: string}, i: string) => {
            if(item?.category === cat){
                return item;
            }
        })
        console.log(filteredResult);
        setSelectedCategory(filteredResult);
    }


   const  getToCart = (id: string | undefined): Array<IProduct> | null => {
        if(user){
            let currentCartProduct: IProduct = catalogue.find((item: IProduct) => {
                if(item?.id === id){
                    return item;
                };
            });
            if(user.cart?.length > 0 ?? false ){
                editUserData(user?.id, user?.name, currentCartProduct);
            }else{
                writeUserData(user?.id,  user?.name, currentCartProduct);
            }      
        }else{
            alert('Sign in to continue');
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

                {currentProducts?.length > 0 
                    ? currentProducts?.map((item: IProduct) => {
                        return <ProductItem 
                                    pProduct={item} 
                                    getToCart={getToCart}/>
                        })

                    : <h3>THERE'S AN ERROR :C</h3>
                    }
                </div>

            </div>
        </main>
    )
}

export default Catalogue;

/*

                {selectedCategory?.length > 0 
                    ? selectedCategory?.map((item: IProduct, i: string) => {
                        return <ProductItem 
                                    pProduct={item} 
                                    getToCart={getToCart}/>
                        })
                    :  selectedCategory?.length <= 0 && catalogue?.length > 0
                    
                    ? catalogue.map((item: IProduct, i: string) => {
                        console.log(item);
                        return <ProductItem 
                                    pProduct={item} 
                                    getToCart={getToCart}/>
                    })
                    : <h3>THERE'S AN ERROR :C</h3>
                    }
*/

/*
{selectedCategory?.length > 0 
                    ? selectedCategory?.map((item: IProduct, i: string) => {
                        return <ProductItem 
                                    pProduct={item} 
                                    getToCart={getToCart}/>
                        })
                    :  selectedCategory?.length <= 0 && catalogue?.length > 0
                    
                    ? catalogue.map((item: IProduct, i: string) => {
                        console.log(item);
                        return <ProductItem 
                                    pProduct={item} 
                                    getToCart={getToCart}/>
                    })
                    : <h3>THERE'S AN ERROR :C</h3>
                    }
*/


/*
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
                                    <div className={style.buttons}>
                                        <button className={style.button} onClick={() =>{getToCart(id)}}>Add</button>
                                        <div onClick={() =>{toggleFavs(id)}}><img src={user?.favProducts?.some((i: IProduct) => {return i.id === id}) ? RedLike : BrownLike} alt="like" /></div>
                                </div>
                            </div> 
                            
                        </div>
                        })
                    :  selectedCategory?.length <= 0 && catalogue?.length > 0
                    
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
                                <div className={style.buttons}>
                                    <button className={style.button} onClick={() =>{getToCart(id)}}>Add</button>
                                    <div onClick={() =>{toggleFavs(id)}}><img src={user?.favProducts?.some((i: IProduct) => {return i.id === id}) ? RedLike : BrownLike} alt="like" /></div>
                                </div>
                        </div>
                     <Outlet/>
                    </div>
                    
                    })
                    : <h3>THERE'S AN ERROR :C</h3>
                    }
                </div>

            </div>
        </main>

*/