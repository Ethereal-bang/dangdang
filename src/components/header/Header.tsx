import styles from "./Header.module.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import headerTitle from "../../data/headerTitle.json";

const initHoverState = [false, false, false, false, false, false];

export const Header = () => {
    const [hoverState, setHoverState] = useState<boolean[]>(initHoverState);  // 悬浮菜单显示状态

    function changeHoverState(e: any, flag: boolean, index: number) {
        setHoverState((hoverState) => [
            ...hoverState.slice(0, index),
            flag,
            ...hoverState.slice(index + 1)
        ]);
    }

    return (
        <>
            {/*导航栏*/}
            <section className={styles.section}>
                <div>
                    <span>送至：</span>
                </div>
                <div>
                    {localStorage.getItem("tel") ? (
                        <div>
                            <span>Hi，{localStorage.getItem("tel")}</span>
                            <a onClick={() => localStorage.clear()} href={"/"}>[退出]</a>
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
                            <Link to={"/shoppingCart"} className={styles.cart}>
                                购物车
                            </Link>
                        </li>
                        {headerTitle.map((item, index) => (
                            item.expand ? (
                                <li
                                    className={styles["expand_li"]}
                                    key={index}>
                                    <Link
                                        to={item.url}
                                        onMouseEnter={e => changeHoverState(e, true, index)}
                                        onMouseLeave={e => changeHoverState(e, false, index)}
                                    >{item.name}</Link>
                                    <ul style={hoverState[index] ? {display: "block"} : {display: "none"}}>
                                        {item.expand.map((item2, index2) => (
                                            <li key={index2}>
                                                <Link to={item2.url}>
                                                    {item2.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <li key={index}>
                                    <Link to={item.url}>{item.name}</Link>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}