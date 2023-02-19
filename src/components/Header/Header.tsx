//@ts-ignore
import Profile from "../../img/profile-main.svg";
//@ts-ignore
import Cart from "../../img/ico-cart.svg";
//@ts-ignore
import Search from "../../img/ico-profile1.svg";
//@ts-ignore
import style from "./Header.module.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { routes } from "../../utiles/routes";
import SearchBar from "./SearchBar/SearchBar";
import { useContext}  from "react";
import { IProduct } from "../../utiles/UserContext";
import { FilterContext } from "../../utiles/CatalogueContext";
import { useState } from "react";


const Header: React.FC = () => {
    const navigate = useNavigate();
    const {filteredTitle, setFilteredTitle} = useContext<Array<IProduct> | Array<[]> | any>(FilterContext);
    const [toggleSearch, setToggleSearch] = useState<boolean>(false);

    const setToggle = () => {
        setToggleSearch(true);
    }

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
                {/* <div className={style.icon}><img src={Search} alt="search" /></div> */}
            <div className={style.seacrh} onClick={()=>{setToggleSearch(true)}}>
                {/* <img src={Search} alt="search" /> */}
                   
            <SearchBar toggleS={{toggleSearch}}/>
             {/* {toggleSearch ?
                    <SearchBar toggleS={{toggleSearch}}/>
                : <img src={Search} alt="search" />} */}
                    
                </div> 
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