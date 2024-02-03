import PropTypes from "prop-types";
import ProfileActions from "./ProfileActions";
// import { useAccountStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {
  const navigate = useNavigate();

  const pathName = window?.location?.pathname;
  let dashboardClassName = "treeview";
  let usersClassName = "treeview";
  let gymsClassName = "treeview";
  let membershipsClassName = "treeview";
  let leadsClassName = "treeview";

  switch (pathName) {
    case "/": {
      dashboardClassName += " active";
      break;
    }
    case "/users": {
      usersClassName += " active";
      break;
    }
    case "/gym": {
      gymsClassName += " active";
      break;
    }
    case "/membership": {
      membershipsClassName += " active";
      break;
    }
    case "/leads": {
      leadsClassName += " active";
      break;
    }
  }

  return (
    <body className="cbp-spmenu-push">
      <div className="main-content">
        <div
          className="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left"
          id="cbp-spmenu-s1"
        >
          <aside className="sidebar-left">
            <nav className="navbar navbar-inverse">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target=".collapse"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <h1>
                  <a className="navbar-brand" href="/">
                    <span className="fa fa-area-chart"></span> GMS
                    <span className="dashboard_text">
                      Gym Management System
                    </span>
                  </a>
                </h1>
              </div>
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
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
                    </a>
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
              </div>
            </nav>
          </aside>
        </div>
        <div className="sticky-header header-section">
          <div className="header-left">
            <button id="showLeftPush">
              <i className="fa fa-bars"></i>
            </button>
            <div className="profile_details_left">
              <ul className="nofitications-dropdown">
                <li className="dropdown head-dpdn">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-envelope"></i>
                    <span className="badge">4</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="notification_header">
                        <h3>You have 3 new messages</h3>
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        <div className="user_img">
                          <img src="images/1.jpg" alt="" />
                        </div>
                        <div className="notification_desc">
                          <p>Lorem ipsum dolor amet</p>
                          <p>
                            <span>1 hour ago</span>
                          </p>
                        </div>
                        <div className="clearfix"></div>
                      </a>
                    </li>
                    <li className="odd">
                      <a href="#">
                        <div className="user_img">
                          <img src="images/4.jpg" alt="" />
                        </div>
                        <div className="notification_desc">
                          <p>Lorem ipsum dolor amet </p>
                          <p>
                            <span>1 hour ago</span>
                          </p>
                        </div>
                        <div className="clearfix"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="user_img">
                          <img src="images/3.jpg" alt="" />
                        </div>
                        <div className="notification_desc">
                          <p>Lorem ipsum dolor amet </p>
                          <p>
                            <span>1 hour ago</span>
                          </p>
                        </div>
                        <div className="clearfix"></div>
                      </a>
                    </li>
                    <li>
                      <div className="notification_bottom">
                        <a href="#">See all messages</a>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="dropdown head-dpdn">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-bell"></i>
                    <span className="badge blue">4</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="notification_header">
                        <h3>You have 3 new notification</h3>
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        <div className="user_img">
                          <img src="images/4.jpg" alt="" />
                        </div>
                        <div className="notification_desc">
                          <p>Lorem ipsum dolor amet</p>
                          <p>
                            <span>1 hour ago</span>
                          </p>
                        </div>
                        <div className="clearfix"></div>
                      </a>
                    </li>
                    <li className="odd">
                      <a href="#">
                        <div className="user_img">
                          <img src="images/1.jpg" alt="" />
                        </div>
                        <div className="notification_desc">
                          <p>Lorem ipsum dolor amet </p>
                          <p>
                            <span>1 hour ago</span>
                          </p>
                        </div>
                        <div className="clearfix"></div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="user_img">
                          <img src="images/3.jpg" alt="" />
                        </div>
                        <div className="notification_desc">
                          <p>Lorem ipsum dolor amet </p>
                          <p>
                            <span>1 hour ago</span>
                          </p>
                        </div>
                        <div className="clearfix"></div>
                      </a>
                    </li>
                    <li>
                      <div className="notification_bottom">
                        <a href="#">See all notifications</a>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="dropdown head-dpdn">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-tasks"></i>
                    <span className="badge blue1">8</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <div className="notification_header">
                        <h3>You have 8 pending task</h3>
                      </div>
                    </li>
                    <li>
                      <a href="#">
                        <div className="task-info">
                          <span className="task-desc">Database update</span>
                          <span className="percentage">40%</span>
                          <div className="clearfix"></div>
                        </div>
                        <div className="progress progress-striped active">
                          <div
                            className="bar yellow"
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="task-info">
                          <span className="task-desc">Dashboard done</span>
                          <span className="percentage">90%</span>
                          <div className="clearfix"></div>
                        </div>
                        <div className="progress progress-striped active">
                          <div
                            className="bar green"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="task-info">
                          <span className="task-desc">Mobile App</span>
                          <span className="percentage">33%</span>
                          <div className="clearfix"></div>
                        </div>
                        <div className="progress progress-striped active">
                          <div
                            className="bar red"
                            style={{ width: "33%" }}
                          ></div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="task-info">
                          <span className="task-desc">Issues fixed</span>
                          <span className="percentage">80%</span>
                          <div className="clearfix"></div>
                        </div>
                        <div className="progress progress-striped active">
                          <div
                            className="bar  blue"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="notification_bottom">
                        <a href="#">See all pending tasks</a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="clearfix"> </div>
            </div>
            <div className="clearfix"> </div>
          </div>
          <div className="header-right">
            {/* <div className="search-box">
              <form className="input">
                <input
                  className="sb-search-input input__field--madoka"
                  placeholder="Search..."
                  type="search"
                  id="input-31"
                />
                <label className="input__label" htmlFor="input-31">
                  <svg
                    className="graphic"
                    width="100%"
                    height="100%"
                    viewBox="0 0 404 77"
                    preserveAspectRatio="none"
                  >
                    <path d="m0,0l404,0l0,77l-404,0l0,-77z" />
                  </svg>
                </label>
              </form>
            </div> */}

            <ProfileActions />

            <div className="clearfix"> </div>
          </div>
          <div className="clearfix"> </div>
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