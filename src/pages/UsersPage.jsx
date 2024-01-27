import { useEffect, useRef } from "react";
import { useGetAPI, usePostAPI } from "../api/Apis";
import { useRefetchStore, useUsersStore } from "../store/userStore";
import { getRole } from "../utils/helper";
import { useForm } from "react-hook-form";

export default function UsersPage() {
  const usersCount = useRefetchStore((state) => state.usersCount);
  const refetchUsers = useRefetchStore((state) => state.refetchUsers);

  const modalBtnRef = useRef(null);

  const { data: { users: usersData = [] } = {} } = useGetAPI(
    "users",
    usersCount
  );
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();

  const users = useUsersStore((state) => state.users);
  const updateUsers = useUsersStore((state) => state.setUsers);

  const name = watch("name");
  const password = watch("password");
  const email = watch("email");
  const role = watch("role");
  const phone = watch("phone");
  const gender = watch("gender");

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
    };
    mutate(payload);
  };

  const isDisable = name === "" || password === "" || phone === "";
  email === "" || role === null || gender === null;

  useEffect(() => {
    if (usersData != undefined && Object.keys(usersData).length !== 0) {
      updateUsers(usersData);
    }
  }, [usersData]);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Users</h2>
            <button
              type="button"
              className="btn btn-primary btn-flat btn-pri btn-lg"
              data-toggle="modal"
              data-target="#gridSystemModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add user
            </button>
          </div>

          <div className="panel-body widget-shadow">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
