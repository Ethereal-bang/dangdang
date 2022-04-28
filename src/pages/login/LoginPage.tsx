import styles from "./Login.module.css";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Info {
    tel?: number,
    password?: string,
}

export const LoginPage = () => {
    const [submitInfo, setSubmitInfo] = useState<Info>({tel: 0, password: ""});
    const navigate = useNavigate();

    function submitForm(e: any) {
        axios.get(`http://localhost:3001/users/login`, {
            params: {
                tel: submitInfo.tel,
                password: submitInfo.password,
            }
        })
            .then(res => {
                const {data} = res;
                console.log(data.msg)
                if (data.flag) {
                    navigate("/", {
                        state: { username: submitInfo.tel } // 传递路由参数
                    })
                }
            })
    }

    function changeTel(e: any) {
        setSubmitInfo({tel: e.target.value, password: submitInfo?.password})
    }

    function changePwd(e: any) {
        setSubmitInfo({tel: submitInfo?.tel, password: e.target.value})
    }

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
                        <input value={submitInfo?.password} onChange={changePwd} />
                    </div>
                    <div className={styles["agree"]}>
                        登录即同意
                        <a href={"https://help.dangdang.com/details/page254"}> 用户协议、</a>
                        <a href={"https://help.dangdang.com/details/page254"}>隐私政策</a>
                    </div>
                    <button onClick={submitForm}>登录</button>
                </section>
                <div className={styles["option"]}>
                    <span>立即注册</span>
                    <span>|</span>
                    <span>忘记密码</span>
                </div>
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