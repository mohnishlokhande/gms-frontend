import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });

      console.log("Login response:", response);

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={`${styles.parentContainer} ${styles.page_wrapper}`}>
      <div className={`${styles.formContainer} ${styles.login_page}`}>
        <div className={`${styles.login_heading}`}>Login</div>
        <div className={`${styles.widget_shadow} ${styles.login_body}`}>
          <Input
            type="text"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            prefix={
              <i
                className={`fa fa-user ${styles.iconClass}`}
                aria-hidden="true"
              ></i>
            }
          />

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            prefix={
              <i
                className={`fa fa-user ${styles.iconClass}`}
                aria-hidden="true"
              ></i>
            }
          />
          <div className={styles.checkboxRow}>
            <div className={`${styles.checkboxClass}`}>
              <input type="checkbox" name="checkbox" />
              <div>Remember me</div>
            </div>
            <div className={styles.forgetPass}>forgot password?</div>
          </div>
          <Button
            type="primary"
            block
            onClick={handleLogin}
            disabled={!email || !password}
          >
            Sign In
          </Button>
          <div className={styles.checkboxClass}>
            {` Don't have an account ? `}&nbsp;
            <div>Create an account</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
