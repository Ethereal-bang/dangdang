import styles from "./Books.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Book} from "../clockBuy/ClockBuy";
import {Link} from "react-router-dom";

const titleItems = ["最新上架", "独家畅品", "重点推荐", "电子书"];
const rankTitles = ["图书畅销榜", "童书新书榜"];
const genres = ["童书", "中小学教辅", "外语", "考试", "小说", "文学", "青春文学", "成功/励志", "管理", "历史", "亲子/家教", "全部分类>"];

export interface Ad {
    img: string,
    name: string,
    link: string,
}

interface RankingBook extends Book {
    ranking: number;
}

export const Books = () => {
    const [ads, setAds1] = useState<[Ad]>(); // 左侧广告
    const [ads2, setAds2] = useState<[Ad]>();   // 右侧广告
    const [curLeft, setCurLeft] = useState<number>(0);  // 左边标题下标
    const [curRight, setCurRight] = useState<number>(0);
    const [books, setBooks] = useState<Array<Array<Book>>>();   // 图书栏——六个为一组
    const [rank, setRank] = useState<Array<Array<RankingBook>>>();    // 排行榜

    useEffect(() => {
        axios.get("http://localhost:3001/ad/getByPos/book1")
            .then(res => {
                // console.log(res.data)
                setAds1(res.data.data.list);
            })

        axios.get("http://localhost:3001/ad/getByPos/book2")
            .then(res => {
                setAds2(res.data.data.list);
            })

        axios.get("http://localhost:3001/goods/getByType/book")
            .then(res => {
                const list = res.data.data.list;
                // console.log(list)
                setBooks([list.slice(0, 6), list.slice(6, 12), list.slice(12, 18), list.slice(18, 24)]);
            })

        axios.get("http://localhost:3001/goods/getByType/bookRanking")
            .then(res => {
                const {list} = res.data.data;
                // console.log(list)
                setRank([list.slice(0, 10), list.slice(10, 20)]);
            })
    }, [])

    return <section className={styles["books"]}>
        <div className={styles["left"]}>
            <header>
                <div className={styles["title"]}>
                    <span>图书</span>
                    <span>·</span>
                    <span>电子书</span>
                </div>
                <ul className={styles["menu"]}>
                    {titleItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </header>
            <section className={styles["body"]}>
                <section className={styles["body_left"]}>
                    <a title={ads?.[curLeft].name} href={ads?.[curLeft].link}>
                        <img src={ads?.[curLeft].img} alt={ads?.[curLeft].name}/>
                    </a>
                    <ul className={styles["genre"]}>
                        {genres.map((item, index) => (
                            <li key={index}>
                                <a href={"./"} title={item}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </section>
                <ul className={styles["body_right"]}>
                    <li className={styles[".big_ad"]}>
                        <a className={styles["big_ad"]} href={ads2?.[curRight].link} title={ads2?.[curRight].name}>
                            <img src={ads2?.[curRight].img} alt={ads2?.[curRight].name}/>
                        </a>
                    </li>
                    {books?.[curLeft].map((item, index) => (
                        <li className={styles["book_li"]} key={index}>
                            <Link to={`/goods/${item._id}`} title={item.name}>
                                <img alt={item.name} src={item.img}/>
                                <span>{item.name}</span>
                                <div>
                                    <span>￥{item.price_now}</span>
                                    <span>￥{item.price_old}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
        <div className={styles["right"]}>
            <ul className={styles["menu"]}>
                {rankTitles.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <ul className={styles["rank"]}>
                {rank?.[curRight].map((item, index) => (
                    (index === curRight) ? (
                        <li key={index} className={styles["cur_li"]}>
                            <span>{item.ranking}</span>
                            <a href={item.img}>
                                <img src={item.img} alt={item.name} />
                            </a>
                            <a href={item.img} title={item.name}>
                                {item.name}

                            </a>
                        </li>
                    ) : (
                        <li key={index} className={styles["other_li"]}>
                            <span>{item.ranking}</span>
                            {item.name.slice(0, 11)}
                        </li>
                    )
                ))}
            </ul>
        </div>
    </section>

}