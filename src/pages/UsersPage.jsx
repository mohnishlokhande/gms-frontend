import { useEffect, useRef, useState } from "react";
import { useGetAPI, usePostAPI } from "../api/Apis";
import { useRefetchStore, useUsersStore } from "../store/userStore";
import { getRole } from "../utils/helper";
import { useForm } from "react-hook-form";
import { useGymsStore } from "../store/secondaryStore";

export default function UsersPage() {
  const usersCount = useRefetchStore((state) => state.usersCount);
  const refetchUsers = useRefetchStore((state) => state.refetchUsers);

  const modalBtnRef = useRef(null);
  const [userProfile, setUserProfile] = useState({});

  const { data: { users: usersData = [] } = {} } = useGetAPI(
    "users?limit=20&offset=0&type=user",
    usersCount
  );
  const { data: { gyms: gymsData = [] } = {} } = useGetAPI("gyms");

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();

  const users = useUsersStore((state) => state.users);
  const updateUsers = useUsersStore((state) => state.setUsers);
  const gyms = useGymsStore((state) => state.gyms);
  const updateGyms = useGymsStore((state) => state.setGyms);

  const name = watch("name");
  const password = watch("password");
  const email = watch("email");
  const role = watch("role");
  const phone = watch("phone");
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
    name === "" || password === "" || phone === "" || gymId === "-1";
  email === "" || role === null || gender === null;

  useEffect(() => {
    if (usersData != undefined && Object.keys(usersData).length !== 0) {
      updateUsers(usersData);
    }
  }, [usersData]);

  useEffect(() => {
    if (gymsData != undefined && Object.keys(gymsData).length !== 0) {
      updateGyms(gymsData);
    }
  }, [gymsData]);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Users</h2>
            <button
              ref={modalBtnRef}
              type="button"
              className="btn btn-primary btn-flat btn-pri btn-lg"
              data-toggle="modal"
              data-target="#gridSystemModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add user
            </button>
          </div>

          <div className="panel-body widget-shadow">
            {userProfile?.id !== undefined ? (
              <>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => {
                    setUserProfile({});
                  }}
                >
                  <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                </button>
                <div className="userProfilePg">
                  <div className="formRow profileRow">
                    <b>Name:</b>
                    <p>{userProfile?.name}</p>
                  </div>
                  <div className="formRow profileRow">
                    <b>Email:</b>
                    <p>{userProfile?.email}</p>
                  </div>
                  <div className="formRow profileRow">
                    <b>Phone:</b>
                    <p>{userProfile?.phone}</p>
                  </div>
                  <div className="formRow profileRow">
                    <b>Gender:</b>
                    <p>{userProfile?.gender}</p>
                  </div>
                  <div className="formRow profileRow">
                    <b>Role:</b>
                    <p>{getRole(userProfile?.role)}</p>
                  </div>
                  <div className="formRow profileRow">
                    <b>Gym:</b>
                    <p>{userProfile?.gymName}</p>
                  </div>
                </div>
              </>
            ) : (
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
                  {users?.map((user) => {
                    if (user?.id === 0) return null;
                    return (
                      <tr key={user?.id}>
                        <th scope="row"> {user?.id}</th>
                        <td>{user?.name} </td>
                        <td>{user?.email}</td>
                        <td>{getRole(user?.role)}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-xs btn-default hvr-icon-grow fa-eye col-9"
                            onClick={() => {
                              setUserProfile(user);
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
            )}
          </div>

          {/* <div
            className="bs-example widget-shadow"
            data-example-id="contextual-table"
          >
            <h4>Colored Rows Table:</h4>
            <table className="table">
              {" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th>#</th> <th>Column heading</th> <th>Column heading</th>{" "}
                  <th>Column heading</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                <tr className="active">
                  {" "}
                  <th scope="row">1</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr>
                  {" "}
                  <th scope="row">2</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr className="success">
                  {" "}
                  <th scope="row">3</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr>
                  {" "}
                  <th scope="row">4</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr className="info">
                  {" "}
                  <th scope="row">5</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr>
                  {" "}
                  <th scope="row">6</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr className="warning">
                  {" "}
                  <th scope="row">7</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr>
                  {" "}
                  <th scope="row">8</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
                <tr className="danger">
                  {" "}
                  <th scope="row">9</th> <td>Column content</td>{" "}
                  <td>Column content</td> <td>Column content</td>{" "}
                </tr>{" "}
              </tbody>{" "}
            </table>
          </div> */}
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                    <input
                      {...register("phone", { required: true })}
                      type="text"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Phone number"
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
                      <label>
                        <input type="radio" value="4" {...register("role")} />
                        Super Admin
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
              {/* {0 ? (
                <div>
                  <div className="loader" />
                </div>
              ) : ( */}
              <button
                type="button"
                className={`btn btn-warning ${isDisable && "disabled"}`}
                onClick={createUser}
              >
                Submit
              </button>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
