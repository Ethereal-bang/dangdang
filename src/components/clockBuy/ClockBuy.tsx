import styles from "./ClockBuy.module.css";

const timeOrder = ["00:00场", "08:00场", "12:00场", "16:00场", "20:00场",];

export const ClockBuy = () => {
    return (
        <>
            <header className={styles["header"]}>
                {/*抢购*/}
                <a href={"./"} className={styles["rush_buy"]}>
                    <img alt={"抢购"} src={"http://img62.ddimg.cn/upload_img/00782/home/home_miaosha_title-1561107108.png"} />
                </a>
                {/*时钟*/}
                <span className={styles["clock"]}>
                    <div>11</div>
                    <div>22</div>
                    <div>33</div>
                </span>
                {/*场次*/}
                <ul className={styles["time_order"]}>
                    {timeOrder.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                {/*厂商周*/}
                <span className={styles["week"]}>厂商周</span>
            </header>
        </>
    )
}