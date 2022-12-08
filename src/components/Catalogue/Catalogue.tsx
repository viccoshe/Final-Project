//@ts-ignore
import style from "./Catalogue.module.css";
import  { useEffect, useState } from "react";
//@ts-ignore
import Bin from "../../img/musor.svg";
//@ts-ignore
import Like from "../../img/heart.svg";

const Catalogue: React.FC = () => {
    //const [loading, setLoading] = useState(true);
    const [catalogue, setCatalogue] = useState<any[]>([]);

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
        <main className={style.main}>
            <div className={style.container}>
                <h3>Catalogue</h3>
                <div className={style.cat}>
                    <ul className={style.catBlock}>
                        <li className={style.active}>Living room</li>
                        <li>Bedroom</li>
                        <li>Wardrobe</li>
                        <li>Playroom</li>
                    </ul>
                    <ul className={style.catBlock}>
                        <li>Hallway</li>
                        <li>Textile</li>
                        <li>Decor</li>
                    </ul>
                </div>

                <div className={style.productsContainer}>
                    {catalogue.length > 0 ?
                        catalogue.map((item, i) => {
                            console.log(item);
                            return <div key={i} className={style.productItem}> 
                                <div className={style.img}>
                                    <div className={style.productCat}>{item.category}</div>
                                    <div className={style.img}><img src={item.image} alt="product"/></div>
                                </div>
                                <div className={style.productInfo}>
                                    <h5>{item.title}</h5>
                                    <p className={style.productDesc}>{item.description}</p>
                                    <p className={style.productPrice}>{item.price} $</p> 
                                    <div className={style.buttons}>
                                <div className={style.fav}><img src={Like} alt="" /></div>
                                <div className={style.minus}>-</div>
                                <div className={style.counter}>0</div>
                                <div className={style.plus} >+</div>
                                <div className={style.remove} ><img src={Bin} alt="" /></div>
                            </div>
                                </div> 
                        </div>
                        })
                    : <h3>THERE IS AN ERROR</h3>
                    }
                </div>

            </div>
        </main>
    )
}

export default Catalogue;