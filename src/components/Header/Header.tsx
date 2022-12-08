//@ts-ignore
import Profile from "../../img/Group.png";
//@ts-ignore
import Cart from "../../img/ico-cart.svg";
//@ts-ignore
import Search from "../../img/ico-profile1.svg";
//@ts-ignore
import style from "./Header.module.css";


const Header: React.FC = () => {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <ul>
                    <li>Main</li>
                    <li>Catalogue</li>
                    <li>Service</li>
                </ul>
            </nav>
            <div className={style.header_buttons}>
                <div className={style.icon}><img src={Search} alt="" /></div>
                <div className={style.icon}><img src={Cart} alt="" /></div>
                <div className={style.icon}><img src={Profile} alt="" /></div>
            </div>
        </header>
    )
}

export default Header;