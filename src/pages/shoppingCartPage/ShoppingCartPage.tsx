import styles from "./ShoppingCartPage.module.css";
import {Link, useLocation} from "react-router-dom";
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

interface CartInfo {
    price: number,
    num: number,
    discount?: number,
}

interface CartGoods extends Goods {
    num: number,
}

const initCartInfo: CartInfo = {
    price: 0,
    num: 0,
    discount: 0,
}

export const ShoppingCartPage = () => {
    const [bar, setBar] = useState<Ad>();
    const [curProcedure, setCurProcedure] = useState<number>(0);
    const [shoppingMapList, setShoppingMapList] = useState<Map<string, CartGoods>>();
    const [total, setTotal] = useState<CartInfo>(initCartInfo);
    const [cur, setCur] = useState<CartInfo>(initCartInfo);

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
        const shoppingCartID = localStorage.getItem("shoppingCartId") || "627145752276a450b5ca7a50";
        const url = `http://localhost:3001/shoppingCart/${shoppingCartID}/show`;
        // 2.请求购物车
        axios.get(url)
            .then(ret => {
                console.log(ret.data)
                const {data} = ret.data;
                const shoppingListMap = new Map<string, CartGoods>();
                data.goodsList.forEach((item: Goods) => {
                    if (shoppingListMap.has(item._id)) {    // 商品已存在该列表，数目加一
                        const cur = shoppingListMap.get(item._id) as CartGoods;
                        cur.num++;
                        shoppingListMap.set(item._id, cur);
                    } else {    // 不存在与列表，加入
                        item.num = 1;
                        shoppingListMap.set(item._id, item);
                    }
                })
                setShoppingMapList(shoppingListMap);
                setTotal({
                    price: data.price,
                    num: data.count,
                })
            })
    }, []);

    return <>
        {/*导航栏*/}
        <header className={styles["header"]}>
            <div>
                <span>Hi，{localStorage.getItem("tel")}</span>
                <a onClick={localStorage.clear} href={"#!"} >[退出]</a>
            </div>
            <ul>
                <li>
                    <Link to={"/shoppingCart"} className={styles.cart}>
                        购物车
                    </Link>
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
            <Link to={"/"}>
                <img alt={"logo"} src={"http://shopping.dangdang.com/shoppingcart/images/dd_logo.jpg?v=20220225"}/>
            </Link>
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
            <div className={styles["list"]}>
                <p>
                    <i className={styles["check"]}>√</i>   {/*勾选框*/}
                    当当自营
                </p>
                <table>
                    {shoppingMapList && Array.from(shoppingMapList).map(item => (
                        <tr key={item[0]}>
                            <td width={46} align={"center"}>
                                <i className={styles["check"]}>√</i>   {/*勾选框*/}
                            </td>
                            <td width={120} className={styles["col_img"]}>
                                <img src={item[1].img} alt={"book cover"} />
                            </td>
                            <td width={240} valign={"top"} className={styles["col_name"]}>
                                <a href={"#!"}>{item[1].name}</a>
                            </td>
                            <td width={140}>
                                {item[1].price_now}
                            </td>
                            <td width={170} className={styles["col_num"]}>
                                <button>-</button>
                                <input
                                    value={1}
                                    type={"text"}
                                    onChange={(e) => (console.log(e))}
                                />
                                <button>+</button>
                            </td>
                            <td width={80}>
                                {item[1].price_now}
                            </td>
                            <td align={"right"}>
                                <a href={"#!"}>移入收藏</a>
                                <a href={"#!"}>删除</a>
                            </td>
                        </tr>
                    ))}
                </table>
                <div className={styles["shop_sum"]}>
                    <b>店铺合计</b>
                    <span>￥#</span>
                </div>
            </div>
        </section>

        {/*结算栏*/}
        <section className={styles["sum_bar"]}>
            <div>   {/*背景条*/}
                <section className={styles["bar_left"]}>
                    <div>
                        <i className={styles["check"]}>√</i>   {/*勾选框*/}
                        全选
                    </div>
                    <a href={"#!"}>批量删除</a>
                    <b>
                        已选择
                        <span>#</span>
                        件商品
                    </b>
                </section>
                <section className={styles["bar_right"]}>
                    <div>
                        <p>
                            总计(不含运费)：
                            <span>{cur.price}</span>
                        </p>
                        <p>
                            已节省：
                            <span>{cur.discount}</span>
                        </p>
                    </div>
                    <a href={"#!"}>结算</a>
                </section>
            </div>
        </section>
    </>
}