//@ts-ignore
import style from "./Profile.module.css";
//@ts-ignore
import Exit from "../../img/exit.svg";

const Profile: React.FC = () => {
    return (
        <main className={style.main}>
            <div className={style.profileContainer}>
                <div className={style.profileHeader}>
                    <div className={style.profileImg}><img src="" alt="" /></div>
                    <p>Good afternoon,<br/><span>Matvei</span></p>
                    <div className={style.total}>Your total: </div>
                    <div><img src={Exit} alt="" /></div>
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