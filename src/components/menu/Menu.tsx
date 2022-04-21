import styles from "./Menu.module.css";
import menuData from "../../data/menu.json";
import {Carousel} from "../carousel/Carousel";
import {useEffect, useState} from "react";

const menuItem = ["图书", "电子书", "童装童鞋", "女装", "食品", "母婴玩具",];
const noticeBar = [
    [{
        title: "阅读流行色 图书5折封顶",
        href: "./",
    }, {
        title: "三只松鼠大牌日零食满300减200",
        href: "./",
    }, {
        title: "精选童书5折封顶",
        href: "./",
    }, {
        title: "中小学用书，每满100减50",
        href: "./",
    }, {
        title: "迪士尼宝宝春夏装2件2.8折 叠50元券",
        href: "./",
    }],
    [{
        title: "阅读流行色 图书5折封顶",
        href: "./",
    }, {
        title: "三只松鼠大牌日零食满300减200",
        href: "./",
    }, {
        title: "精选童书5折封顶",
        href: "./",
    }, {
        title: "中小学用书，每满100减50",
        href: "./",
    }],
]

export const Menu = () => {
    const [curGenre, setCurGenre] = useState(-1);   // -1为了不与面板index匹配
    const [curTab, setCurTab] = useState<0 | 1>(0);

    return (
        <>
            {/*头部导航栏*/}
            <ul className={styles["menu_header"]}>
                <li className={styles["menu_item"] + " " + styles["genre_menu"]}>
                    <a href="./">全部商品分类</a>
                </li>
                {menuItem.map((item, index) => {
                    return (
                        <li className={styles["menu_item"]} key={index}>
                            <a href="./">{item}</a>
                        </li>
                    )
                })}
            </ul>
            {/*背景广告*/}
            <div/>
            {/*详细导航版*/}
            <section className={styles["menu"]}>
                {/*垂直导航栏*/}
                <ul className={styles["sub_menu"]}>
                    {menuData.map((item, index) => (
                        <li
                            className={styles["menu_title"]}
                            key={index}
                            onMouseLeave={() => setCurGenre(-1)}
                            onMouseEnter={() => setCurGenre(index)}
                        >
                            {item.menu_title}
                        </li>
                    ))}
                </ul>
                {/*展开面板*/}
                {menuData.map((item, index) => (
                    /*对应每一个详情面板*/
                    <ul style={(curGenre === index) ? {zIndex: "2"} : {zIndex: "-1"}} className={styles["menu_detail"]}
                        key={index}>
                        <li>{item.link}</li>
                        <li>{item.rank}</li>
                        {item.list?.map((item2, index2) => (
                            <li key={index2} className={styles["genre_detail_item"]}>
                                <h5>{item2.title}</h5>
                                <ul>
                                    <li>{item2.items}</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                ))}
                {/*轮播图*/}
                <Carousel/>
                {/*右部公告栏*/}
                <section className={styles["right"]}>
                    <a href={"./"}>
                        <img alt={"ad"}
                             src={"http://img62.ddimg.cn/upload_img/00838/cxtc/202x195_0411-1649659867.jpg"}/>
                    </a>
                    <div className={styles["board"]}>
                        <header>
                            <span
                                style={(curTab === 0) ? {background: "#fff"} : {background: "#f0f0f0"}}
                                onMouseEnter={() => setCurTab(0)}
                            >信息公告</span>
                            <span
                                style={(curTab === 1) ? {background: "#fff"} : {background: "#f0f0f0"}}
                                onMouseEnter={() => setCurTab(1)}
                            >服务公告</span>
                        </header>
                        <ul>
                            {noticeBar[curTab].map((item, index) => (
                                <li className={styles["notice_li"]}>
                                    <a href={item.href}>{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </section>
        </>
    )
}