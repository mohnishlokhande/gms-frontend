import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import styles from "./Login.module.css";
import logo from "../../assets/react.svg";

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
    <div className={styles.parentContainer}>
      <div className={styles.formContainer}>
        <img width={"100%"} height={"100%"} src={logo} alt="Logo" />
      </div>

      <div className={styles.formContainer}>
        <h2>Login</h2>

        <div>
          <div className={styles.inputBox}>Email</div>
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className={styles.inputBox}>Password</div>
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          block
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
