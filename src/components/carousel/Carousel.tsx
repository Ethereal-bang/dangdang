import styles from "./Carousel.module.css";
import {useEffect, useState} from "react";

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

export const Carousel = () => {
    const [cur, setCur] = useState<number>(0);

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
                if (cur >= bannerData.length - 1) {
                    return 0;
                }
                return ++cur;
            })
        }), 3000);
        return () => clearInterval(interval);
    }, [cur])

    function turnPage(e: any) :void  {
        if (e.target.innerText === "Left") {
            if (cur === 0) {
                setCur(bannerData.length - 1);
            } else {
                setCur(cur - 1);
            }
        } else if (e.target.innerText === "Right") {
            if (cur === bannerData.length - 1) {
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
                    <img src={bannerData[cur].img} alt={"ad"}/>
                </div>
                {/*页码*/}
                <ul className={styles["page"]}>
                    {bannerData.map(item => {
                        return <li style={(item.key - 1 === cur) ? {backgroundColor:"#ff2832"} : {}} key={item.key} onMouseEnter={turnPage}>{item.key}</li>
                    })}
                </ul>
                {/*翻页按钮*/}
                <div className={styles["turnBtn"]} onClick={turnPage}>Left</div>
                <div className={styles["turnBtn"]} onClick={turnPage}>Right</div>
            </section>
            <ul className={styles["carousel_bottom"]}>
                {bannerData[cur].list?.map((item, index) => (
                    <li key={index}>
                        <a href={"./"}>
                            <img src={item.img} alt={"ad"} />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}