import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRefetchStore } from "../../store/userStore";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const refetchAccount = useRefetchStore((state) => state.refetchAccount);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("#####", data);
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
      refetchAccount();
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      // alert("Login failed", error);
      console.error("Login failed", error);
      console.error("Login failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (email && password) {
      setIsError(false);
    }
  }, [email, password]);

  console.log("####@@@", errors, isError, isLoading);

  return (
    <div id="page-wrapper" style={{ height: "100vh" }}>
      <div className="main-page login-page ">
        <h2 className="title1">Login</h2>
        <div className="widget-shadow">
          <div className="login-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("email", { required: "true" })}
                type="email"
                className="user"
                placeholder="Enter Your Email"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p role="alert">First name is required</p>
              )}
              <input
                type="password"
                {...register("password", { required: true })}
                className="lock"
                placeholder="Password"
              />

              {isError && (
                <div style={{ color: "#ff0000a1" }}>Invalid credentials</div>
              )}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  className={`btn btn-warning ${
                    (isError || isLoading) && "disabled"
                  }`}
                >
                  {isLoading ? <div className="loader" /> : <>Sign In </>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
