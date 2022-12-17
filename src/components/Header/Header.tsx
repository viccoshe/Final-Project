//@ts-ignore
import Profile from "../../img/Group.png";
//@ts-ignore
import Cart from "../../img/ico-cart.svg";
//@ts-ignore
import Search from "../../img/ico-profile1.svg";
//@ts-ignore
import style from "./Header.module.css";
import { Route, Routes, Link } from "react-router-dom";
import { routes } from "../../utiles/routes";


const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <ul>
                    <Link to={routes.home}><li>Home</li></Link>
                    <Link to={routes.catalogue}><li>Catalogue</li></Link>
                    <Link to={routes.services}><li>Favourites</li></Link>

                </ul>
            </nav>
            <div className={style.header_buttons}>
                <div className={style.icon}><img src={Search} alt="search" /></div>
                
                <div className={style.icon}>
                    <Link to={routes.cart}><img src={Cart} alt="cart" /></Link>    
                </div>
                
                <div className={style.icon}>
                    <Link to={routes.profile}><img src={Profile} alt="profile" /></Link>    
                </div>
                
            </div>
        </header>
    )
}

export default Header;