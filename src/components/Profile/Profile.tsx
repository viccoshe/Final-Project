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

    // useEffect(() => {  ///убрать
    //         onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             console.log(user);
    //             const currentUser: IUser = {
    //                 id: user.uid,
    //                 name: user.displayName,
    //                 favProducts: [],
    //                 cart: [],
    //             }
    //             setUser(currentUser);
    //         } else {
    //             setUser(null); //
    //             console.error('User is signed out');
    //         }
    //         });
    //         console.log(user);
    // }, []);



// let currentUser: any;


// async function getNewUserData(){
//     const dbRef = ref(database);
//     if(!user ??  user === null){
//         onAuthStateChanged(auth, (newUser) => {
//             if(newUser) {
//                 currentUser = {
//                     id: newUser.uid,
//                     name: newUser.displayName,
//                     favProducts: [],
//                     cart: [],
//                 }
//             console.log(currentUser);
//             } else {
//                 console.error('User is signed out');
//             }
//         });

//         await get(child(dbRef, 'mystore/'+ currentUser?.id)).then((snapshot) => {
//             if (snapshot.exists()) {
//                 console.log(snapshot?.val());
//                 const userInfo = snapshot?.val();
//                 console.log(userInfo?.cart);
//                 if(userInfo?.cart?.length > 0 ?? false){
//                   currentUser.cart = userInfo.cart;
//                 }if(userInfo?.favProducts?.length > 0 ?? false){
//                   currentUser.favProducts = userInfo.favProducts;
//                 }
//                 console.log(currentUser);
//                 setUser(currentUser);
//             }else{
//               console.log('no data available');
//             }
//         }).catch((error) => {
//             console.log(error);
//         })     
//     }
// }
        



    
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         console.log(user);
    //         const currentUser: IUser = {
    //             id: user.uid,
    //             name: user.displayName,
    //             favProducts: [],
    //             cart: [],
    //         }
    //         //setUser(currentUser);
    //         console.log(currentUser);
    //         //
    //         const dbRef = ref(database);
    //         get(child(dbRef, 'mystore/'+ user.uid)).then((snapshot) => {
    //           if (snapshot.exists()) {
    //             console.log(snapshot.val());
    //             const dbInfo = snapshot.val();
    //             console.log(dbInfo.cart);
    //             if(dbInfo?.cart?.length > 0 ?? false){
    //               currentUser.cart = dbInfo.cart;
    //             }if(dbInfo?.favProducts?.length > 0 ?? false){
    //               currentUser.favProducts = dbInfo.favProducts;
    //             }
    //             setUser(currentUser);
    //           }else{
    //             console.log('no data available');
    //          }
    //         })
            
    //         //getUserData(user.uid);
    //     } else {
    //         console.error('User is signed out');
    //     }
    //     });
    //     console.log(user);
    //   }, []);
    

    

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
                        <button type="submit">Sing Up / Зарегисртироваться</button>
                    </form>
                    :
                    <form onSubmit={loginEmailAndPass} action="" className="form">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Name and Surname"/>
                        <button type="submit">Sing In / Войти</button>
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
                    <div className={style.profileAvatar}>{user ? user?.name.slice(0, 1) : null}</div>
                    <p>Good afternoon,<br/><span>{user ? user.name : ' guest'}</span></p>
                    <div className={style.total}>Your total: {total.toFixed(2)}</div>
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