import { useState } from "react";
import AddMembership from "../components/AddMembership";
import { useUserProfileStore } from "../store/userStore";
import { getRole } from "../utils/helper";
import MembershipHistory from "../components/MembershipHistory";

export default function UserProfile() {
  // const navigate = useNavigate();

  const [viewMembership, setViewMemberhip] = useState(true);
  const userProfile = useUserProfileStore((state) => state.user);

  // const userProfile = useUserProfileStore((state) => state.user);
  // const setUserProfile = useUserProfileStore((state) => state.setUser);
  // const memberships = useMembershipsStore((state) => state.memberships);
  // const updateMemberships = useMembershipsStore(
  //   (state) => state.setMemberships
  // );

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
            <h3>Member Information</h3>

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
          <MembershipHistory />
        ) : (
          <AddMembership setViewMemberhip={setViewMemberhip} />
        )}
      </div>
    </div>
  );
}
