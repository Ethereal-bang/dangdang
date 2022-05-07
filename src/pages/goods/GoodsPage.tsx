import {Ad, Header} from "../../components";
import styles from "./GoodsPage.module.css";
import menuData from "../../data/menu.json";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";

export const menuItem = ["图书", "电子书", "童装童鞋", "女装", "食品", "母婴玩具",];

interface BookInfo {
    author: string,
    comments: number,
    description: string,
    genre?: string,
    img: string[],
    name: string,
    price_now: number,
    price_old: number,
    _id: string,
}

export const GoodsPage = () => {
    const [curGenre, setCurGenre] = useState(-1);   // -1为了不与面板index匹配
    const [bar, setBar] = useState<Ad>();
    const location = useLocation();
    const [book, setBook] = useState<BookInfo>();
    const [buyNum, setBuyNum] = useState<number>(1);    // 添加到购物车数量
    const navigate = useNavigate();

    // 请求广告栏图片
    useEffect(() => {
        axios.get("http://localhost:3001/ad/getByPos/goods_bar")
            .then(res => {
                setBar(res.data.data.list[0])
            })
    }, [])

    // 请求商品信息
    useEffect(() => {
        const goodsID = location.pathname.slice(7);
        axios.get(`http://localhost:3001/goods/getById/${goodsID}`)
            .then(res => {
                setBook(res.data.data);
            })
    }, [location])

    // 加入购物车
    function handleCart() {
        const tel = localStorage.getItem("tel") || 111;
        const url = `http://localhost:3001/shoppingCart/${tel}/addGoods`;
        axios.get(url, {
            params: {
                id: book?._id,
                num: buyNum,
            }
        })
            .then(res => {
                navigate("/goods/added", {
                    state: {
                        name: res.data.data.name,
                        num: res.data.data.num,
                    }
                })
            })
    }

    return <>
        <Header />

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

            {/*广告条*/}
            <a href={bar?.link}>
                <img src={bar?.img} alt={"ad"} />
            </a>

            {/*种类*/}
            <p className={styles["genre"]}>
                {book?.genre?.split(">").map((item, index) => {
                    return (index === 0)
                        ? <b key={index}>{item}</b>
                        : <a href={"#!"} key={index}>{" > "} {item}</a>
                })}
            </p>
            {/*商品主要信息*/}
            <section className={styles["info_box"]}>
                {/*图片*/}
                <section className={styles["box_left"]}>
                    <div>
                        <img src={book?.img[0]} alt={"book cover"} />
                    </div>
                    <ul>
                        {book?.img.map((img, index) => (
                            <li key={index}>
                                <img src={img} alt={"cover"} key={index} />
                            </li>
                        ))}
                    </ul>
                </section>
                {/*信息*/}
                <section className={styles["box_mid"]}>
                    <header>
                        <h1>{book?.name}</h1>
                        <h2>{book?.description}</h2>
                    </header>
                    <p>
                        <span>
                            作者:
                            <a href={"#!"}>{book?.author}</a>
                        </span>
                    </p>
                    <p>
                        <span className={styles["star"]}> </span>
                        <a href={"#!"}>{book?.comments}</a>
                        条评论
                    </p>
                    <section className={styles["price_info"]}>
                        <p>
                            <span>抢购价</span>
                            <a href={"/"}>降价通知</a>
                        </p>
                        <p>
                            ￥
                            <span>{book?.price_now}</span>
                            {book?.price_now
                            && book?.price_old
                            && <span>（{Math.floor(10 * book.price_now / book.price_old)}折）</span>}
                        </p>
                        <p>
                            定价
                            <span>￥{book?.price_old}</span>
                        </p>
                    </section>
                    <section className={styles["buy"]}>
                        <div>
                            <input
                                value={buyNum}
                                type={"text"}
                                onChange={(e) => setBuyNum(parseInt(e.target.value))}
                            />
                            <button onClick={() => setBuyNum(buyNum + 1)}>+</button>
                            <button onClick={() => setBuyNum(buyNum - 1)}>-</button>
                        </div>
                        <div onClick={handleCart}>
                            <div />
                            <span>加入购物车</span>
                        </div>
                        <Link to={"#"}>
                            立即购买
                        </Link>
                    </section>
                </section>
                {/*出版社*/}
                <section className={styles["box_right"]}>

                </section>
            </section>
        </section>

    </>
}