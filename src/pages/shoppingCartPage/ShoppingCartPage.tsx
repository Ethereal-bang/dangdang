import styles from "./ShoppingCartPage.module.css";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Ad, Header} from "../../components";
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

interface CartGoods extends Goods { // 同种商品
    num: number,
}

interface CartInfo {    // 购物车信息
    price: number,
    num: number,
    discount: number,
    checkedList: boolean[],
    allChecked: boolean,   // 全选
}

const initCartInfo: CartInfo = {
    price: 0,
    num: 0,
    discount: 0,
    checkedList: [],
    allChecked: true,
}

export const ShoppingCartPage = () => {
    const [bar, setBar] = useState<Ad>();   // 广告栏
    const [curProcedure, setCurProcedure] = useState<number>(0);    // 付款进度
    const [shoppingMapList, setShoppingMapList] = useState<Map<string, CartGoods>>();   // map(id, Goods)
    const [cart, setCart] = useState<CartInfo>(initCartInfo);
    const [totalPrice, setTotalPrice] = useState<number>(0);

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
                const {data} = ret.data;
                // 1.存储状态——商品列表shoppingMapList
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
                // 2.存储状态——购物车信息cart：总价、商品数、勾选列表（默认全部
                let tmp: boolean[] = [];
                for (let i = 0; i < shoppingListMap.size; i++) {
                    tmp[i] = true;
                }
                setCart((cart) => {
                    return {
                        ...cart,    // discount、allChecked
                        price: data.price,
                        num: data.count,
                        checkedList: tmp,
                    }
                })
                // 3.存储状态——总价（便于全选时更新
                setTotalPrice(data.price);
            })
    }, []);

    function checkGoods(e: React.MouseEvent<HTMLElement>): void {
        const index = parseInt(e.currentTarget.dataset.index as string);
        let targetPrice = parseInt(e.currentTarget.dataset.price as string);  // 断言是为了声明不会为undefined
        setCart((cart) => {
            let {checkedList, price} = cart;
            // 1.更新价格
            if (checkedList[index]) {   // 本已勾上，即取消选中
                price -= targetPrice;
            } else {
                price += targetPrice;
            }
            // 2.更新勾选列表——checkedList
            checkedList = [
                ...checkedList.slice(0, index),
                !checkedList[index],
                ...checkedList.slice(index + 1),
            ];
            // 3.监测是否达到全选——allChecked
            let flag = true;    // true为全选
            for (let boo of checkedList) {
                if (!boo) {
                    flag = false;
                    break;
                }
            }

            return {
                ...cart,
                price,
                checkedList,
                allChecked: flag,
            };
        })
    }

    function checkAll(e: React.MouseEvent): void {
        setCart(cart => {
            // 已全选
            if (cart.allChecked) {
                return {
                    price: 0,
                    num: 0,
                    discount: 0,
                    checkedList: cart.checkedList.map(boo => false),
                    allChecked: false,
                }
            }
            // 未全选
            return {
                ...cart,
                num: cart.checkedList.length,
                allChecked: true,
                price: totalPrice,
                checkedList: cart.checkedList.map(boo => true),
            }
        })
    }

    return <>
        {/*导航栏*/}
        <header className={styles["header"]}>
            <Header />
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
                    <i
                        onClick={checkAll}
                        className={cart.allChecked ? styles["checked"] : styles["check"]}
                    >√</i>   {/*勾选框*/}
                    全选
                </li>
                {title.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            {/*购物车列表*/}
            <div className={styles["list"]}>
                <p>
                    <i
                        onClick={checkAll}
                        className={cart.allChecked ? styles["checked"] : styles["check"]}
                    >√</i>   {/*勾选框*/}
                    当当自营
                </p>
                <table>
                    <tbody>
                    {shoppingMapList && Array.from(shoppingMapList).map((item, index) => (
                        /*每个商品占一行*/
                        <tr key={index}>
                            <td width={46} align={"center"}>
                                <i
                                    data-index={index}
                                    data-price={item[1].price_now}
                                    onClick={checkGoods}
                                    className={
                                    cart.checkedList[index]
                                        ? styles["checked"]
                                        : styles["check"]
                                }>√</i>   {/*勾选框*/}
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
                    </tbody>
                </table>
                <div className={styles["shop_sum"]}>
                    <b>店铺合计</b>
                    <span>￥{cart.price}</span>
                </div>
            </div>
        </section>

        {/*结算栏*/}
        <section className={styles["sum_bar"]}>
            <div>   {/*背景条*/}
                <section className={styles["bar_left"]}>
                    <div>
                        <i
                            onClick={checkAll}
                            className={cart.allChecked ? styles["checked"] : styles["check"]}>√</i>   {/*勾选框*/}
                        全选
                    </div>
                    <a href={"#!"}>批量删除</a>
                    <b>
                        已选择
                        <span>{cart.num}</span>
                        件商品
                    </b>
                </section>
                <section className={styles["bar_right"]}>
                    <div>
                        <p>
                            总计(不含运费)：
                            <span>￥{cart.price}</span>
                        </p>
                        <p>
                            已节省：
                            <span>￥{cart.discount}</span>
                        </p>
                    </div>
                    <a href={"#!"}>结算</a>
                </section>
            </div>
        </section>
    </>
}