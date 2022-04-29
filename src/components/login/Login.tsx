import styles from "../../pages/login/Login.module.css";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface Info {
    tel?: number,
    password?: string,
}

export const Login = () => {
    const [submitInfo, setSubmitInfo] = useState<Info>({tel: 0, password: ""});
    const [loginState, setLoginState] = useState<"login" | "register">("login");
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
                // console.log(data.msg)
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
                        <label>验证码</label>
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
    </>
}