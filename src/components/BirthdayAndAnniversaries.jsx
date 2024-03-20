import { getFormatDate } from "../utils/helper";

export default function BirthdayAndAnniversaries() {
  const eventsData = [
    {
      name: "Sachin",
      eventName: "Marriage Anniversaries",
      date: "2021-09-01",
    },
    {
      name: "Mohnish",
      eventName: "Birthday",
      date: "2021-09-01",
    },
  ];

  const tabBlock = (blockData) => {
    return (
      <>
        <div style={{ padding: "0.5rem 0rem" }}>
          <h4>{blockData?.name}</h4>
          <div className="membershipEnd">
            <p>{blockData?.eventName}</p>&nbsp;
            <b>{getFormatDate(blockData?.date)} </b>
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
      <ul id="myEvents" className="nav nav-tabs" role="tablist">
        <li role="presentation" className="active">
          <a
            id="event-tab"
            role="tab"
            data-toggle="tab"
            aria-controls="event"
            aria-expanded="true"
          >
            Birthdays & marriage anniversaries{" "}
            <span className="badge">{eventsData?.length}</span>
          </a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content scrollbar1">
        <div
          role="tabpanel"
          className="tab-pane fade active in"
          id="event"
          aria-labelledby="event-tab"
          style={{ height: "100%" }}
        >
          {eventsData?.length === 0 ? (
            <div className="emptyList">
              Oops!! No birthday & anniversaries today
            </div>
          ) : (
            eventsData?.map((blockData) => {
              return tabBlock(blockData);
            })
          )}
        </div>
      </div>
    </div>
  );
}
