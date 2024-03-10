import LineChartGraph from "../components/LineChart";

export default function Dashboard() {
  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="col_3">
          <div className="col-md-3 widget widget1">
            <div className="r3_counter_box">
              <i className="pull-left fa fa-dollar icon-rounded"></i>
              <div className="stats">
                <h5>
                  <strong>$452</strong>
                </h5>
                <span>Total Revenue</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 widget widget1">
            <div className="r3_counter_box">
              <i className="pull-left fa fa-laptop user1 icon-rounded"></i>
              <div className="stats">
                <h5>
                  <strong>$1019</strong>
                </h5>
                <span>Online Revenue</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 widget widget1">
            <div className="r3_counter_box">
              <i className="pull-left fa fa-money user2 icon-rounded"></i>
              <div className="stats">
                <h5>
                  <strong>$1012</strong>
                </h5>
                <span>Expenses</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 widget widget1">
            <div className="r3_counter_box">
              <i className="pull-left fa fa-pie-chart dollar1 icon-rounded"></i>
              <div className="stats">
                <h5>
                  <strong>$450</strong>
                </h5>
                <span>Expenditure</span>
              </div>
            </div>
          </div>
          <div className="col-md-3 widget">
            <div className="r3_counter_box">
              <i className="pull-left fa fa-users dollar2 icon-rounded"></i>
              <div className="stats">
                <h5>
                  <strong>1450</strong>
                </h5>
                <span>Total Users</span>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>

        <div className="row-one widgettable">
          <div className="col-md-7 content-top-2 card">
            {/* <div className="agileinfo-cdr"> */}
            <div className="card-header">
              <h3 style={{ paddingBottom: "1rem" }}>Weekly Sales</h3>
            </div>

            {/* <div style={{ width: "98%", height: "350px" }}> */}
            <LineChartGraph />
            {/* </div> */}
          </div>
          <div className="col-md-3 stat">
            <div className="content-top-1">
              <div className="col-md-6 top-content">
                <h5>Sales</h5>
                <label>1283+</label>
              </div>
              <div className="col-md-6 top-content1">
                <div
                  id="demo-pie-1"
                  className="pie-title-center"
                  data-percent="45"
                >
                  <span className="pie-value"></span>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="content-top-1">
              <div className="col-md-6 top-content">
                <h5>Reviews</h5>
                <label>2262+</label>
              </div>
              <div className="col-md-6 top-content1">
                <div
                  id="demo-pie-2"
                  className="pie-title-center"
                  data-percent="75"
                >
                  <span className="pie-value"></span>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="content-top-1">
              <div className="col-md-6 top-content">
                <h5>Visitors</h5>
                <label>12589+</label>
              </div>
              <div className="col-md-6 top-content1">
                <div
                  id="demo-pie-3"
                  className="pie-title-center"
                  data-percent="90"
                >
                  <span className="pie-value"></span>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="col-md-2 stat">
            <div className="content-top">
              <div className="top-content facebook">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </div>
              <ul className="info">
                <li className="col-md-6">
                  <b>1,296</b>
                  <p>Friends</p>
                </li>
                <li className="col-md-6">
                  <b>647</b>
                  <p>Likes</p>
                </li>
                <div className="clearfix"></div>
              </ul>
            </div>
            <div className="content-top">
              <div className="top-content twitter">
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </div>
              <ul className="info">
                <li className="col-md-6">
                  <b>1,997</b>
                  <p>Followers</p>
                </li>
                <li className="col-md-6">
                  <b>389</b>
                  <p>Tweets</p>
                </li>
                <div className="clearfix"></div>
              </ul>
            </div>
            <div className="content-top">
              <div className="top-content google-plus">
                <a href="#">
                  <i className="fa fa-google-plus"></i>
                </a>
              </div>
              <ul className="info">
                <li className="col-md-6">
                  <b>1,216</b>
                  <p>Followers</p>
                </li>
                <li className="col-md-6">
                  <b>321</b>
                  <p>shares</p>
                </li>
                <div className="clearfix"></div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
