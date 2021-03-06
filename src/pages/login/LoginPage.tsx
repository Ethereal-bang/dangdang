import styles from "./Login.module.css";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

interface Info {
    tel?: string,
    password?: string,
}

export const LoginPage = () => {
    const [submitInfo, setSubmitInfo] = useState<Info>({tel: "", password: ""});
    const [loginState, setLoginState] = useState<"login" | "register">("login");
    const navigate = useNavigate();

    function submitForm() {
        if (loginState === "login") {
            axios.get(`http://localhost:3001/users/login`, {
                params: {
                    tel: submitInfo.tel,
                    password: submitInfo.password,
                }
            })
                .then(res => {
                    const {data} = res;
                    if (data.flag) {
                        saveToLocal({
                            ...data.data.user,
                            shoppingCartId: data.data.user.shoppingCartId,
                        });
                        navigate("/")
                    } else {
                        alert(data.msg);    // ??
                    }
                })
        } else {
            axios.get(`http://localhost:3001/users/register`, {
                params: {
                    tel: submitInfo.tel,
                    password: submitInfo.password,
                }
            })
                .then(res => {
                    const {data} = res;
                    if (data.flag) {
                        saveToLocal({
                            ...data.data.user,
                            shoppingCartId: data.data.user.shoppingCartId,
                        });
                        navigate("/")
                    } else {
                        alert(data.msg);
                    }
                })
        }
    }

    function saveToLocal(data: any) {
        localStorage.setItem("tel", data.tel);
        localStorage.setItem("shoppingCartId", data.shoppingCartId);
    }

    function changeTel(e: any) {
        setSubmitInfo({tel: e.target.value, password: submitInfo?.password})
    }

    function changePwd(e: any) {
        setSubmitInfo({tel: submitInfo?.tel, password: e.target.value})
    }

    return <>
        <header className={styles["header"]}>
            <Link to={"/"}>
                <img alt={"??????"} src={"https://img62.ddimg.cn/upload_img/00873/web/logo-1628229920.png"} />
            </Link>
            <section className={styles["header_right"]}>
                <a href={"./"}>???????????????</a>
                <a href={"./"}>
                    <img src={"https://img61.ddimg.cn/upload_img/00862/web/icon-1-1628495800.png"} alt={"icon"} />
                    ??????????????? ???????????????
                </a>
            </section>
        </header>
        <section className={styles["body"]}>
            <div>
                {loginState === "login" ? (
                    <>{/*??????*/}
                        <header>
                            <h3>
                                <a href={"./"}>????????????</a>
                                <span>|</span>
                                <a href={"./"}>???????????????</a>
                            </h3>
                        </header>
                        <section className={styles["login"]}>
                            <div>
                                <label>?????????/??????/??????</label>
                                <input autoFocus value={submitInfo?.tel} onChange={changeTel} />
                            </div>
                            <div>
                                <label>??????</label>
                                <input value={submitInfo?.password} onChange={changePwd} type={"password"} />
                            </div>
                            <div className={styles["agree"]}>
                                ???????????????
                                <a href={"https://help.dangdang.com/details/page254"}> ???????????????</a>
                                <a href={"https://help.dangdang.com/details/page254"}>????????????</a>
                            </div>
                            <button onClick={submitForm}>??????</button>
                        </section>
                        <div className={styles["option"]}>
                            <a href={"#register"} onClick={() => setLoginState("register")}>????????????</a>
                            <span>|</span>
                            <span>????????????</span>
                        </div>
                    </>
                ) : (
                    <>{/*??????*/}
                        <header>
                            <h3>
                                <a onClick={() => setLoginState("register")} href={"#login"}>&gt;</a>
                                <span>????????????</span>
                            </h3>
                        </header>
                        <section className={styles["login"]}>
                            <div>
                                <label>?????????</label>
                                <input autoFocus value={submitInfo?.tel} onChange={changeTel} />
                            </div>
                            <div>
                                <label>??????</label>
                                <input value={submitInfo?.password} onChange={changePwd} />
                            </div>
                            <div className={styles["agree"]}>
                                ???????????????
                                <a href={"https://help.dangdang.com/details/page254"}> ???????????????</a>
                                <a href={"https://help.dangdang.com/details/page254"}>????????????</a>
                            </div>
                            <button onClick={submitForm}>???????????????</button>
                        </section>
                    </>
                )}
                <div className={styles["third"]}>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"????????????"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"????????????"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"????????????"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"????????????"} />
                    </a>
                    <a href={"./"}>
                        <img src={"https://img63.ddimg.cn/upload_img/00862/web/wechat-1628496723.png"} alt={"????????????"} />
                    </a>
                </div>
            </div>
        </section>
    </>
}