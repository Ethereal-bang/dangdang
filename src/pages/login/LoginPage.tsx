import styles from "./Login.module.css";

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
            <form>
                <header>
                    <h3>
                        <a href={"./"}>密码登录</a>
                        <span>|</span>
                        <a href={"./"}>验证码登录</a>
                    </h3>
                </header>
                <section className={styles["login"]}>
                    <div>
                        <label>手机号/昵称/邮箱</label>
                        <input autoFocus />
                    </div>
                    <div>
                        <label>密码</label>
                        <input />
                    </div>
                </section>
                <div className={styles["agree"]}>
                    登录即同意
                    <a href={"https://help.dangdang.com/details/page254"}> 用户协议、</a>
                    <a href={"https://help.dangdang.com/details/page254"}>隐私政策</a>
                </div>
            </form>
        </section>
    </>
}