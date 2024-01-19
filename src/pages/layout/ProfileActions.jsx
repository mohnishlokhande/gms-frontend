import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import PropTypes from "prop-types";
import UserImg from "../../assets/images/2.jpg";

// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

// eslint-disable-next-line react/display-name
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">{children}</ul>
      </div>
    );
  }
);

const ProfileActions = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" as={CustomToggle}>
        <div className="dropdown profile_details_drop">
          <div className="profile_row">
            <span className="prfil-img">
              <img src={UserImg} alt="" />{" "}
            </span>
            <div className="user-name">
              <div>Admin Name</div>
              <span>Administrator</span>
            </div>
            <i className="fa fa-angle-down lnr"></i>
            <i className="fa fa-angle-up lnr"></i>
          </div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CustomMenu}
        style={{
          borderRadius: "0px",
          marginTop: "0.75rem",
          padding: "0.5rem 1rem 0.25rem 0.75rem",
        }}
        className="dropdown-menu drp-mnu"
      >
        <Dropdown.Item href="#/action-1" style={{ color: "#629aa9" }}>
          <i className="fa fa-cog"></i> Settings
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2" style={{ color: "#629aa9" }}>
          <i className="fa fa-user"></i> My Account
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" style={{ color: "#629aa9" }}>
          <i className="fa fa-suitcase"></i> Profile
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" style={{ color: "#629aa9" }}>
          <i className="fa fa-sign-out"></i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileActions;

CustomToggle.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

CustomMenu.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  "aria-labelledby": PropTypes.string,
};
