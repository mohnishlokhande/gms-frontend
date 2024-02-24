import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useGetAPI, usePostAPI } from "../api/Apis";
import {
  useRefetchStore,
  useUserProfileStore,
  useUsersStore,
} from "../store/userStore";
import { getRole } from "../utils/helper";
import { useForm } from "react-hook-form";
import { useGymsStore } from "../store/secondaryStore";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/layout/Pagination";

export default function UsersPage({ status = "" }) {
  const navigate = useNavigate();
  const usersCount = useRefetchStore((state) => state.usersCount);
  const refetchUsers = useRefetchStore((state) => state.refetchUsers);

  const [offset, setOffset] = useState(0);

  const modalBtnRef = useRef(null);
  const setUserProfile = useUserProfileStore((state) => state.setUser);
  const [apiErrors, setApiErrors] = useState({});

  const { data: { total: totalUsers = 0 } = {} } = useGetAPI(
    `users?limit=20&offset=${offset}&type=user${
      status !== "" ? `&membershipStatus=${status}` : ""
    }`,
    "users",
    usersCount
  );

  useGetAPI("gyms", "gyms");

  const { register, handleSubmit, watch, reset } = useForm();

  const users = useUsersStore((state) => state.users);
  const gyms = useGymsStore((state) => state.gyms);

  const name = watch("name");
  const password = watch("password");
  const email = watch("email");
  const role = watch("role");
  const phone = Number(watch("phone"));
  const gender = watch("gender");
  const gymId = watch("gymId");

  const toogleModal = () => {
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
      reset();
      setApiErrors({});
    }
  };

  const { mutate, isLoading: isAddUserLoading = false } = usePostAPI({
    endPoint: "user/signup",
    onSuccess: () => {
      refetchUsers();
      toogleModal();
    },
    onError: (err) => {
      console.log("###$@$", err, err?.data?.validationErrors);
      setApiErrors(err?.data?.validationErrors);
    },
  });

  const createUser = () => {
    const payload = {
      name,
      role: Number(role),
      email,
      password,
      phone,
      gender,
      gymId: Number(gymId),
      isLead: false,
    };
    mutate(payload);
  };

  const isDisable =
    name === "" ||
    password === "" ||
    phone === 0 ||
    gymId === "-1" ||
    email === "" ||
    role === null ||
    gender === null ||
    isAddUserLoading === true ||
    apiErrors?.email !== undefined ||
    apiErrors?.phone !== undefined ||
    apiErrors?.password !== undefined;

  useEffect(() => {
    if (email && apiErrors?.email) {
      setApiErrors({ ...apiErrors, email: undefined });
    }
  }, [email]);
  useEffect(() => {
    if (phone && apiErrors?.phone) {
      setApiErrors({ ...apiErrors, phone: undefined });
    }
  }, [phone]);
  useEffect(() => {
    if (password && apiErrors?.password) {
      setApiErrors({ ...apiErrors, password: undefined });
    }
  }, [password]);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Users</h2>
            {status === "" && (
              <button
                ref={modalBtnRef}
                type="button"
                className="btn btn-primary btn-flat btn-pri btn-lg"
                data-toggle="modal"
                data-target="#gridSystemModal"
              >
                <i className="fa fa-plus" aria-hidden="true"></i> Add user
              </button>
            )}
          </div>

          <div className="panel-body widget-shadow">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => {
                  if (user?.id === 0) return null;
                  return (
                    <tr key={user?.id}>
                      <th scope="row"> {index + 1}</th>
                      <td>{user?.name} </td>
                      <td>{user?.email}</td>
                      <td>{getRole(user?.role)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-xs btn-default hvr-icon-grow fa-eye col-9"
                          onClick={() => {
                            setUserProfile(user);
                            navigate(`/users/${user?.id}`);
                          }}
                        >
                          View user profile{"   "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            total={totalUsers}
            offset={offset}
            setOffset={setOffset}
          />
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
                Add user
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
                    {apiErrors?.email && (
                      <div className="errorText">Invalid email</div>
                    )}
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
                    {apiErrors?.phone && (
                      <div className="errorText">Invalid phone number</div>
                    )}
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
                  <div className="form-group formRow">
                    <h4>Role :</h4>

                    <div>
                      <label>
                        <input type="radio" value="1" {...register("role")} />
                        Member
                      </label>
                      <label>
                        <input type="radio" value="2" {...register("role")} />
                        Trainer
                      </label>
                      <label>
                        <input type="radio" value="3" {...register("role")} />
                        Admin
                      </label>
                    </div>
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
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Create password
                    </label>
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Create password"
                    />
                    {apiErrors?.password && (
                      <div className="errorText">Weak password</div>
                    )}
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
                {isAddUserLoading ? <div className="loader" /> : <>Submit </>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
UsersPage.propTypes = {
  status: PropTypes.string,
};
