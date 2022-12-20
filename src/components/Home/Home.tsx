import React, {useState} from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import Promo1 from "../../img/promo1.png";
//@ts-ignore
import Promo2 from "../../img/promo2.png";
//@ts-ignore
import style from "./Home.module.css";
//@ts-ignore
import sliderTabouret from "../../img/slider_tabouret.png";
//@ts-ignore
import bestsellersPhoto from "../../img/bestsellers_main-photo.png";
//@ts-ignore
import articlesPhoto from "../../img/articles_main-photo.png";
//@ts-ignore
import Arrow from "../../img/arrow2.svg";
import { routes } from "../../utiles/routes";
import { useEffect, useContext } from "react";
import { CatalogueContext } from "../../utiles/CatalogueContext";
import { UserContext } from "../../utiles/UserContext";
import {User, UserCredential} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utiles";
import { IUser } from "../../utiles/CatalogueContext";
import { get, ref, set, child, push, update, getDatabase, onValue  } from "firebase/database";
import { database } from "../../utiles";
import { IProduct } from "../../utiles/UserContext";



const Home: React.FC = () => {
    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const {user, setUser} = useContext<any | User | UserCredential>(UserContext);
    const [selectedItem, setSelectedItem] = useState<any>(
        catalogue?.find((i: IProduct) => {
            if(i.id.toString() === '1'){
                return i;
            }
        })
    );

    const pItem = catalogue?.find((i: IProduct) => {
        if(i.id.toString() === '1'){
            return i;
        }
    })
    
    const getItem = (pId: string) =>{
        const filteredResult = catalogue?.find((item: { id: string}) => {
            if(item.id.toString() === pId){
                return item;
            }
        })
        console.log(filteredResult);
        setSelectedItem(filteredResult);
    }


    return (
        <div className={style.main}>
            <div className={style.homeContainer}>
                <div className={style.promo}>

                    <img className={style.promo2} src={Promo1} alt="" />
                    <img className={style.promo1} src={Promo2} alt="" />

                    <div className={style.content}>
                        <h3>Everything that surrounds us makes us stronger</h3>
                        <p>Exclusive designer furniture and fittings. Natural materials and individual approach when created, they will give an incomparably high level of quality and comfort</p>
                        <Link to={routes.catalogue}>
                            <button className={style.button}>Go to catalogue</button>
                        </Link>
                    </div>
                </div>

                <div className={style.bestsellers}>
                    <div className={style.bestsellers_article}>
                        <h4>Bestsellers</h4>
                        <p>This brand is also presented as kitchen sets.</p>
                        <p>The company's rich history and excellent reputation have made it desirable in the fashion world.</p>
                        
                            {selectedItem 
                            ?
                                <div className={style.slider}>
                                    <h5>{selectedItem?.title.slice(0, 35)}</h5>
                                    <div className={style.slider_content}>
                                        <div className={style.itemImg}><img src={selectedItem?.image} /></div>
                                        <div className={style.price}>{selectedItem?.price} $</div>
                                        
                                    </div>
                                    <a href="">Buy now</a>
                                </div>
                            :
                                   <div className={style.slider}>
                                                <h5>{pItem?.title.slice(0, 35)}</h5>
                                                <div className={style.slider_content}>
                                                    <div className={style.itemImg}><img src={pItem?.image} /></div>
                                                    <div className={style.price}>{pItem?.price} $</div>
                                                    
                                                </div>
                                                <a href="">Buy now</a>
                                            </div>
                            }

       


                        <div className={style.arrow}><img src={Arrow} alt="" /></div>
                    </div>
                    <div className={style.bestsellersPhoto}>
                        <img src={bestsellersPhoto} alt="" />
                        
                        <div className={style.itemButton1} onClick={() => {getItem('1')}}></div>
                        <div className={style.itemButton2} onClick={() => {getItem('2')}}></div>
                        <div className={style.itemButton3} onClick={() => {getItem('3')}}></div>
                        <div className={style.itemButton4} onClick={() => {getItem('4')}}></div>
                        <div className={style.itemButton5} onClick={() => {getItem('5')}}></div>
                    
                    </div>
                </div>

                <div className={style.articles}>
                    <div className={style.articleImg}><img src={articlesPhoto} alt="" /></div>
                        <div className={style.articleBlock}>
                            <div className={style.textBlock}>
                                <h4>5 options to highlight the workplace at home</h4>
                                <p>During the pandemic, many have started working from home. Our editors will tell you how to separate work from personal, increase involvement in the process, and also relax as much as possible after work...</p>
                                <a href="">Read more
                                    <img src={Arrow} alt="arrow" />
                                </a>
                            </div>
                        </div>                    
                    

                </div>
            </div>

        </div>
    )
}

export default Home;