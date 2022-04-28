import styles from "./Login.module.css";
import {Login} from "../../components";

export const LoginPage = () => {

    return <>
        <header className={styles["header"]}>
            <a href={"localhost://3000"}>
                <img alt={"当当"} src={"https://img62.ddimg.cn/upload_img/00873/web/logo-1628229920.png"} />
            </a>
            <section className={styles["header_right"]}>
                <a href={"./"}>切换无障碍</a>
                <a href={"./"}>
                    <img src={"https://img61.ddimg.cn/upload_img/00862/web/icon-1-1628495800.png"} alt={"icon"} />
                    “登录页面 “改进建议
                </a>
            </section>
        </header>
        <section className={styles["body"]}>
            <div>
                <Login />
                <div className={styles["third"]}>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"微信登录"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"微信登录"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"微信登录"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"微信登录"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"微信登录"} />
                    </a>
                </div>
            </div>
        </section>
    </>
}