import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { determineInputType } from "../../utils/helper";

export default function ForgotPassword() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const inputVal = watch("inputVal")?.trim();

  const onSubmit = () => {
    handleForgotPassword();
  };

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      let payload = {};
      if (inputType === "email") {
        payload = {
          email: inputVal,
        };
      } else if (inputType === "phone") {
        payload = {
          phone: Number(inputVal),
        };
      }
      await axios.post("http://localhost:8080/reset-password", payload);

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error("Reset failed", error);
      setIsLoading(false);
    }
  };

  const isDisabled =
    isError || isLoading || inputVal === "" || inputType === "invalid";

  useEffect(() => {
    if (inputVal) {
      setIsError(false);
      setInputType(determineInputType(inputVal));
    }
  }, [inputVal]);

  return (
    <div id="page-wrapper" style={{ height: "100vh" }}>
      <div className="main-page login-page ">
        <h2 className="title1">Reset your password</h2>
        <div className="widget-shadow">
          <div className="login-body">
            {/* <div>Rest password through the phone number</div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>
                  Enter your email or phone number and we will send you
                  instructions to reset your password.
                </label>
                <input
                  {...register("inputVal", { required: "true" })}
                  type="email"
                  style={{ marginTop: "4px" }}
                  placeholder="Enter your email or phone number"
                  aria-invalid={errors.inputVal ? "true" : "false"}
                />
                {errors.inputVal?.type === "required" && (
                  <p role="alert">Email or phone number is required</p>
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
                  {isLoading ? <div className="loader" /> : <>Send link</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
