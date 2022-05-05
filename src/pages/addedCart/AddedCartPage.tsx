import styles from "./AddedCartPage.module.css";
import {menuItem} from "../goods";
import {Link, useLocation} from "react-router-dom";
import React from "react";
import {Header} from "../../components";

interface LocationState {
    name: string,
    num: number,
}

export const AddedCartPage = () => {
    const state = useLocation().state as LocationState;

    return <>
        <Header />

        <section className={styles["body"]}>
            <section className={styles["left"]}>
                <h1>商品已成功添加至购物车！</h1>
                <div>
                    <a href={"#!"}>{state.name}</a>
                    <span>x{state.num}</span>
                </div>
            </section>
            <section className={styles["right"]}>
                <Link to={"/shoppingCart"}>去购物车结算</Link>
                <a href={"#!"}>继续购物</a>
            </section>
        </section>
    </>
}