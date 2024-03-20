import BirthdayAndAnniversaries from "../components/BirthdayAndAnniversaries";
import LineChartGraph from "../components/LineChart";
import PieChartGraph from "../components/PieChart";
import TabToggle from "../components/TabToggle";

export default function Dashboard() {
  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div className="col-md-3 widget r3_counter_box">
            <i className="pull-left fa fa-user dollar2 icon-rounded"></i>
            <div className="stats">
              <h5>
                <strong>452</strong>
              </h5>
              <span>Active Users</span>
            </div>
          </div>

          <div className="col-md-3 widget r3_counter_box">
            <i className="pull-left fa fa-user-times user1 icon-rounded"></i>
            <div className="stats">
              <h5>
                <strong>19</strong>
              </h5>
              <span>Inactive Users</span>
            </div>
          </div>

          <div className="col-md-3 widget r3_counter_box">
            <i className="pull-left fa fa-users user2 icon-rounded"></i>
            <div className="stats">
              <h5>
                <strong>691</strong>
              </h5>
              <span>Total Users</span>
            </div>
          </div>
          <div className="col-md-3 widget r3_counter_box">
            <i className="pull-left fa fa-rocket dollar1 icon-rounded"></i>
            <div className="stats">
              <h5>
                <strong>150</strong>
              </h5>
              <span>Total Leads</span>
            </div>
          </div>
        </div>
        <div className="row-one widgettable chartContainer">
          <div className="col-md-5 pieChartBox">
            <div
              className="col-md-3 widget"
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              <div className="r3_counter_box">
                <i className="pull-left fa fa-window-close icon-rounded"></i>
                <div className="stats">
                  <h5>
                    <strong>1450</strong>
                  </h5>
                  <span>Total Plan Expiry</span>
                </div>
              </div>
            </div>

            <div className="content-top-2 card">
              <div className="card-header">
                <h3 style={{ paddingBottom: "1rem" }}>
                  New Membership / Renewal
                </h3>
              </div>
              <PieChartGraph />
            </div>
          </div>

          <div className="col-md-7 content-top-2 card">
            <div className="card-header">
              <h3 style={{ paddingBottom: "1rem" }}>Revenue</h3>
            </div>
            <LineChartGraph />
          </div>
        </div>
      </div>
      <div className="chartContainer rowCustom">
        <TabToggle />
        <BirthdayAndAnniversaries />
      </div>
    </div>
  );
}
