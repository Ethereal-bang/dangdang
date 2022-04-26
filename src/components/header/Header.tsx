import styles from "./Header.module.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    const [headerAd, setHeaderAd] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/ad/getByPos/header")
            .then(res => {
                const {data} = res;
                setHeaderAd(data.data.list[0].img);
            })
            .catch(console.error)
    }, []);

    return (
        <>
            {/*广告*/}
            <header className={styles.ad}>
                <img alt={"ad"} src={headerAd} />
            </header>
            {/*导航栏*/}
            <section className={styles.section}>
                <div>
                    <span>送至：</span>
                </div>
                <div>
                    <span>
                        欢迎光临当当，请
                        <Link to={"./login"}>登录</Link>
                    </span>
                    <span>成为会员</span>
                    <ul className={styles.ul}>
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
                </div>
            </section>
        </>
    )
}