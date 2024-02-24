import { useGetAPI, usePostAPI } from "../api/Apis";
import { useMembershipsStore } from "../store/secondaryStore";
import { useUserProfileStore } from "../store/userStore";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { increaseDate } from "../utils/helper";

export default function AddMembership(props) {
  const { setViewMemberhip } = props;
  const { register, handleSubmit, watch, setValue } = useForm();
  const userProfile = useUserProfileStore((state) => state.user);
  const memberships = useMembershipsStore((state) => state.memberships);

  const membershipId = Number(watch("membershipId"));
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const amount = watch("amount");
  const paymentMode = watch("paymentMode");
  const remark = watch("remark");

  useGetAPI("memberships", "memberships");

  const { mutate, isLoading } = usePostAPI({
    endPoint: `users/${userProfile?.id}/membership/add`,
    onSuccess: () => {
      setViewMemberhip(true);
    },
    onError: (err) => {
      console.log("###$@$", err);
    },
  });

  const addMembership = () => {
    const payload = {
      membershipId: membershipId,
      paymentMethod: paymentMode,
      startDate: startDate,
      endDate: endDate,
      remarks: remark,
      amount: Number(amount) * 100,
    };
    mutate(payload);
  };

  const isDisable =
    isLoading || membershipId === -1 || paymentMode === "" || startDate === "";

  useEffect(() => {
    if (membershipId) {
      let findMembership = memberships.find((mem) => {
        return mem?.id === membershipId;
      });
      setValue("amount", findMembership?.price / 100);

      if (startDate) {
        const day = findMembership?.billingDay;
        const month = findMembership?.billingMonth;
        const year = findMembership?.billingYear;
        setValue("endDate", increaseDate(startDate, day, month, year));
      }
    }
  }, [membershipId, startDate]);

  return (
    <>
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
                  <input type="date" {...register("endDate")} disabled />
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
                <label htmlFor="exampleInputEmail1">Paying amount (Rs.)</label>
                <input
                  {...register("amount", { required: true })}
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  disabled
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
            onClick={() => setViewMemberhip(true)}
          >
            Close
          </button>
          <button
            type="button"
            className={`btn btn-warning ${isDisable && "disabled"}`}
            onClick={addMembership}
          >
            {isLoading ? <div className="loader" /> : <>Submit </>}
          </button>
        </div>
      </div>
    </>
  );
}

AddMembership.propTypes = {
  setViewMemberhip: PropTypes.node.isRequired,
};
