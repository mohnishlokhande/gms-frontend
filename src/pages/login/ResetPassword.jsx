import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostAPIWithoutAuth } from "../../api/Apis";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch } = useForm();

  const searchUrl = window?.location?.search;
  const queryParams = queryString.parse(searchUrl);

  const password = watch("password")?.trim();

  const { mutate, isLoading: isUpdateLoading } = usePostAPIWithoutAuth({
    method: "patch",
    endPoint: `users/${queryParams?.id}`,
    token: queryParams?.token,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (err) => {
      setErrorCode(err?.status);
      console.log("###$@$", err);
    },
  });

  const onSubmit = () => {
    let payload = {
      token: queryParams?.token,
      password,
    };
    mutate(payload);
  };

  const isDisabled = errorCode != 0 || isUpdateLoading || password === "";

  useEffect(() => {
    if (password) {
      setErrorCode(0);
    }
  }, [password]);

  return (
    <div id="page-wrapper" style={{ height: "100vh" }}>
      <div className="main-page login-page ">
        <h2 className="title1">Enter new password</h2>
        <div className="widget-shadow">
          <div className="login-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Create a new password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="lock"
                    placeholder="Password"
                  />
                  <div
                    className="viewPassword"
                    onClick={() => {
                      setShowPassword((state) => !state);
                    }}
                  >
                    {showPassword ? (
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    )}
                  </div>
                </div>

                {errorCode === 400 && (
                  <div className="errorText">Week password</div>
                )}
                {errorCode === 401 && (
                  <div className="errorText">
                    This link has either already been used or it has expired
                  </div>
                )}
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  type="submit"
                  className={`customBtn ${isDisabled && "disabled"}`}
                  disabled={isDisabled}
                >
                  {isUpdateLoading ? <div className="loader" /> : <>Update</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
