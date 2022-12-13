import React from "react";
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
import Arrow from "../../img/arrow.svg.svg";
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



const Home: React.FC = () => {

    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const {user, setUser} = useContext<any | User | UserCredential>(UserContext);


    if(user){
        console.log(user.cart);
        getUserData(user.id);
    }

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
            }else{
              console.log('no data available');
            }
          }).catch((error) => {
            console.log(error);
          })
    }


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
        } else {
            setUser(null); //
            console.error('User is signed out');
        }
        });
        console.log(user);
}, []);
    
    return (
        <div className={style.main}>

            <div className={style.promo}>
                <div className={style.main_photos}>
                    <img className={style.promo2} src={Promo1} alt="" />
                    <img className={style.promo1} src={Promo2} alt="" />
                </div>
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
                    <div className={style.slider}>
                        <h5>Tabouret</h5>
                        <div className={style.slider_content}>
                            <div><img src={sliderTabouret} alt="" /></div>
                            <div className="img_description">Stylish stool with 3 legs, created from natural materials</div>
                        </div>
                        <a href="">Buy now</a>
                    </div>
                    <div className={style.arrow}><img src={Arrow} alt="" /></div>
                </div>
                <div className={style.bestsellersPhoto}><img src={bestsellersPhoto} alt="" /></div>
            </div>

            <div className={style.articles}>
                <div><img src={articlesPhoto} alt="" /></div>
                <div className={style.articleBlock}>
                    <h4>5 options to highlight the workplace at home</h4>
                    <p>During the pandemic, many have started working from home. Our editors will tell you how to separate work from personal, increase involvement in the process, and also relax as much as possible after work...</p>
                    <a href="">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default Home;