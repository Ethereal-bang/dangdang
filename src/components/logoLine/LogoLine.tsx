import styles from "./LogoLine.module.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

interface SearchResItem {
    name: string,
    _id: string,
}

export const LogoLine = () => {
    const [searchVal, setSearchVal] = useState<string>("");
    const [searchRes, setSearchRes] = useState<SearchResItem[]>([]);

    // input一改变自动开始模糊匹配
    useEffect(() => {
        axios.get("http://localhost:3001/goods/search", {
            params: {
                name: searchVal,
            }
        })
            .then(res => {
                setSearchRes(res.data.data.list);
            })
    }, [searchVal]);

    return (
        <div className={styles["logoLine"]}>
            {/*logo*/}
            <img alt={"dang logo"} src={"http://img62.ddimg.cn/upload_img/00444/tupian/PClogo-1648893484.gif"} />
            {/*Search*/}
            <section className={styles["section"]}>
                {/*Input*/}
                <section className={styles["search_box"]}>
                    <div>
                        <input
                            placeholder={"白茶新书"}
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)} />
                        {/*搜索结果*/}
                        <ul className={styles["search_ul"]}>
                            {searchRes?.map(item => (
                                <li key={item._id}>
                                    <Link to={`/goods/${item._id}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
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