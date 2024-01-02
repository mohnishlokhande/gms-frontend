import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import styles from "./Signup.module.css";
import logo from "../../assets/react.svg";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        console.error("Passwords do not match");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/user/signup",
        {
          name,
          email,
          password,
          confirmPassword,
          phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      console.log("Signup successful", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.formContainer}>
        <img width={"100%"} height={"100%"} src={logo} alt="Logo" />
      </div>

      <div className={styles.formContainer}>
        <h2>Sign Up</h2>

        <div>
          <div className={styles.inputBoxLabel}> Name </div>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <div className={styles.inputBoxLabel}>
            Email
            {/* <span style={{ color: "red" }}>*</span> */}
          </div>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className={styles.inputBoxLabel}>Phone Number</div>
          <Input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <div className={styles.inputBoxLabel}>Password</div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <div className={styles.inputBoxLabel}>Confirm Password</div>
          <Input
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          block
          onClick={handleSignup}
          disabled={!email || !password || !confirmPassword || !phone}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
};

export default Signup;
