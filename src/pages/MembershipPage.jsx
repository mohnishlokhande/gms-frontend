import { useRef } from "react";
import { useGetAPI, usePostAPI } from "../api/Apis";
import { useRefetchStore } from "../store/userStore";
import { useForm } from "react-hook-form";
import { useGymsStore, useMembershipsStore } from "../store/secondaryStore";
import { getFormatDate } from "../utils/helper";

export default function MembershipPage() {
  const membershipCount = useRefetchStore((state) => state.membershipCount);
  const refetchMemberships = useRefetchStore(
    (state) => state.refetchMemberships
  );

  const modalBtnRef = useRef(null);

  useGetAPI("memberships", "memberships", membershipCount);
  useGetAPI("gyms", "gyms");
  const { register, handleSubmit, watch } = useForm();

  const memberships = useMembershipsStore((state) => state.memberships);
  const gyms = useGymsStore((state) => state.gyms);

  const name = watch("name");
  const price = watch("price");
  const billingYear = watch("billingYear");
  const billingMonth = watch("billingMonth");
  const billingDay = watch("billingDay");
  const gymId = watch("gymId");

  const toogleModal = () => {
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
    }
  };

  const { mutate } = usePostAPI({
    endPoint: "membership",
    onSuccess: () => {
      refetchMemberships();
      toogleModal();
    },
    onError: (err) => {
      console.log("###$@$", err);
      toogleModal();
    },
  });

  const createMembership = () => {
    let payload = {
      name,
      gymId: Number(gymId),
      billingYear: Number(billingYear),
      billingMonth: Number(billingMonth),
      billingDay: Number(billingDay),
      price: Number(price) * 100,
    };

    mutate(payload);
  };

  const isDisable = name === "" || gymId === "-1" || price === "";

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Membership</h2>
            <button
              ref={modalBtnRef}
              type="button"
              className="btn btn-primary btn-flat btn-pri btn-lg"
              data-toggle="modal"
              data-target="#gridSystemModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add new
              membership
            </button>
          </div>

          <div className="panel-body widget-shadow">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Gym Name</th>
                  <th>Price</th>
                  <th>Billing Day</th>
                  <th>Billing Month</th>
                  <th>Billing Year</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                {memberships?.map((membership) => {
                  if (membership?.id === 0) return null;
                  return (
                    <tr key={membership?.id}>
                      <th scope="row"> {membership?.id}</th>
                      <td>{membership?.name} </td>
                      <td>{membership?.gymName}</td>
                      <td>{Number(membership?.price) / 100}</td>
                      <td>{membership?.billingDay}</td>
                      <td>{membership?.billingMonth}</td>
                      <td>{membership?.billingYear}</td>
                      <td>{getFormatDate(membership?.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="gridSystemModal"
        role="dialog"
        aria-labelledby="gridSystemModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="gridSystemModalLabel">
                Add membership
              </h4>
            </div>
            <div className="modal-body">
              <div>
                <form onSubmit={handleSubmit(createMembership)}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Name"
                    />
                  </div>

                  <div className="form-group formRow">
                    <label className="control-label" style={{ width: "25%" }}>
                      Select Gym
                    </label>
                    <div style={{ width: "75%" }}>
                      <select
                        multiple=""
                        className="form-control1"
                        {...register("gymId")}
                      >
                        <option value={-1}>Select the gym</option>

                        {gyms?.map((gym) => {
                          if (gym?.id === 0) return null;
                          return (
                            <option value={gym?.id} key={gym?.id}>
                              {gym?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      columnGap: "1rem",
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="billingDay">Billing Day</label>
                      <input
                        {...register("billingDay", { required: true })}
                        type="number"
                        className="form-control"
                        placeholder="Billing Day"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="billingMonth">Billing Month</label>
                      <input
                        {...register("billingMonth", {
                          required: true,
                        })}
                        type="number"
                        className="form-control"
                        placeholder="Billing Month"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="billingYear">Billing Year</label>
                      <input
                        {...register("billingYear", {
                          required: true,
                        })}
                        type="number"
                        className="form-control"
                        placeholder="Billing Year"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      {...register("price", { required: true })}
                      type="number"
                      className="form-control"
                      placeholder="Price"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
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
                onClick={createMembership}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
