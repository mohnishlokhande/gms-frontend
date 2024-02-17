import { useForm } from "react-hook-form";
import { useGymsStore } from "../store/secondaryStore";
import { usePostAPI } from "../api/Apis";
import { useRefetchStore, useUserProfileStore } from "../store/userStore";
import PropTypes from "prop-types";

function EditUserModal({ modalBtnRef }) {
  const gyms = useGymsStore((state) => state.gyms);
  const userProfile = useUserProfileStore((state) => state.user);
  const refetchUser = useRefetchStore((state) => state.refetchUser);

  const toogleModal = () => {
    if (modalBtnRef?.current) {
      modalBtnRef?.current?.click();
    }
  };
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

  const name = watch("name");
  const role = watch("role");
  const phone = Number(watch("phone"));
  const gymId = watch("gymId");
  const dob = watch("dob");
  const marriageAnniversary = watch("marriageAnniversary");
  const address = watch("address");

  const isDisable = false;

  const updateUser = () => {
    const payload = {
      name,
      role: Number(role),
      phone,
      gymId: Number(gymId),
      dob: dob,
      marriageAnniversary: marriageAnniversary,
      address: address,
    };
    mutate(payload);
  };

  return (
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
                    type="number"
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

                <div className="form-group formRow">
                  <label className="control-label" style={{ width: "35%" }}>
                    Dob
                  </label>
                  <input
                    type="date"
                    {...register("dob")}
                    style={{ width: "65%" }}
                  />
                </div>
                <div className="form-group formRow">
                  <label className="control-label" style={{ width: "35%" }}>
                    Marriage Anniversary
                  </label>
                  <input
                    type="date"
                    {...register("marriageAnniversary")}
                    style={{ width: "65%" }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Address</label>
                  <input
                    {...register("address")}
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Address"
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
              onClick={updateUser}
            >
              Submit
            </button>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;

EditUserModal.propTypes = {
  modalBtnRef: PropTypes.object.isRequired,
};
