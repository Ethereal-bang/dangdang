import {Header, Menu, ClockBuy, Books, Footer, LogoLine,} from "../../components";
import React, {useEffect, useState} from "react";
import styles from "./HomePage.module.css";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

export const HomePage = () => {
    const [headerAd, setHeaderAd] = useState("");
    const location = useLocation();
    const [signFlag, setSignFlag] = useState<boolean>(false);

    useEffect(() => {
        axios.get("http://localhost:3001/ad/getByPos/header")
            .then(res => {
                const {data} = res;
                setHeaderAd(data.data.list[0].img);
            })
            .catch(console.error)
    }, []);

    useEffect(() => {
        // console.log(location)
        // @ts-ignore
        if (location.state?.username) {
            setSignFlag(true);
        }
    }, [location]);
    
    return (
        <>
            {/*广告*/}
            <Link to={"/"} className={styles["ad"]}>
                <img alt={"ad"} src={headerAd}/>
            </Link>
            <Header />

            <section className={styles["body"]}>
                <LogoLine />
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