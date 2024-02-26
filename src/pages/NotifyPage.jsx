import { useForm } from "react-hook-form";
import { useUsersStore } from "../store/userStore";
import { useGetAPI, usePostAPI } from "../api/Apis";
import { useEffect, useState } from "react";

export default function NotifyPage() {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      isBulk: "0",
      definedContent: "1",
      content: "",
      userId: "-1",
    },
  });

  const [error, setError] = useState("");

  const users = useUsersStore((state) => state.users);
  useGetAPI("users", "users", 1);

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

  const isBulk = Number(watch("isBulk"));
  const userId = Number(watch("userId"));
  const channel = watch("channel");
  const content = watch("content");
  const communicationFor = watch("communicationFor");
  const definedContent = Number(watch("definedContent"));

  const sendNotify = () => {
    let payload = {
      isBulk: !!isBulk,
      channel,
      content,
      communicationFor,
    };
    if (!isBulk) {
      payload = { ...payload, userId };
    }
    mutate(payload);
  };

  const isDisable =
    (!isBulk && userId === -1) ||
    (!definedContent && content === "") ||
    (definedContent && communicationFor === "-1") ||
    channel === "-1" ||
    isLoading ||
    error !== "";

  useEffect(() => {
    if (error !== "") {
      setError("");
    }
  }, [isBulk, userId, channel, communicationFor, content, definedContent]);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Notify</h2>
          </div>

          <div className="panel-body widget-shadow">
            <form onSubmit={handleSubmit(sendNotify)}>
              {/* <div className="formRow form-group">
                <label className="control-label width25">Send them all</label>
                <div style={{ display: "flex" }} className="width75">
                  <div>
                    <input type="radio" value={1} {...register("isBulk")} />
                    True
                  </div>
                  <div>
                    <input type="radio" value={0} {...register("isBulk")} />
                    False
                  </div>
                </div>
              </div> */}
              {!isBulk && (
                <div className="form-group formRow">
                  <label className="control-label width25">
                    Select user id
                  </label>
                  <div className="width75">
                    <select
                      multiple=""
                      className="form-control1"
                      {...register("userId")}
                    >
                      <option value={-1}>Select user id</option>

                      {users?.map((user) => {
                        if (user?.id === 0) return null;
                        return (
                          <option value={user?.id} key={user?.id}>
                            {user?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}

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
