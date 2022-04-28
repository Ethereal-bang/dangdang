import {Header, LogoLine, Menu, ClockBuy, Books, Footer,} from "../../components";
import React, {useEffect, useState} from "react";
import styles from "./HomePage.module.css";
import {useLocation} from "react-router-dom";

export const HomePage = () => {
    const location = useLocation();
    const [signFlag, setSignFlag] = useState<boolean>(false);
    
    useEffect(() => {
        console.log(location)
        // @ts-ignore
        if (location.state?.username) {
            setSignFlag(true);
        }
    }, [location]);
    
    return (
        <>
            <Header signFlag={signFlag} />
            <section className={styles["body"]}>
                <LogoLine/>
                <Menu />
                <div className={styles["placeholder"]} />    {/*占位*/}
                <ClockBuy />
                <Books />
            </section>
            <div className={styles["placeholder"]} />    {/*占位*/}
            <Footer />
        </>
    )
}