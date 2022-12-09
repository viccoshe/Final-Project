import { MouseEvent } from "react";
//@ts-ignore
import style from "./Catalogue.module.css";
import  { useEffect, useState } from "react";
//@ts-ignore
import Bin from "../../img/musor.svg";
//@ts-ignore
import Like from "../../img/heart.svg";
import { Routes, Route } from "react-router-dom";
//@ts-ignore
import Loader from "../../utiles/Loader/Loader";


const Catalogue: React.FC = () => {
    //const products: Array<any> = [];
    const [loading, setLoading] = useState<boolean>(true);
    const [catalogue, setCatalogue] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>([]);

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
                    
                    ? selectedCategory.map((item: any, i: any) => {
                            console.log(item);
                            const {id, title, price, description: desc, category: cat, image} = item;
                            return <div key={id} className={style.productItem}> 
                                <div className={style.img}>
                                    <div className={style.productCat}>{cat}</div>
                                    <div className={style.img}><img src={image} alt="product"/></div>
                                </div>
                                <div className={style.productInfo}>
                                    <h5>{title}</h5>
                                    <p className={style.productDesc}>{desc}</p>
                                    <p className={style.productPrice}>{price} $</p> 
                                    <div className={style.buttons}>
                                    <div className={style.fav}><img src={Like} alt="like" /></div>
                                    <div className={style.minus}>-</div>
                                    <div className={style.counter}>0</div>
                                    <div className={style.plus} >+</div>
                                    <div className={style.remove} ><img src={Bin} alt="remove" /></div>
                                </div>
                            </div> 
                        </div>
                        })
                    :  selectedCategory.length <= 0 && catalogue.length > 0
                    
                    ? catalogue.map((item: any, i: any) => {
                        console.log(item);
                        const {id, title, price, description: desc, category: cat, image} = item;
                        return <div key={id} className={style.productItem}> 
                            <div className={style.img}>
                                <div className={style.productCat}>{cat}</div>
                                <div className={style.img}><img src={image} alt="product"/></div>
                            </div>
                            <div className={style.productInfo}>
                                <h5>{title}</h5>
                                <p className={style.productDesc}>{desc}</p>
                                <p className={style.productPrice}>{price} $</p> 
                                <div className={style.buttons}>
                                <div className={style.fav}><img src={Like} alt="like" /></div>
                                <div className={style.minus}>-</div>
                                <div className={style.counter}>0</div>
                                <div className={style.plus} >+</div>
                                <div className={style.remove} ><img src={Bin} alt="remove" /></div>
                            </div>
                        </div> 
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