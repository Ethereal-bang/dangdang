import styles from "./ShoppingCartPage.module.css";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Ad} from "../../components";
import axios from "axios";

const procedure = ["我的购物车", "填写订单", "完成订单"];
const title = ["商品信息", "单价（元）", "数量", "金额（元）", "操作"];

interface Goods {
    name: string,
    img: string,
    price_now: number,
    _id: string,
    num: number,    // 数目
}

export const ShoppingCartPage = () => {
    const location = useLocation();
    const [bar, setBar] = useState<Ad>();
    const [curProcedure, setCurProcedure] = useState<number>(0);
    const [shoppingList, setShoppingList] = useState<Goods[]>();

    // 请求广告栏图片
    useEffect(() => {
        axios.get("http://localhost:3001/ad/getByPos/goods_bar")
            .then(res => {
                setBar(res.data.data.list[0])
            })
    }, [])

    // 请求购物车
    useEffect(() => {
        // 1.获取当前用户购物车ID
        const shoppingCartID = localStorage.getItem("shoppingCartId") || "626e7d612c2711dc4cf93fe6";
        const url = `http://localhost:3001/shoppingCart/${shoppingCartID}/show`;
        axios.get(url)
            .then(ret => {
                console.log(ret.data.data)
            })
    }, []);

    return <>
        {/*导航栏*/}
        <header className={styles["header"]}>
            <div>
                {/*@ts-ignore*/}
                <span>Hi，{15086861179 || location.state.username}</span>
                <span>[退出]</span>
            </div>
            <ul>
                <li>
                    <a href={"./"} className={styles.cart}>
                        购物车
                    </a>
                </li>
                <li>
                    <a href={"./"}>
                        我的订单
                    </a>
                </li>
                <li>
                            <span>
                                我的云书房
                            </span>
                </li>
                <li>
                            <span>
                                我的当当
                            </span>
                </li>
                <li>
                            <span>
                                当当拼团
                            </span>
                </li>
                <li>
                            <span>
                                企业采购
                            </span>
                </li>
                <li>
                            <span>
                                小说投稿
                            </span>
                </li>
                <li>
                            <span>
                                客户服务
                            </span>
                </li>
                <li>
                            <span>
                                切换无障碍
                            </span>
                </li>
            </ul>
        </header>

        {/*广告条*/}
        <a className={styles["ad"]} href={bar?.link}>
            <img src={bar?.img} alt={"ad"} />
        </a>

        {/*标题*/}
        <section className={styles["title"]}>
            <a href={"#!"}>
                <img alt={"logo"} src={"http://shopping.dangdang.com/shoppingcart/images/dd_logo.jpg?v=20220225"}/>
            </a>
            <div className={styles["procedure"]}>
                {procedure.map((item, index) => (
                    <span
                        key={index}
                        className={(index === curProcedure) ? styles["curProcedure"] : ""}
                    >
                    {item}
                </span>
                ))}
            </div>
        </section>
        <div className={styles["line"]} />

        <section className={styles["body"]}>
            {/*配送地址*/}
            <section className={styles["address"]}>
                <i>&nbsp;</i>
                配送地址：
                <div>
                    <span>重庆市南岸区崇文路2号</span>
                    <div /> {/*选择具体*/}
                </div>
            </section>
            {/*表头*/}
            <ul className={styles["list_header"]}>
                <li>
                    <i className={styles["check"]}>√</i>   {/*勾选框*/}
                    全选
                </li>
                {title.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            {/*购物车列表*/}

        </section>
    </>
}