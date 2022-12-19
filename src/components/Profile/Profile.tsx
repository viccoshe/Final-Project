import { FormEvent, MouseEvent, useEffect, useState, useContext} from "react";
import { UserContext } from "../../utiles/UserContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
//@ts-ignore
import style from "./Profile.module.css";
//@ts-ignore
import Exit from "../../img/exit.svg";
import { IUser } from "../../utiles/CatalogueContext";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "../../utiles";
import { UserCredential, User } from "firebase/auth";
import { CatalogueContext } from "../../utiles/CatalogueContext";
import { IProduct } from "../../utiles/UserContext";
import {auth,  database  } from '../../utiles';
import { get, ref, set, child, push, update, getDatabase, onValue  } from "firebase/database";


const Profile: React.FC = () => {
    const [form, setForm] = useState<boolean>(false);
    const {user, setUser} = useContext<any | User | UserCredential>(UserContext);
    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [total, setTotal] = useState<number>(0);

const registerEmailAndPass = async (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return setUser(result);
}

const loginEmailAndPass = async (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const result = await signInWithEmailAndPassword(auth, email, password);
    return  setUser(result);
}

const loginViaGoogle = async (e:FormEvent) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(user);
    return setUser(result);
}

const logOut = async (e:FormEvent) => {
    e.preventDefault();
    signOut(auth).then(() => {
        if(user){
            console.log('user: ', user)
        }
        setUser(null);
    }).catch((error) => {
        console.error('user is still here')
    });
    console.log(user);
}

useEffect(() => {
    getTotal();
})

const getTotal = () => {
    if(user.cart.length > 0 ?? false){
        const prices: any[] = [];
        user.cart.filter((item: IProduct) => {
            if(item.price){
                prices.push(+item.price);
                console.log(prices);
            }
            const totalPrice = prices.reduce((acc, initVal) => acc + initVal, 0);
            console.log(totalPrice);
            setTotal(totalPrice);
        })
    }
}

    return !user ? (
        <main className={style.main}>
            <div className={style.formContainer}>
                <button onClick={()=>setForm(!form)}>Sign Up</button>
                {form ?
                    <form onSubmit={registerEmailAndPass} action="" className="form">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                        <button type="submit">Sing Up</button>
                    </form>
                    :
                    <form onSubmit={loginEmailAndPass} action="" className="form">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Name and Surname"/>
                        <button type="submit">Sing In</button>
                    </form>
                }
                <div>or</div>
                <hr />
                <button onClick={(e:FormEvent) =>{loginViaGoogle(e)}} type="submit">Sing In via Google</button>
            </div>
        </main>
    ):(
        <main className={style.main}>
            <div className={style.profileContainer}>
                <div className={style.profileHeader}>
                    <div className={style.avatarContainer}>
                        <div className={style.profileAvatar}>{user ? user?.name.slice(0, 1) : null}</div>
                        <p>Good afternoon,<br/><span>{user ? user.name : ' guest'}</span></p>
                    </div>
                    <ul className={style.settings}>
                        <a href="#href"><li>My purchases</li></a>
                        <a href="#href"><li>Points piggy bank</li></a>
                        <a href="#href"><li>Payment settings</li></a>
                        <a href="#href"><li>Settings</li></a>
                        <a href="#href"><li>Support</li></a>
                    </ul>
                    <div className={style.total}>Your total:   {total.toFixed(2)}</div>
                    <div onClick={(e: MouseEvent) =>{logOut(e)}}><img src={Exit} alt="Exit" /></div>
                </div>
            </div>

            <div className={style.stockContainer}>
                <h4>Stock</h4>
                <div className={style.stock}>
                    <div className={style.stockItem}> 
                        <p><span>-15%<br/></span>for any chair</p>
                    </div>
                    <div className={style.stockItem}>
                        <p><span>for any chair<br/></span>Hand over old furniture and get</p>
                    </div>
                    <div className={style.stockItem}>
                        <p><span>200 welcome points<br/></span>for the first purchase</p>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Profile;