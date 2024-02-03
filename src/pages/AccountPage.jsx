import { useAccountStore } from "../store/userStore";
import { getRole } from "../utils/helper";

export default function MyAccount() {
  const account = useAccountStore((state) => state.account);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">My Account</h2>
          </div>

          <div className="panel-body widget-shadow">
            <div className="userProfilePg">
              <div className="formRow">
                <b>Name:</b>
                <p>{account?.name}</p>
              </div>
              <div className="formRow">
                <b>Email:</b>
                <p>{account?.email}</p>
              </div>
              <div className="formRow">
                <b>Phone:</b>
                <p>{account?.phone}</p>
              </div>
              <div className="formRow">
                <b>Gender:</b>
                <p>{account?.gender}</p>
              </div>
              <div className="formRow">
                <b>Role:</b>
                <p>{getRole(account?.role)}</p>
              </div>
              <div className="formRow">
                <b>Gym:</b>
                <p>{account?.gymName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
