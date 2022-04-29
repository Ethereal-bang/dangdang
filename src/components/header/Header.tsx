import styles from "./Header.module.css";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {LogoLine} from "../logoLine/LogoLine";

interface HeaderProps {
    signFlag: boolean,
}

export const Header = (props: HeaderProps) => {
    const {signFlag} = props;
    const location = useLocation();

    return (
        <>
            {/*导航栏*/}
            <section className={styles.section}>
                <div>
                    <span>送至：</span>
                </div>
                <div>
                    {(signFlag) ? (
                        <div>
                            {/*@ts-ignore*/}
                            <span>Hi，{location.state.username}</span>
                            <span>[退出]</span>
                        </div>
                    ) : (
                        <div>
                            <span>
                                欢迎光临当当，请
                                <Link to={"./login"}>登录</Link>
                            </span>
                            <span>成为会员</span>
                        </div>
                    )}
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
            <section className={styles["body"]}>
                <LogoLine/>
            </section>
            </>
    )
}