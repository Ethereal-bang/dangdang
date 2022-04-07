import styles from "./Header.module.css";

export const Header = () => {
    return (
        <>
            {/*广告*/}
            <header className={styles.ad}>
                <img alt={"ad"} src={"http://img61.ddimg.cn/2022/4/2/2022040217391412915.jpg"}/>
            </header>
            {/*导航栏*/}
            <section className={styles.section}>
                <div>
                    <span>送至：</span>
                </div>
                <div>
                    <span>
                        欢迎光临当当，请
                        <a href="./">登录</a>
                    </span>
                    <span>成为会员</span>
                    <ul className={styles.ul}>
                        <li>
                            <a href={"./"} className={styles.cart}>
                                购物车
                            </a>
                        </li>
                        <li>
                            <a href={"./"}>
                                我的订单
                            </a>
                        </li>
                        <li>
                            <span>
                                我的云书房
                            </span>
                        </li>
                        <li>
                            <span>
                                我的当当
                            </span>
                        </li>
                        <li>
                            <span>
                                当当拼团
                            </span>
                        </li>
                        <li>
                            <span>
                                企业采购
                            </span>
                        </li>
                        <li>
                            <span>
                                小说投稿
                            </span>
                        </li>
                        <li>
                            <span>
                                客户服务
                            </span>
                        </li>
                        <li>
                            <span>
                                切换无障碍
                            </span>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}