import styles from "./Carousel.module.css";
import {useCallback, useEffect, useRef, useState} from "react";

const bannersSrc = [
    "http://img60.ddimg.cn/2022/4/6/2022040611195775830.jpg",
    "http://img63.ddimg.cn/2022/4/8/2022040817124594394.jpg",
]

interface Banner {
    order: number,
    isShow: boolean,
}

// const initBanner: Banner[] = [
//     {
//         order: 0,
//         isShow: true,
//     },
//     {
//         order: 1,
//         isShow: false,
//     },
//     {
//         order: 2,
//         isShow: false,
//     },
// ]
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
// const initOrder = {
//     nowOrder: 0,
//     preOrder: initBanner.length - 1,
// }

export const Carousel = () => {
    const [cur, setCur] = useState<number>(0);
    const timer = useRef(); // 保存setInterval的ID

    const start = useCallback(() => {
        console.log("useCallback")

        // 已存在，清除定时器
        if (timer.current) {
            clearInterval(timer.current);
        }

        // @ts-ignore
        timer.current = setInterval((() => {
            console.log("setInterval")
            setCur(cur => {
                if (cur >= bannerData.length - 1) {
                    return 0;
                }
                return ++cur;
            })
        }), 3000);

    }, []);

    useEffect(() => {
        start();
        return () => clearInterval(timer.current);
    })

    return <div className={styles["banner"]}>
        <img src={bannerData[cur].img} alt={"ad"}/>
    </div>
}