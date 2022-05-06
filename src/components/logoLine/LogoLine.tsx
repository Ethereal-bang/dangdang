import styles from "./LogoLine.module.css";
import {Link} from "react-router-dom";

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
                        <span>
                            全部分类
                            <i />
                        </span>
                    </div>
                    <button />
                </section>
                <div>热搜：</div>
            </section>
            {/*Cart、Order*/}
            <section className={styles["cart"]}>
                <div>
                    <Link to={"/shoppingCart"}>购物车 0</Link>
                </div>
                <a href={"./"}>我的订单</a>
            </section>
        </div>
    )
}