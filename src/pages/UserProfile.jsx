import { useNavigate } from "react-router-dom";
import { useUserProfileStore } from "../store/userStore";
import { getRole } from "../utils/helper";
import { useForm } from "react-hook-form";
import { useMembershipsStore } from "../store/secondaryStore";
import { useGetAPI, usePostAPI } from "../api/Apis";
import { useEffect } from "react";

export default function UserProfile() {
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm();
  const userProfile = useUserProfileStore((state) => state.user);
  const setUserProfile = useUserProfileStore((state) => state.setUser);
  const memberships = useMembershipsStore((state) => state.memberships);
  const updateMemberships = useMembershipsStore(
    (state) => state.setMemberships
  );

  const membershipId = watch("membershipId");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const amount = watch("amount");
  const paymentMode = watch("paymentMode");
  const remark = watch("remark");

  const { data: { memberships: membershipsData = [] } = {} } =
    useGetAPI("memberships");

  const { mutate } = usePostAPI({
    endPoint: `users/${userProfile?.id}/membership/add`,
    onSuccess: () => {},
    onError: (err) => {
      console.log("###$@$", err);
    },
  });

  const addMembership = () => {
    const payload = {
      membershipId: Number(membershipId),
      paymentMethod: paymentMode,
      startDate: startDate,
      endDate: endDate,
      remarks: remark,
      amount: Number(amount) * 100,
    };
    mutate(payload);
  };

  const isDisable =
    membershipId === -1 ||
    paymentMode === "" ||
    startDate === "" ||
    amount === "";

  useEffect(() => {
    if (
      membershipsData != undefined &&
      Object.keys(membershipsData).length !== 0
    ) {
      updateMemberships(membershipsData);
    }
  }, [membershipsData]);

  console.log(
    "####",
    membershipId,
    startDate,
    endDate,
    amount,
    paymentMode,
    remark
  );

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="customHeaderPg">
          {/* <h2 className="title1">Users</h2> */}
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              navigate(`/users`);
              setUserProfile({});
            }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>

        <div className="innerDiv">
          <div className="panel-body widget-shadow" style={{ width: "80%" }}>
            <h3>Member Information</h3>

            <div className="viewProfile">
              <div>
                <h4>Name</h4>
                <p>{userProfile?.name}</p>
                <h4>Contact</h4>
                <p>{userProfile?.email}</p>
                <p>{userProfile?.phone}</p>
              </div>
              <div>
                <h4>Role</h4>
                <p>{getRole(userProfile?.role)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="innerDiv">
          <div className="panel-body widget-shadow" style={{ width: "80%" }}>
            <h3>Membership</h3>

            <div className="viewProfile">
              <form
                onSubmit={handleSubmit(addMembership)}
                style={{ width: "100%" }}
              >
                <div className="form-group">
                  <label className="control-label">Select Membership</label>
                  <select
                    multiple=""
                    className="form-control1"
                    {...register("membershipId")}
                  >
                    <option value={-1}>Select the membership</option>
                    {memberships?.map((m) => {
                      if (m?.id === 0) return null;
                      return (
                        <option value={m?.id} key={m?.id}>
                          {m?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group formRow">
                  <div className="datePicker" style={{ paddingRight: "16px" }}>
                    <label className="control-label">Start date</label>
                    <input type="date" {...register("startDate")} />
                  </div>
                  <div className="datePicker">
                    <label className="control-label">End date</label>
                    <input type="date" {...register("endDate")} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="innerDiv">
          <div className="panel-body widget-shadow" style={{ width: "80%" }}>
            <h3>Payment</h3>

            <div className="viewProfile">
              <form
                onSubmit={handleSubmit(addMembership)}
                style={{ width: "100%" }}
              >
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Paying amount (Rs.)
                  </label>
                  <input
                    {...register("amount", { required: true })}
                    type="number"
                    className="form-control"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="formRow">
                  <div
                    className="form-group datePicker"
                    style={{ paddingRight: "16px" }}
                  >
                    <label htmlFor="exampleInputEmail1">
                      Select payment mode
                    </label>
                    <select
                      multiple=""
                      className="form-control1"
                      {...register("paymentMode", { required: true })}
                    >
                      <option value="">Select the payment mode</option>
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div className="form-group datePicker">
                    <label htmlFor="exampleInputEmail1">Remark</label>
                    <input
                      {...register("remark")}
                      type="text"
                      className="form-control"
                      placeholder="Remark"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="add-membership-footer">
          <div style={{ width: "80%", textAlign: "right" }}>
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className={`btn btn-warning ${isDisable && "disabled"}`}
              onClick={addMembership}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
