import { useRef, useState } from "react";
import AddMembership from "../components/AddMembership";
import { useRefetchStore, useUserProfileStore } from "../store/userStore";
import { getRole } from "../utils/helper";
import MembershipHistory from "../components/MembershipHistory";
import { useGetAPI } from "../api/Apis";
import EditUserModal from "../components/EditUserModal";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const [viewMembership, setViewMemberhip] = useState(true);
  const userProfile = useUserProfileStore((state) => state.user);
  const userCount = useRefetchStore((state) => state.userCount);
  const [isModal, setIsModal] = useState(false);

  let id = undefined;
  const pathname = window?.location?.pathname;
  let temp = pathname.match(/\/users\/(\d+)/);
  if (temp) {
    id = temp[1];
  }

  const modalBtnRef = useRef(null);

  useGetAPI(`user/${id}`, "user", userCount);
  useGetAPI("gyms", "gyms");

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="customHeaderPg">
          <ol className="breadcrumb title1">
            <li
              className="clickable"
              onClick={() => {
                navigate("/users");
              }}
            >
              <p style={{ color: "#629aa9" }}>Users</p>
            </li>
            <li className="active">User Profile</li>
          </ol>
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
                <div className="rowCustom">
                  <h4>Name:</h4>
                  <p>{userProfile?.name}</p>
                </div>
                <div className="rowCustom">
                  <h4>Contact:</h4>
                  <p>{userProfile?.email}</p>
                  {userProfile?.phone !== 0 && (
                    <>
                      ,<p>{userProfile?.phone}</p>
                    </>
                  )}
                </div>
                {userProfile?.dob !== "" && (
                  <div className="rowCustom">
                    <h4>Date of birth:</h4>
                    <p>{userProfile?.dob}</p>{" "}
                  </div>
                )}
                {userProfile?.marriageAnniversary !== "" && (
                  <div className="rowCustom">
                    <h4>Marriage Anniversary:</h4>
                    <p>{userProfile?.marriageAnniversary}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="rowCustom">
                  <h4>Role:</h4>
                  <p>{getRole(userProfile?.role)}</p>
                </div>
                {userProfile?.gymName !== "" &&
                  userProfile?.gymName !== undefined && (
                    <div className="rowCustom">
                      <h4>Gym:</h4>
                      <p>{userProfile?.gymName}</p>{" "}
                    </div>
                  )}
                {userProfile?.address !== "" && (
                  <div className="rowCustom">
                    <h4>Address:</h4>
                    <p>{userProfile?.address}</p>
                  </div>
                )}
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
