import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { determineInputType } from "../../utils/helper";
import { usePostAPIWithoutAuth } from "../../api/Apis";

export default function ForgotPassword() {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [inputType, setInputType] = useState("invalid");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const inputVal = watch("inputVal")?.trim();

  const { mutate, isLoading: isForgotLoading } = usePostAPIWithoutAuth({
    endPoint: "reset-password",
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (err) => {
      console.log("###$@$", err);
    },
  });

  const onSubmit = () => {
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
    mutate(payload);
  };

  const isDisabled =
    isError || isForgotLoading || inputVal === "" || inputType === "invalid";

  const successScreen = () => {
    return (
      <div className="widget-shadow">
        <div className="login-body">
          <b>A link is sent to {inputVal}. Please check your inbox</b>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (inputVal) {
      setIsError(false);
      setInputType(determineInputType(inputVal));
    }
  }, [inputVal]);

  return (
    <div id="page-wrapper" style={{ height: "100vh" }}>
      <div className="main-page login-page ">
        {isSuccess ? (
          successScreen()
        ) : (
          <>
            <h2 className="title1">Reset your password</h2>
            <div className="widget-shadow">
              <div className="login-body">
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
                      {isForgotLoading ? (
                        <div className="loader" />
                      ) : (
                        <>Send link</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
