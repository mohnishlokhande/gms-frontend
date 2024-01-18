import "../../assets/css/bootstrap.css";
import "../../assets/css/style.css";
import "../../assets/css/font-awesome.css";
import "../../assets/css/SidebarNav.min.css";
import "../../assets/css/custom.css";
import PropTypes from "prop-types";

const Layout = (props) => {
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
                  <a className="navbar-brand" href="index.html">
                    <span className="fa fa-area-chart"></span> Glance
                    <span className="dashboard_text">Design dashboard</span>
                  </a>
                </h1>
              </div>
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="sidebar-menu">
                  <li className="header">MAIN NAVIGATION</li>
                  <li className="treeview">
                    <a href="index.html">
                      <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                    </a>
                  </li>
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-laptop"></i>
                      <span>Components</span>
                      <i className="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="grids.html">
                          <i className="fa fa-angle-right"></i> Grids
                        </a>
                      </li>
                      <li>
                        <a href="media.html">
                          <i className="fa fa-angle-right"></i> Media Css
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview">
                    <a href="charts.html">
                      <i className="fa fa-pie-chart"></i>
                      <span>Charts</span>
                      <span className="label label-primary pull-right">
                        new
                      </span>
                    </a>
                  </li>
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-laptop"></i>
                      <span>UI Elements</span>
                      <i className="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="general.html">
                          <i className="fa fa-angle-right"></i> General
                        </a>
                      </li>
                      <li>
                        <a href="icons.html">
                          <i className="fa fa-angle-right"></i> Icons
                        </a>
                      </li>
                      <li>
                        <a href="buttons.html">
                          <i className="fa fa-angle-right"></i> Buttons
                        </a>
                      </li>
                      <li>
                        <a href="typography.html">
                          <i className="fa fa-angle-right"></i> Typography
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="widgets.html">
                      <i className="fa fa-th"></i> <span>Widgets</span>
                      <small className="label pull-right label-info">08</small>
                    </a>
                  </li>
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-edit"></i> <span>Forms</span>
                      <i className="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="forms.html">
                          <i className="fa fa-angle-right"></i> General Forms
                        </a>
                      </li>
                      <li>
                        <a href="validation.html">
                          <i className="fa fa-angle-right"></i> Form Validations
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-table"></i> <span>Tables</span>
                      <i className="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="tables.html">
                          <i className="fa fa-angle-right"></i> Simple tables
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-envelope"></i> <span>Mailbox</span>
                      <i className="fa fa-angle-left pull-right"></i>
                      <small className="label pull-right label-info1">08</small>
                      <span className="label label-primary1 pull-right">
                        02
                      </span>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="inbox.html">
                          <i className="fa fa-angle-right"></i> Mail Inbox
                        </a>
                      </li>
                      <li>
                        <a href="compose.html">
                          <i className="fa fa-angle-right"></i> Compose Mail{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview">
                    <a href="#">
                      <i className="fa fa-folder"></i> <span>Examples</span>
                      <i className="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul className="treeview-menu">
                      <li>
                        <a href="login.html">
                          <i className="fa fa-angle-right"></i> Login
                        </a>
                      </li>
                      <li>
                        <a href="signup.html">
                          <i className="fa fa-angle-right"></i> Register
                        </a>
                      </li>
                      <li>
                        <a href="404.html">
                          <i className="fa fa-angle-right"></i> 404 Error
                        </a>
                      </li>
                      <li>
                        <a href="500.html">
                          <i className="fa fa-angle-right"></i> 500 Error
                        </a>
                      </li>
                      <li>
                        <a href="blank-page.html">
                          <i className="fa fa-angle-right"></i> Blank Page
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="header">LABELS</li>
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
                  </li>
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
          {/* <div className="header-right">
          <div className="search-box">
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
          </div>

          <div className="profile_details">
            <ul>
              <li className="dropdown profile_details_drop">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="profile_img">
                    <span className="prfil-img">
                      <img src="images/2.jpg" alt="" />{" "}
                    </span>
                    <div className="user-name">
                      <p>Admin Name</p>
                      <span>Administrator</span>
                    </div>
                    <i className="fa fa-angle-down lnr"></i>
                    <i className="fa fa-angle-up lnr"></i>
                    <div className="clearfix"></div>
                  </div>
                </a>
                <ul className="dropdown-menu drp-mnu">
                  <li>
                    {" "}
                    <a href="#">
                      <i className="fa fa-cog"></i> Settings
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="fa fa-user"></i> My Account
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="fa fa-suitcase"></i> Profile
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a href="#">
                      <i className="fa fa-sign-out"></i> Logout
                    </a>{" "}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="clearfix"> </div>
        </div> */}
          <div className="clearfix"> </div>
        </div>
        {props.children}
        {/* <div id="page-wrapper">
          <div className="main-page signup-page">
            <h2 className="title1">SignUp Here</h2>
            <div className="sign-up-row widget-shadow">
              <h5>Personal Information :</h5>
              <form action="#" method="post">
                <div className="sign-u">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    required=""
                  />
                  <div className="clearfix"> </div>
                </div>
                <div className="sign-u">
                  <input type="text" placeholder="Last Name" required="" />
                  <div className="clearfix"> </div>
                </div>
                <div className="sign-u">
                  <input type="email" placeholder="Email Address" required="" />
                  <div className="clearfix"> </div>
                </div>
                <div className="sign-u">
                  <div className="sign-up1">
                    <h4>Gender* :</h4>
                  </div>
                  <div className="sign-up2">
                    <label>
                      <input type="radio" name="Gender" required="" />
                      Male
                    </label>
                    <label>
                      <input type="radio" name="Gender" required="" />
                      Female
                    </label>
                  </div>
                  <div className="clearfix"> </div>
                </div>
                <h6>Login Information :</h6>
                <div className="sign-u">
                  <input type="password" placeholder="Password" required="" />
                  <div className="clearfix"> </div>
                </div>
                <div className="sign-u">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required=""
                  />
                </div>
                <div className="clearfix"> </div>
                <div className="sub_home">
                  <input type="submit" value="Submit" />
                  <div className="clearfix"> </div>
                </div>
                <div className="registration">
                  Already Registered.
                  <a className="" href="login.html">
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        <div className="footer">
          <p>
            &copy; 2018 Glance Design Dashboard. All Rights Reserved | Design by{" "}
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
  // header: PropTypes.bool,
  // aside: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
