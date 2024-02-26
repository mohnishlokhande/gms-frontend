import { useRef, useState } from "react";
import { useGetAPI, usePostAPI } from "../api/Apis";
import { useRefetchStore, useUsersStore } from "../store/userStore";
import { useForm } from "react-hook-form";
import { useGymsStore } from "../store/secondaryStore";
import { getFormatDate } from "../utils/helper";
import Pagination from "../components/layout/Pagination";

export default function GymPage() {
  const gymCount = useRefetchStore((state) => state.gymCount);
  const refetchGyms = useRefetchStore((state) => state.refetchGyms);

  const modalBtnRef = useRef(null);
  const [offset, setOffset] = useState(0);

  const { data: { total: totalGyms = 0 } = {} } = useGetAPI(
    `gyms?limit=20&offset=${offset}`,
    "gyms",
    gymCount
  );
  useGetAPI("users", "users", 1);
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      isHeadOffice: "1",
    },
  });

  const gyms = useGymsStore((state) => state.gyms);
  const users = useUsersStore((state) => state.users);

  const name = watch("name");
  const address = watch("address");
  const isHeadOffice = Number(watch("isHeadOffice"));
  const parent = watch("parent");
  const owner = watch("owner");

  const toogleModal = () => {
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
      reset();
    }
  };

  const { mutate, isLoading: isAddGymLoading } = usePostAPI({
    endPoint: "gym",
    onSuccess: () => {
      refetchGyms();
      toogleModal();
    },
    onError: (err) => {
      console.log("###$@$", err);
      toogleModal();
    },
  });

  const createGym = () => {
    let payload = {
      name,
      is_head_office: isHeadOffice ? true : false,
      address,
      parent_id: Number(parent),
      owner_id: Number(owner),
    };
    if (!isHeadOffice && parent !== "-1" && parent !== undefined) {
      payload = { ...payload, parent_id: Number(parent) };
    }
    if (owner !== "-1") {
      payload = { ...payload, owner_id: Number(owner) };
    }
    mutate(payload);
  };

  const isDisable =
    isAddGymLoading === true ||
    name === "" ||
    address === "" ||
    owner === -1 ||
    (isHeadOffice === 0 && (parent === undefined || parent === -1));

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Gym</h2>
            <button
              ref={modalBtnRef}
              type="button"
              className="btn btn-primary btn-flat btn-pri btn-lg"
              data-toggle="modal"
              data-target="#gridSystemModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add gym
            </button>
          </div>

          <div className="panel-body widget-shadow">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: "3%" }}>#</th>
                  <th>Name</th>
                  <th>Gym Owner</th>
                  <th>Parent Gym</th>
                  <th>Head Office</th>
                  <th>Address</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                {gyms?.map((gym, index) => {
                  if (gym?.id === 0) return null;
                  return (
                    <tr key={gym?.id}>
                      <th scope="row"> {index + 1}</th>
                      <td>{gym?.name} </td>
                      <td>{gym?.ownerName}</td>
                      <td>{gym?.parentName}</td>
                      <td>{gym?.isHeadOffice ? "yes" : "no"}</td>
                      <td>{gym?.address}</td>
                      <td>{getFormatDate(gym?.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination total={totalGyms} offset={offset} setOffset={setOffset} />
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
                Add gym
              </h4>
            </div>
            <div className="modal-body">
              <div>
                <form onSubmit={handleSubmit(createGym)}>
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
                    <label htmlFor="exampleInputEmail1">Address</label>
                    <input
                      {...register("address", { required: true })}
                      type="text"
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder="Address"
                    />
                  </div>

                  <div className="formRow form-group">
                    <label className="control-label">Is Head Office :</label>
                    <div style={{ display: "flex" }}>
                      <div>
                        <input
                          type="radio"
                          value={1}
                          {...register("isHeadOffice")}
                        />
                        True
                      </div>
                      <div>
                        <input
                          type="radio"
                          value={0}
                          {...register("isHeadOffice")}
                        />
                        False
                      </div>
                    </div>
                    <div className="clearfix"> </div>
                  </div>

                  <div className="form-group formRow">
                    <label className="control-label" style={{ width: "25%" }}>
                      Select Owner
                    </label>
                    <div style={{ width: "75%" }}>
                      <select
                        multiple=""
                        className="form-control1"
                        {...register("owner")}
                      >
                        <option value={-1}>Select the gym owner</option>

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
                  {!isHeadOffice && (
                    <div className="form-group formRow">
                      <label className="control-label" style={{ width: "25%" }}>
                        Select parent gym
                      </label>
                      <div style={{ width: "75%" }}>
                        <select
                          multiple=""
                          className="form-control1"
                          {...register("parent")}
                        >
                          <option value={-1}>None</option>
                          {gyms?.map((gym) => {
                            return (
                              <option value={gym?.id} key={gym?.id}>
                                {gym?.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  )}
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
                onClick={createGym}
              >
                {isAddGymLoading ? <div className="loader" /> : <>Submit </>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
