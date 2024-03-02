import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePostAPIWithoutAuth } from "../../api/Apis";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

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
      setIsError(true);
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

  const isDisabled = isError || isUpdateLoading || password === "";

  useEffect(() => {
    if (password) {
      setIsError(false);
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
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="lock"
                  placeholder="Password"
                />

                {isError && <div className="errorText">Week password</div>}
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
