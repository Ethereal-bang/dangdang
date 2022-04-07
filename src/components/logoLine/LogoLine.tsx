import styles from "./LogoLine.module.css";

export const LogoLine = () => {
    return (
        <div className={styles["logoLine"]}>
            {/*logo*/}
            <img alt={"dang logo"} src={"http://img62.ddimg.cn/upload_img/00444/tupian/PClogo-1648893484.gif"} />
            {/*Search*/}
            <section className={styles["section"]}>
                {/*Input*/}
                <section className={styles["search_box"]}>
                    <div>
                        <input placeholder={"白茶新书"}/>
                        <span>全部分类</span>
                    </div>
                    <input type={"button"} />
                </section>
                <div>热搜：</div>
            </section>
            {/*Cart、Order*/}
            <section className={styles["cart"]}>
                <div>
                    <a href={"./"}>购物车 0</a>
                </div>
                <a href={"./"}>我的订单</a>
            </section>
        </div>
    )
}