import styles from "./ClockBuy.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

const timeOrder = ["00:00场", "08:00场", "12:00场", "16:00场", "20:00场",];

export interface Book {
    img: [string],
    name: string,
    price_now: number,
    price_old: number,
    process: string,    // 已抢购d%
}

interface Ad {
    name: string,
    img: string,
}

export const ClockBuy = () => {
    const [books, setBooks] = useState<[Book]>();
    const [ads1, setAds1] = useState<[Ad]>();
    const [ads2, setAds2] = useState<[Ad]>();

    useEffect(() => {
        axios.get("http://localhost:3001/goods/getByType/clock")
            .then(res => {
                setBooks(res.data.data.list);
            })

        axios.get("http://localhost:3001/ad/getByPos/clock")
            .then(res => {
                setAds1(res.data.data.list.slice(4));
                setAds2(res.data.data.list.slice(4, 8));
            })
    }, [])

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
            {/*图书*/}
            <section className={styles["container"]}>
                {books?.map((bookInfo, index) => (
                    <div key={index} className={styles["bookBox"]}>
                        <a className={styles["img"]} href={"./"} title={bookInfo.name}>
                            <img src={bookInfo.img[0]} alt={"book info"} />
                        </a>
                        <div className={styles["line"]}>
                            <span/>
                            <div className={styles["process"]}>{bookInfo.process}</div>
                        </div>
                        <a className={styles["name"]} href={"./"} title={bookInfo.name}>{bookInfo.name}</a>
                        <div className={styles["price"]}>
                            ￥
                            <span>{bookInfo.price_now}</span>
                            <span>{bookInfo.price_old}</span>
                        </div>
                    </div>
                ))}
            </section>
            {/*广告*/}
            <ul className={styles["ad"]}>
                {ads1?.map((ad, index) => (
                    <li key={index}>
                        <a href={"./"} title={ad.name}>
                            <img src={ad.img} alt={ad.name}/>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}