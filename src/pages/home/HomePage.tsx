import {Header} from "../../components";
import {LogoLine} from "../../components/logoLine/LogoLine";
import React from "react";
import styles from "./HomePage.module.css";

export const HomePage = () => {
    return (
        <>
            <Header/>
            <body className={styles["body"]}>
                <LogoLine/>
            </body>
        </>
    )
}