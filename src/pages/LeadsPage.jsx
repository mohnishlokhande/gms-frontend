import { useRef, useState } from "react";
import { useGetAPI, usePostAPI } from "../api/Apis";
import { useRefetchStore } from "../store/userStore";
import { useForm } from "react-hook-form";
import { useGymsStore, useLeadsStore } from "../store/secondaryStore";
import Pagination from "../components/layout/Pagination";

export default function LeadsPage() {
  const usersCount = useRefetchStore((state) => state.usersCount);
  const refetchUsers = useRefetchStore((state) => state.refetchUsers);

  const [selectLead, setSelectedLead] = useState(undefined);
  const [offset, setOffset] = useState(0);

  const modalBtnRef = useRef(null);
  const upgradeModalBtnRef = useRef(null);
  const { data: { total: totalLeads = 0 } = {} } = useGetAPI(
    `users?limit=20&offset=${offset}&type=lead`,
    "leads",
    usersCount
  );
  useGetAPI("gyms", "gyms");

  const { register, handleSubmit, watch } = useForm();

  const leads = useLeadsStore((state) => state.leads);
  const gyms = useGymsStore((state) => state.gyms);

  const name = watch("name");
  const email = watch("email");
  const phone = Number(watch("phone"));
  const gender = watch("gender");
  const gymId = watch("gymId");

  const toogleModal = () => {
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
    }
  };

  const { mutate } = usePostAPI({
    endPoint: "user/signup",
    onSuccess: () => {
      refetchUsers();
      toogleModal();
    },
    onError: (err) => {
      console.log("###$@$", err);
    },
  });

  const { mutate: mutateLead, isLoading: isAddLeadLoading } = usePostAPI({
    method: "patch",
    endPoint: `users/${selectLead}`,
    onSuccess: () => {
      refetchUsers();
      upgradeModalBtnRef?.current?.click();
      setSelectedLead(undefined);
    },
    onError: (err) => {
      console.log("###$@$", err);
      setSelectedLead(undefined);
    },
  });

  const createUser = () => {
    const payload = {
      name,
      role: 5,
      email,
      password: "password",
      phone,
      gender,
      isLead: true,
      gymId: Number(gymId),
    };
    mutate(payload);
  };

  const isDisable = isAddLeadLoading === true || name === "" || phone === 0;
  email === "" || gender === null;

  const upgradeLead = () => {
    mutateLead({ isUpgradeToUser: true });
  };

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Leads</h2>
            <button
              ref={modalBtnRef}
              type="button"
              className="btn btn-primary btn-flat btn-pri btn-lg"
              data-toggle="modal"
              data-target="#gridSystemModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add lead
            </button>
          </div>

          <div className="panel-body widget-shadow">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Convert</th>
                </tr>
              </thead>
              <tbody>
                {leads?.map((user, index) => {
                  if (user?.id === 0) return null;
                  return (
                    <tr key={user?.id}>
                      <th scope="row"> {index + 1}</th>
                      <td>{user?.name} </td>
                      <td>{user?.email}</td>
                      <td>{user?.role}</td>
                      <td>{user?.gender}</td>
                      <td>
                        <button
                          ref={upgradeModalBtnRef}
                          type="button"
                          className="btn btn-xs btn-default hvr-icon-grow fa-handshake-o col-9"
                          data-toggle="modal"
                          data-target="#convertConfirm"
                          onClick={() => {
                            setSelectedLead(user?.id);
                          }}
                        >
                          Convert to the user
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            total={totalLeads}
            offset={offset}
            setOffset={setOffset}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="convertConfirm"
        role="dialog"
        aria-labelledby="convertConfirmLabel"
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
              <h4 className="modal-title" id="convertConfirmLabel">
                Convert to user
              </h4>
            </div>
            <div className="modal-body">
              Are you sure you want to convert this lead to user?
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
                className={`btn btn-warning`}
                onClick={upgradeLead}
              >
                Yes, confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="gridSystemModal"
        // zindex="-1"
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
                Add lead
              </h4>
            </div>
            <div className="modal-body">
              <div>
                <form onSubmit={handleSubmit(createUser)}>
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
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                    <input
                      {...register("phone", { required: true })}
                      type="number"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="formRow form-group">
                    <h4>Gender* :</h4>
                    <div>
                      <label>
                        <input
                          type="radio"
                          value="male"
                          {...register("gender")}
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="female"
                          {...register("gender")}
                        />
                        Female
                      </label>
                    </div>
                    <div className="clearfix"> </div>
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
                onClick={createUser}
              >
                {isAddLeadLoading ? <div className="loader" /> : <>Submit </>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
