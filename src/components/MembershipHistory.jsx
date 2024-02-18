import { useGetAPI } from "../api/Apis";
import { useMembershipHistoryStore } from "../store/secondaryStore";
import { getFormatDate } from "../utils/helper";
import PropTypes from "prop-types";

export default function MembershipHistory({ id }) {
  const memberHistory = useMembershipHistoryStore((state) => state.history);

  useGetAPI(`users/${id}/membership/history`, "membershipHistory");

  return (
    <>
      <div className="innerDiv">
        <div style={{ width: "80%", paddingTop: "0.5rem" }}>
          <h3>Memberships</h3>
        </div>
      </div>

      {(memberHistory?.length === 0 ||
        memberHistory === null ||
        memberHistory === undefined) && (
        <div className="innerDiv">
          <div className="panel-body widget-shadow" style={{ width: "80%" }}>
            No membership found
          </div>
        </div>
      )}

      {memberHistory?.map((item) => {
        return (
          <div className="innerDiv" key={item?.id}>
            <div className="panel-body widget-shadow" style={{ width: "80%" }}>
              <div className="historyHeading">
                <h3 style={{ color: "#333" }}>{item?.membership_name}</h3>
                {item?.is_active ? (
                  <h5 style={{ color: "green" }}> ACTIVE </h5>
                ) : (
                  <h5 style={{ color: "grey" }}> INACTIVE </h5>
                )}
              </div>
              <h6>
                Valid from <b>{getFormatDate(item?.start_date)}</b> to{" "}
                <b>{getFormatDate(item?.end_date)}</b>
              </h6>
              <div className="historyAmount">
                <p>Amount: </p> Rs {item?.amount / 100}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

MembershipHistory.propTypes = {
  id: PropTypes.string.isRequired,
};
