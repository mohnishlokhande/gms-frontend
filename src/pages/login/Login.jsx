import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRefetchStore } from "../../store/userStore";

const Login = () => {
  const navigate = useNavigate();
  const refetchAccount = useRefetchStore((state) => state.refetchAccount);

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("#####", data);
    handleLogin();
  };

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
      refetchAccount();
    } catch (error) {
      console.error("Login failed", error);
      console.error("Login failed. Please check your credentials.");
    }
  };
  const isAuthenticated = localStorage.getItem("token");
  console.log("###", isAuthenticated);

  return (
    <div id="page-wrapper" style={{ height: "100vh" }}>
      <div className="main-page login-page ">
        <h2 className="title1">Login</h2>
        <div className="widget-shadow">
          <div className="login-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("email", { required: true })}
                type="email"
                className="user"
                placeholder="Enter Your Email"
              />
              <input
                type="password"
                {...register("password", { required: true })}
                className="lock"
                placeholder="Password"
              />
              {/* <div className="forgot-grid">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    {...register("checkbox", { required: false })}
                  />
                  <i></i>Remember me
                </label>
                <div className="forgot">
                  <a href="#">forgot password?</a>
                </div>
                <div className="clearfix"> </div>
              </div> */}
              <input type="submit" value="Sign In" />
              {/* <div className="registration">
                Do not have an account ?
                <a className="" href="signup.html">
                  Create an account
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
