import { getFormatDate } from "../utils/helper";

export default function TabToggle() {
  const MembershipExpiry = [
    {
      name: "Rohan Kumar",
      membershipName: "Advanced membership",
      expiryDate: "2021-09-01",
    },
    {
      name: "Membership 2",
      membershipName: " 1 Month",
      expiryDate: "2021-09-01",
    },
    {
      name: "Membership 3",
      membershipName: " 3 Month",
      expiryDate: "2021-09-01",
    },
    {
      name: "Prajjwal",
      membershipName: " Basic membership",
      expiryDate: "2021-09-01",
    },
  ];

  const MembershipOverdues = [
    {
      name: "Ayush Kumar",
      membershipName: "Premium membership",
      expiryDate: "2024-09-01",
    },
    {
      name: "Rakesh",
      membershipName: " 1 Month",
      expiryDate: "2021-10-01",
    },
    {
      name: "Abhishek Kumar",
      membershipName: "6 Month",
      expiryDate: "2021-09-09",
    },
  ];
  const tabBlock = (blockData, type = "") => {
    return (
      <>
        <div style={{ padding: "0.5rem 0rem" }}>
          <h4>{blockData?.name}</h4>
          <div className="membershipEnd">
            <p>
              {blockData?.membershipName}{" "}
              {type === "expiry" ? "ends" : "overdues"}
            </p>
            &nbsp;
            <b>{getFormatDate(blockData?.expiryDate)} </b>
          </div>
        </div>
        <hr style={{ margin: "0" }} />
      </>
    );
  };

  return (
    <div
      className="col-md-6 general-grids widget-shadow"
      style={{ marginBottom: "1rem" }}
    >
      <ul id="myTabs" className="nav nav-tabs" role="tablist">
        <li role="presentation" className="active">
          <a
            href="#home"
            id="home-tab"
            role="tab"
            data-toggle="tab"
            aria-controls="home"
            aria-expanded="false"
          >
            Membership Expiries{" "}
            <span className="badge">{MembershipExpiry?.length}</span>
          </a>
        </li>
        <li role="presentation" className="">
          <a
            href="#profile"
            role="tab"
            id="profile-tab"
            data-toggle="tab"
            aria-controls="profile"
            aria-expanded="true"
          >
            Membership Overdues{" "}
            <span className="badge">{MembershipOverdues?.length}</span>
          </a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content scrollbar1">
        <div
          role="tabpanel"
          className="tab-pane fade active in"
          id="home"
          aria-labelledby="home-tab"
          style={{ height: "100%" }}
        >
          {MembershipExpiry?.length === 0 ? (
            <div className="emptyList">No membership expiries today</div>
          ) : (
            MembershipExpiry?.map((blockData) => {
              return tabBlock(blockData, "expiry");
            })
          )}
        </div>

        <div
          role="tabpanel"
          className="tab-pane fade"
          id="profile"
          aria-labelledby="profile-tab"
          style={{ height: "100%" }}
        >
          {MembershipOverdues?.length === 0 ? (
            <div className="emptyList">No membership overdues today</div>
          ) : (
            MembershipOverdues?.map((blockData) => {
              return tabBlock(blockData);
            })
          )}
        </div>
      </div>
    </div>
  );
}
