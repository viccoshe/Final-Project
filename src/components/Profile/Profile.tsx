import { FormEvent, MouseEvent, useEffect, useState, useContext} from "react";
import { UserContext } from "../../utiles/UserContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
//@ts-ignore
import style from "./Profile.module.css";
//@ts-ignore
import Exit from "../../img/exit.svg";
//@ts-ignore
import ExitHover from "../../img/exitHover.svg";
import { UserCredential, User } from "firebase/auth";
import { CatalogueContext } from "../../utiles/CatalogueContext";
import { IProduct } from "../../utiles/UserContext";
import {auth} from '../../utiles';
import { GetNewData } from "../../utiles/buttonTypes";
import Loader from "../../utiles/Loader/Loader";

const Profile: React.FC<GetNewData> = (props) => {
    const {getNewUserData} = props;
    const [form, setForm] = useState<boolean>(false);
    const {user, setUser} = useContext<any | User | UserCredential>(UserContext);
    const {catalogue, setCatalogue} = useContext<any>(CatalogueContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeHover, setActiveHover] = useState<boolean>(false);



const registerEmailAndPass = async (e: FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    let result = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
        let currentUser: any;
        console.log(userCredential)
        if(userCredential){        
            const user = userCredential.user;

                currentUser = {
                    id: user?.uid,
                    name: user?.displayName,
                    favProducts: [],
                    cart: [],
                }
            console.log(currentUser);
            getNewUserData(currentUser)
        }
        return currentUser;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Your password is weak / Email is not valid: try again');
      });
}

const loginEmailAndPass = async (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const result = await signInWithEmailAndPassword(auth, email, password);
    let currentUser: any;
    if(result){
            currentUser = {
                id: result?.user?.uid,
                name: result?.user?.displayName,
                favProducts: [],
                cart: [],
            }
        console.log(currentUser);
        getNewUserData(currentUser)
    }
    return result;
}

const loginViaGoogle = async (e:FormEvent) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    let currentUser: any;
    if(result){
            currentUser = {
                id: result?.user?.uid,
                name: result?.user?.displayName,
                favProducts: [],
                cart: [],
            }
        console.log(currentUser);
        getNewUserData(currentUser)
    }
    return result;
}

const logOut = async (e:FormEvent) => {
    e.preventDefault();
    signOut(auth).then(() => {
        if(user){
            console.log('user: ', user)
        }
        setUser(null);
    }).catch((error) => {
        console.log('user is still here')
    });

}

useEffect(() => {
    if(user){
        getTotal(); 
        setLoading(false); 
    }
    if(user || user === null){
        setLoading(false); 
    }

})

const getTotal = () => {
    if(user?.cart?.length > 0 ?? false){
        const prices: any[] = [];
        user?.cart?.filter((item: IProduct) => {
            if(item?.price){
                prices.push(+item?.price);
            }
            const totalPrice = prices.reduce((acc, initVal) => acc + initVal, 0);
            setTotal(totalPrice);
        })
    }
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
}else return !user?.id  ? (
        <main className={style.main}>
            <div className={style.formContainer}>
                <button onClick={()=>setForm(!form)}>Sign Up</button>
                {form ?
                    <form className={style.form} onSubmit={registerEmailAndPass} action="">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                        <button className={style.signButton} type="submit">Sing Up</button>
                    </form>
                    :
                    <form className={style.form} onSubmit={loginEmailAndPass} action="">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Name and Surname"/>
                        <button className={style.signButton}  type="submit">Sing In</button>
                    </form>
                }
                <div>or</div>
                <div className={style.line} ></div>
                <button className={style.googleButton} onClick={(e:FormEvent) =>{loginViaGoogle(e)}} type="submit">Sing In via Google</button>
            </div>
        </main>
    ):(
        <main className={style.main}>
            <div className={style.profileContainer}>
                <div className={style.profileHeader}>
                    <div className={style.avatarContainer}>
                        <div className={style.profileAvatar}>{user ? user?.name?.slice(0, 1) : null}</div>  
                        <p>Good afternoon,<br/><span>{user ? user?.name : ' guest'}</span></p>
                        {activeHover ?
                            <div className={style.logout} 
                                onMouseEnter={() => setActiveHover(!activeHover)} 
                                onMouseLeave={() => setActiveHover(!activeHover)}
                                onClick={(e: MouseEvent) =>{logOut(e)}}>
                                    <img src={ExitHover} alt="Exit" /></div>
                            : <div className={style.logout} 
                                    onMouseEnter={() => setActiveHover(!activeHover)}
                                    onMouseLeave={() => setActiveHover(!activeHover)} 
                                    onClick={(e: MouseEvent) =>{logOut(e)}}>
                                        <img src={Exit} alt="Exit" /></div>
                        }
                        
                    </div>
                    <ul className={style.settings}>
                        <a href="#href"><li>My purchases</li></a>
                        <a href="#href"><li>Points piggy bank</li></a>
                        <a href="#href"><li>Payment settings</li></a>
                        <a href="#href"><li>Settings</li></a>
                        <a href="#href"><li>Support</li></a>
                    </ul>
                    <div className={style.total}>Your total:   {total.toFixed(2)}</div>
                    
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
            </div>
        </main>
    )
}

export default Profile;