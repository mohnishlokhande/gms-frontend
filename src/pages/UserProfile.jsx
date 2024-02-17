import { useEffect, useRef, useState } from "react";
import AddMembership from "../components/AddMembership";
import { useRefetchStore, useUserProfileStore } from "../store/userStore";
import { getRole } from "../utils/helper";
import MembershipHistory from "../components/MembershipHistory";
import { useForm } from "react-hook-form";
import { useGymsStore } from "../store/secondaryStore";
import { useGetAPI, usePostAPI } from "../api/Apis";

export default function UserProfile() {
  const [viewMembership, setViewMemberhip] = useState(true);
  const userProfile = useUserProfileStore((state) => state.user);
  const setUserProfile = useUserProfileStore((state) => state.setUser);
  const gyms = useGymsStore((state) => state.gyms);
  const refetchUser = useRefetchStore((state) => state.refetchUser);

  let id = undefined;
  const pathname = window?.location?.pathname;
  let temp = pathname.match(/\/users\/(\d+)/);
  if (temp) {
    id = temp[1];
  }

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: userProfile?.name,
      role: userProfile?.role?.toString(),
      phone: userProfile?.phone,
      gymId: userProfile?.gymId?.toString(),
      dob: userProfile?.dob,
      marriageAnniversary: userProfile?.marriageAnniversary,
      address: userProfile?.address,
    },
  });
  const modalBtnRef = useRef(null);

  const toogleModal = () => {
    if (modalBtnRef.current) {
      modalBtnRef.current.click();
    }
  };

  const name = watch("name");
  const role = watch("role");
  const phone = watch("phone");
  const gymId = watch("gymId");

  const isDisable = false;

  const { data: userApiData = undefined } = useGetAPI(`user/${id}`);

  const { mutate } = usePostAPI({
    method: "patch",
    endPoint: `users/${userProfile?.id}`,
    onSuccess: () => {
      refetchUser();
      toogleModal();
    },
    onError: (err) => {
      console.log("###$@$", err);
    },
  });

  const updateUser = () => {
    const payload = {
      name,
      role: Number(role),
      phone,
      gymId: Number(gymId),
    };
    mutate(payload);
  };

  useEffect(() => {
    if (userApiData) {
      setUserProfile(userApiData);
    }
  }, [userApiData]);

  // console.log("####", name, role, phone, gymId);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="customHeaderPg">
          <h2 className="title1">
            <i className="fa fa-user-o" aria-hidden="true"></i> Member Profile
          </h2>
          {/* {!viewMembership && (
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                // navigate(`/users`);
                // setUserProfile({});
              }}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
            </button>
          )} */}
        </div>
        <div className="innerDiv">
          <div className="panel-body widget-shadow" style={{ width: "80%" }}>
            <h3>
              Member Information&nbsp;&nbsp;
              <i
                ref={modalBtnRef}
                className="fa fa-pencil clickable"
                aria-hidden="true"
                type="button"
                data-toggle="modal"
                data-target="#gridSystemModal"
              ></i>
            </h3>
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
            <div className="alignRight">
              <p onClick={() => setViewMemberhip((a) => !a)}>
                {viewMembership ? "Add membersip" : "View history membersip"}
              </p>
            </div>
          </div>
        </div>

        {viewMembership ? (
          <MembershipHistory id={id} />
        ) : (
          <AddMembership setViewMemberhip={setViewMemberhip} />
        )}
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
                Update user
              </h4>
            </div>
            <div className="modal-body">
              <div>
                <form onSubmit={handleSubmit(updateUser)}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                      {...register("name")}
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                    <input
                      {...register("phone")}
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
                      {/* <label>
                        <input type="radio" value="3" {...register("role")} />
                        Admin
                      </label> */}
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
              {/* {0 ? (
                <div>
                  <div className="loader" />
                </div>
              ) : ( */}
              <button
                type="button"
                className={`btn btn-warning ${isDisable && "disabled"}`}
                onClick={updateUser}
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
