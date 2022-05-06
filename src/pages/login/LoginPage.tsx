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

    function submitForm(e: any) {
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
                        saveToLocal(data.data);
                        navigate("/")
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
                    console.log(data)
                    if (data.flag) {
                        saveToLocal(data.data);
                        navigate("/")
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
                <img alt={"当当"} src={"https://img62.ddimg.cn/upload_img/00873/web/logo-1628229920.png"} />
            </Link>
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
                {loginState === "login" ? (
                    <>{/*登录*/}
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
                                <input autoFocus value={submitInfo?.tel} onChange={changeTel} />
                            </div>
                            <div>
                                <label>密码</label>
                                <input value={submitInfo?.password} onChange={changePwd} type={"password"} />
                            </div>
                            <div className={styles["agree"]}>
                                登录即同意
                                <a href={"https://help.dangdang.com/details/page254"}> 用户协议、</a>
                                <a href={"https://help.dangdang.com/details/page254"}>隐私政策</a>
                            </div>
                            <button onClick={submitForm}>登录</button>
                        </section>
                        <div className={styles["option"]}>
                            <a href={"#register"} onClick={() => setLoginState("register")}>立即注册</a>
                            <span>|</span>
                            <span>忘记密码</span>
                        </div>
                    </>
                ) : (
                    <>{/*注册*/}
                        <header>
                            <h3>
                                <a onClick={() => setLoginState("register")} href={"#login"}>&gt;</a>
                                <span>立即注册</span>
                            </h3>
                        </header>
                        <section className={styles["login"]}>
                            <div>
                                <label>手机号</label>
                                <input autoFocus value={submitInfo?.tel} onChange={changeTel} />
                            </div>
                            <div>
                                <label>密码</label>
                                <input value={submitInfo?.password} onChange={changePwd} />
                            </div>
                            <div className={styles["agree"]}>
                                登录即同意
                                <a href={"https://help.dangdang.com/details/page254"}> 用户协议、</a>
                                <a href={"https://help.dangdang.com/details/page254"}>隐私政策</a>
                            </div>
                            <button onClick={submitForm}>同意并注册</button>
                        </section>
                    </>
                )}
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