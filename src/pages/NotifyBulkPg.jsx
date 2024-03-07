import { useForm } from "react-hook-form";
import { usePostAPI } from "../api/Apis";
import { useEffect, useState } from "react";

export default function NotifyBulkPage() {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      channel: "-1",
      definedContent: "1",
      content: "",
    },
  });

  const [error, setError] = useState("");

  const { mutate, isLoading } = usePostAPI({
    endPoint: `notify`,
    onSuccess: () => {
      reset();
    },
    onError: (err) => {
      console.log("###$@$", err);
      setError("The api failed, please check the values again");
    },
  });

  const channel = watch("channel");
  const content = watch("content");
  const communicationFor = watch("communicationFor");
  const definedContent = Number(watch("definedContent"));

  const sendNotify = () => {
    let payload = {
      isBulk: true,
      channel,
      content,
      communicationFor,
    };
    mutate(payload);
  };

  const isDisable =
    (!definedContent && content === "") ||
    (definedContent && communicationFor === "-1") ||
    channel === "-1" ||
    isLoading ||
    error !== "";

  useEffect(() => {
    if (error !== "") {
      setError("");
    }
  }, [channel, communicationFor, content, definedContent, error]);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Send bulk notifications</h2>
          </div>

          <div className="panel-body widget-shadow">
            <form onSubmit={handleSubmit(sendNotify)}>
              <div className="form-group formRow">
                <label className="control-label width25">Select channel</label>
                <div className="width75">
                  <select
                    multiple=""
                    className="form-control1"
                    {...register("channel")}
                  >
                    <option value="-1">Select channel</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">Whatsapp</option>
                  </select>
                </div>
              </div>
              <div className="formRow form-group">
                <label className="control-label width25">Defined content</label>
                <div style={{ display: "flex" }} className="width75">
                  <div>
                    <input
                      type="radio"
                      value="1"
                      {...register("definedContent")}
                    />
                    True
                  </div>
                  <div>
                    <input
                      type="radio"
                      value="0"
                      {...register("definedContent")}
                    />
                    False
                  </div>
                </div>
              </div>
              {definedContent ? (
                <div className="form-group formRow">
                  <label className="control-label width25">Sending for</label>
                  <div className="width75">
                    <select
                      multiple=""
                      className="form-control1"
                      {...register("communicationFor")}
                    >
                      <option value="-1">Select channel</option>
                      <option value="birthday">Birthday</option>
                      <option value="joiningAnniversary">
                        Joining Anniversary
                      </option>
                      <option value="marriageAnniversary">
                        Marriage Anniversary
                      </option>
                      <option value="expiryNotification">
                        Expiry Notification
                      </option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Content</label>
                  <textarea
                    rows="6"
                    {...register("content", { required: true })}
                    className="form-control1 control2"
                    placeholder="Type the message"
                  ></textarea>
                </div>
              )}
            </form>
            {error && <div className="errorText">{error}</div>}
            <div className="add-membership-footer">
              <div
                style={{
                  width: "100%",
                  textAlign: "right",
                  paddingBottom: "1rem",
                }}
              >
                <button
                  type="button"
                  className={`btn btn-warning ${isDisable && "disabled"}`}
                  onClick={sendNotify}
                >
                  {isLoading ? <div className="loader" /> : <>Submit </>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
