import PropTypes from "prop-types";
import ProfileActions from "./ProfileActions";
// import { useAccountStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { classChange } from "../../utils/helper";
// import classie from "assets/js/classie.js";

const Layout = (props) => {
  const navigate = useNavigate();

  let menuLeft = document.getElementById("cbp-spmenu-s1"),
    body = document.getElementById("mainBody"),
    leftHeader = document.getElementById("leftHeader");

  const pathName = window?.location?.pathname?.split("/");
  let dashboardClassName = "treeview";
  let usersClassName = "treeview";
  let gymsClassName = "treeview";
  let membershipsClassName = "treeview";
  let leadsClassName = "treeview";
  let notifyClassName = "treeview";

  switch (pathName[1]) {
    case "": {
      dashboardClassName += " active";
      break;
    }
    case "users": {
      usersClassName += " active";
      break;
    }
    case "gym": {
      gymsClassName += " active";
      break;
    }
    case "membership": {
      membershipsClassName += " active";
      break;
    }
    case "leads": {
      leadsClassName += " active";
      break;
    }
    case "notify": {
      notifyClassName += " active";
      break;
    }
  }

  const toggleMenu = () => {
    classChange(body, "cbp-spmenu-push-toright");
    classChange(menuLeft, "cbp-spmenu-open");
    // classChange(menuLeft, "cbp-spmenu-open");
    classChange(leftHeader, "marginLeft");
  };

  return (
    <body className="cbp-spmenu-push" id="mainBody">
      <div className="main-content">
        <div
          className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left"
          id="cbp-spmenu-s1"
        >
          <aside className="sidebar-left">
            <nav className="navbar navbar-inverse">
              <div className="navbar-header">
                <h1>
                  <a className="navbar-brand" href="/">
                    <span className="fa fa-area-chart"></span> GMS
                    <span className="dashboard_text">
                      Gym Management System
                    </span>
                  </a>
                </h1>
              </div>
              <ul className="sidebar-menu">
                <li className="header">MAIN NAVIGATION</li>
                <li className={dashboardClassName}>
                  <a
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                  </a>
                </li>
                <li className={usersClassName}>
                  <a
                    onClick={() => {
                      navigate("/users");
                    }}
                  >
                    <i className="fa fa-users"></i>
                    <span>Users</span>
                    <i className="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul className="treeview-menu">
                    <li className={pathName.length == 2 && "active"}>
                      <a
                        onClick={() => {
                          navigate("/users");
                        }}
                      >
                        <i className="fa fa-angle-right active"></i> All users
                      </a>
                    </li>
                    <li
                      className={
                        pathName.length > 2 &&
                        pathName[2] === "active" &&
                        "active"
                      }
                    >
                      <a
                        onClick={() => {
                          navigate("/users/active");
                        }}
                      >
                        <i className="fa fa-angle-right active"></i> Active
                        users
                      </a>
                    </li>
                    <li
                      className={
                        pathName.length > 2 &&
                        pathName[2] === "inactive" &&
                        "active"
                      }
                    >
                      <a
                        onClick={() => {
                          navigate("/users/inactive");
                        }}
                      >
                        <i className="fa fa-angle-right"></i> Inactive users
                      </a>
                    </li>
                  </ul>
                </li>
                <li className={gymsClassName}>
                  <a
                    onClick={() => {
                      navigate("/gym");
                    }}
                  >
                    <i className="fa fa-cogs"></i>
                    <span>GYM</span>
                  </a>
                </li>
                <li className={membershipsClassName}>
                  <a
                    onClick={() => {
                      navigate("/membership");
                    }}
                  >
                    <i className="fa fa-address-card-o"></i>
                    <span>Membership</span>
                  </a>
                </li>
                <li className={leadsClassName}>
                  <a
                    onClick={() => {
                      navigate("/leads");
                    }}
                  >
                    <i className="fa fa-rocket"></i>
                    <span>Leads</span>
                  </a>
                </li>
                <li className={notifyClassName}>
                  <a
                    onClick={() => {
                      navigate("/notify/single");
                    }}
                  >
                    <i className="fa fa-envelope"></i>
                    <span>Notify</span>
                    <i className="fa fa-angle-left pull-right"></i>
                  </a>

                  <ul className="treeview-menu">
                    <li
                      className={
                        pathName.length > 2 &&
                        pathName[2] === "single" &&
                        "active"
                      }
                    >
                      <a
                        onClick={() => {
                          navigate("/notify/single");
                        }}
                      >
                        <i className="fa fa-angle-right active"></i> Send single
                      </a>
                    </li>
                    <li
                      className={
                        pathName.length > 2 &&
                        pathName[2] === "bulk" &&
                        "active"
                      }
                    >
                      <a
                        onClick={() => {
                          navigate("/notify/bulk");
                        }}
                      >
                        <i className="fa fa-angle-right active"></i> Send bulk
                      </a>
                    </li>
                  </ul>
                </li>

                {/* <li className="header">LABELS</li>
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right text-red"></i>{" "}
                      <span>Important</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right text-yellow"></i>{" "}
                      <span>Warning</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right text-aqua"></i>{" "}
                      <span>Information</span>
                    </a>
                  </li> */}
              </ul>
            </nav>
          </aside>
        </div>
        <div className="sticky-header header-section">
          <div className="header-left" id="leftHeader">
            <button
              id="showLeftPush"
              onClick={() => {
                toggleMenu();
              }}
            >
              <i className="fa fa-bars"></i>
            </button>
          </div>
          <div className="header-right">
            <ProfileActions />
          </div>
        </div>
        {props.children}

        <div className="footer">
          <p>
            &copy; 2024 Gym Management System. All Rights Reserved | Design by{" "}
            {/* <a href="https://w3layouts.com/" target="_blank"> */}
            w3layouts
            {/* </a> */}
          </p>
        </div>
      </div>
    </body>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
