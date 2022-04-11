import styles from "./Carousel.module.css";
import {useEffect, useState} from "react";

const bannerData = [
    {
        key: 1,
        img: "http://img60.ddimg.cn/2022/4/6/2022040611195775830.jpg",
    },
    {
        key: 2,
        img: "http://img63.ddimg.cn/2022/4/8/2022040817124594394.jpg",
    },
    {
        key: 3,
        img: "http://img60.ddimg.cn/2022/4/8/2022040817103038830.jpg",
    }
]

export const Carousel = () => {
    const [cur, setCur] = useState<number>(0);
    // const timer = useRef(); // 保存setInterval的ID

    useEffect(() => {
        // 已存在，清除定时器
        // if (timer.current) {
        //     clearInterval(timer.current);
        // }

        // @ts-ignore
        const interval = setInterval((() => {
            // if (cur >= bannerData.length - 1) {
            //     setCur(0)
            // } else {
            //     setCur(1 + cur)
            // }
            // 用上面的方法则不能更新,由于闭包获得的cur永远是0
            setCur(cur => {
                if (cur >= bannerData.length - 1) {
                    return 0;
                }
                return ++cur;
            })
        }), 3000);
        return () => clearInterval(interval);
    }, [])

    return (
        <section className={styles["carousel"]}>
            <div>
                <img src={bannerData[cur].img} alt={"ad"}/>
            </div>
            <ul className={styles["page"]}>
                {bannerData.map(item => {
                    return <li key={item.key}>{item.key}</li>
                })}
            </ul>
        </section>
    )
}