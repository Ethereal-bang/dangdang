import styles from "./Carousel.module.css";
import {useEffect, useState} from "react";
import axios from "axios";

const bannerData = [
    {
        key: 1,
        img: "http://img60.ddimg.cn/2022/4/6/2022040611195775830.jpg",
        list: [
            {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118184495455.jpg",
            }, {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118520769069.jpg",
            }, {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118184495455.jpg",
            }, {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118520769069.jpg",
            }
        ]
    },
    {
        key: 2,
        img: "http://img63.ddimg.cn/2022/4/8/2022040817124594394.jpg",
        list: [
            {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118184495455.jpg",
            }, {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118520769069.jpg",
            }, {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118184495455.jpg",
            }, {
                img: "http://img63.ddimg.cn/2022/4/11/2022041118520769069.jpg",
            }
        ]
    },
    {
        key: 3,
        img: "http://img60.ddimg.cn/2022/4/8/2022040817103038830.jpg",
    }
]

interface Banner {
    img: string,
    link: string,
}

export const Carousel = () => {
    const [cur, setCur] = useState<number>(0);
    const initBanner = {img: "", link: ""};
    const [banners, setBanners] = useState<[Banner]>([initBanner]);
    // 前四张为一组
    const [bannersBottom1, setBannersBottom1] = useState<[Banner]>([initBanner]);
    // 后四张
    const [bannersBottom2, setBannersBottom2] = useState<[Banner]>([initBanner]);

    useEffect(() => {
        // carousel 大图
        axios.get("http://localhost:3001/ad/getByPos/carousel1")
            .then(res => {
                setBanners(res.data.data.list)
            })

        // carousel 底部栏
        axios.get("http://localhost:3001/ad/getByPos/carousel2")
            .then(res => {
                setBannersBottom1(res.data.data.list.slice(4));
                setBannersBottom2(res.data.data.list.slice(4, 8));
            })

    }, []);

    // 设置定时器 更换cur
    useEffect(() => {
        const interval = setInterval((() => {
            // if (cur >= bannerData.length - 1) {
            //     setCur(0)
            // } else {
            //     setCur(1 + cur)
            // }
            // 用上面的方法则不能更新,由于闭包获得的cur永远是0
            setCur(cur => {
                if (cur >= banners.length - 1) {
                    return 0;
                }
                return ++cur;
            })
        }), 3000);
        return () => clearInterval(interval);
    }, [banners.length, cur])

    function turnPage(e: any): void {
        if (e.target.innerText === "Left") {
            if (cur === 0) {
                setCur(banners.length - 1);
            } else {
                setCur(cur - 1);
            }
        } else if (e.target.innerText === "Right") {
            if (cur === banners.length - 1) {
                setCur(0);
            } else {
                setCur(cur + 1);
            }
        } else {    // 精准翻页
            setCur(e.target.innerText - 1)    // cur改变触发effect
        }
    }

    return (
        <section className={styles["carousel"]}>
            <section className={styles["carousel_top"]}>
                {/*图片*/}
                <div>
                    <img src={banners[cur].img} alt={"ad"}/>
                </div>
                {/*页码*/}
                <ul className={styles["page"]}>
                    {banners.map((item, index) => {
                        return <li style={(index === cur) ? {backgroundColor: "#ff2832"} : {}} key={index}
                                   onMouseEnter={turnPage}>{index + 1}</li>
                    })}
                </ul>
                {/*翻页按钮*/}
                <div className={styles["turnBtn"]} onClick={turnPage}>Left</div>
                <div className={styles["turnBtn"]} onClick={turnPage}>Right</div>
            </section>
            {/*底部广告栏*/}
            <ul className={styles["carousel_bottom"]}>
                {bannersBottom1.map((item, index) => (
                    <li key={index}>
                        <a href={item.link}>
                            <img src={item.img} alt={"ad"} />
                        </a>
                    </li>
                ))}

            </ul>
        </section>
    )
}