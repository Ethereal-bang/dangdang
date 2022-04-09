import {Header} from "../../components";
import {LogoLine, Menu} from "../../components";
import React from "react";
import styles from "./HomePage.module.css";

export const HomePage = () => {
    return (
        <>
            <Header/>
            <section className={styles["body"]}>
                <LogoLine/>
                <Menu />
            </section>
        </>
    )
}