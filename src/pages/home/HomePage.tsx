import {Header, LogoLine, Menu, ClockBuy,} from "../../components";
import React from "react";
import styles from "./HomePage.module.css";

export const HomePage = () => {
    return (
        <>
            <Header/>
            <section className={styles["body"]}>
                <LogoLine/>
                <Menu />
                <div className={styles["placeholder"]} />    {/*占位*/}
                <ClockBuy />
            </section>
        </>
    )
}