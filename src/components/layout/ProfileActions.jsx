import UserImg from "../../assets/images/2.jpg";
import { useAccountStore } from "../../store/userStore";
import { getRole } from "../../utils/helper";

const ProfileActions = () => {
  const account = useAccountStore((state) => state.account);

  return (
    <div className="profile_details">
      <ul>
        <li className="dropdown profile_details_drop">
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="profile_img" style={{ display: "flex" }}>
              <span className="prfil-img">
                <img src={UserImg} alt="" />{" "}
              </span>
              <div className="user-name">
                <div>{account?.name}</div>
                <span>{getRole(account?.role)} </span>
              </div>
              <i className="fa fa-angle-down lnr"></i>
              <i className="fa fa-angle-up lnr"></i>
              <div className="clearfix"></div>
            </div>
          </a>
          <ul className="dropdown-menu drp-mnu">
            <li>
              <a href="#">
                <i className="fa fa-cog"></i> Settings
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-user"></i> My Account
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-suitcase"></i> Profile
              </a>
            </li>
            <li
              onClick={() => {
                console.log("###", "logout");
                localStorage.clear();
                window?.location?.reload();
              }}
            >
              <a>
                <i className="fa fa-sign-out"></i> Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ProfileActions;
