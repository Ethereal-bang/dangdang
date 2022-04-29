import {useEffect, useState} from "react";
import axios from "axios";
import styles from "./Footer.module.css";
import {Ad} from "../books/Books";
import list from "../../data/footerList.json";

const list2 = [
    "公司简介",
    "诚聘英才",
    "网站联盟",
    "当当招商",
    "机构销售",
    "手机当当",
    "官方Blog",
    "知识产权",
];

export const Footer = () => {
    const [ads, setAds] = useState<Ad>();

    useEffect(() => {
        axios.get("http://localhost:3001/ad/getByPos/footer")
            .then(res => {
                // console.log(res.data.data.list)
                setAds(res.data.data.list[0]);
            })
    }, [])

    return <>
        <section className={styles["ad_bar"]}>
            <div className={styles["ad"]}>
                <a title={ads?.name} href={ads?.link}> </a>
                <a title={ads?.name} href={ads?.link}> </a>
                <a title={ads?.name} href={ads?.link}> </a>
            </div>
        </section>
        <ul className={styles["container"]}>
            {list.map((item, index) => (
                <li className={styles["box"]} key={index}>
                    {/*小标题*/}
                    {item.title}
                    <ul>
                        {item.items.map((item2, index2) => (
                            <li className={styles["item_li"]} key={index2}>{item2}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
        <section className={styles["firm"]}>
            <ul className={styles["firm_list"]}>
                {list2.map((item, index) => (
                    <li key={index}>
                        {item}
                        {(index !== list2.length - 1) ? (
                            <span className={styles["seq"]}>|</span>
                        ) : (<></>)}
                    </li>
                ))}
            </ul>
            <div className={styles["copy"]}>Copyright  2004 - 2021 当当网. All Rights Reserved</div>
        </section>
    </>
}