//@ts-ignore
import style from "./Footer.module.css";
//@ts-ignore
import Arrow from "../../img/arrow2.svg";

const Footer: React.FC = () => {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
            <div className={style.footerBlock}>
                <ul>
                    <li className={style.footerTitle}>Catalog</li>
                    <li>Living room</li>
                    <li>Bedroom</li>
                    <li>Wardrobe</li>
                    <li>Hallway</li>
                    <li>Playroom</li>
                </ul>
            </div>

            <div className={style.footerBlock}>
                <ul>
                    <li className={style.footerTitle}>Information</li>
                    <li>For investors</li>
                    <li>Support</li>
                    <li>Politics privacy</li>
                    <li>Hallway</li>
                    <li>Cookie settings</li>
                </ul>
            </div>

            <div className={style.footerBlock}>
                <ul>
                    <li className={style.footerTitle}>Service</li>
                    <li>Profile</li>
                    <li>Favorites</li>
                    <li>Cart</li>
                    <li>Hallway</li>
                    <li>Shipping and payment</li>
                </ul>
            </div>

            <div className={style.footerBlock}>
                <ul>
                    <li className={style.footerTitle}>Become a member</li>
                    <p>Join our loyalty program now and get 10% off your next online purchase!</p>
                    <a href="">Read more
                        <img src={Arrow} alt="arrow" />
                    </a>
                    
                </ul>
            </div>
            </div>
        </footer>
    )
}

export default Footer;