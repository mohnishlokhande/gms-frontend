import { useRef, useState } from "react";
import AddMembership from "../components/AddMembership";
import { useUserProfileStore } from "../store/userStore";
import { getRole } from "../utils/helper";
import MembershipHistory from "../components/MembershipHistory";
import { useGetAPI } from "../api/Apis";
import EditUserModal from "../components/EditUserModal";

export default function UserProfile() {
  const [viewMembership, setViewMemberhip] = useState(true);
  const userProfile = useUserProfileStore((state) => state.user);
  const [isModal, setIsModal] = useState(false);

  let id = undefined;
  const pathname = window?.location?.pathname;
  let temp = pathname.match(/\/users\/(\d+)/);
  if (temp) {
    id = temp[1];
  }

  const modalBtnRef = useRef(null);

  useGetAPI(`user/${id}`, "user");
  useGetAPI("gyms", "gyms");

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
                onClick={() => {
                  setIsModal(true);
                }}
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

      {isModal && <EditUserModal modalBtnRef={modalBtnRef} />}
    </div>
  );
}
