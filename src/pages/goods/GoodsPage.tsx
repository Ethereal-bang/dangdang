import {Header} from "../../components";
import styles from "./GoodsPage.module.css";
import menuData from "../../data/menu.json";
import {useState} from "react";

const menuItem = ["图书", "电子书", "童装童鞋", "女装", "食品", "母婴玩具",];

export const GoodsPage = () => {
    const [curGenre, setCurGenre] = useState(-1);   // -1为了不与面板index匹配

    return <>
        <Header signFlag={false} />

        <section className={styles["body"]}>
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
            </section>
        </section>

    </>
}