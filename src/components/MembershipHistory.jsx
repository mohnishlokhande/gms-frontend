import { useEffect } from "react";
import { useGetAPI } from "../api/Apis";
import { useMembershipHistoryStore } from "../store/secondaryStore";
import { useUserProfileStore } from "../store/userStore";
import { getFormatDate } from "../utils/helper";

export default function MembershipHistory() {
  const userProfile = useUserProfileStore((state) => state.user);
  const memberHistory = useMembershipHistoryStore((state) => state.history);
  const setMemberHistory = useMembershipHistoryStore(
    (state) => state.setHistory
  );

  const { data: { results: history = [], total = -1 } = {} } = useGetAPI(
    `users/${userProfile?.id}/membership/history`
  );

  useEffect(() => {
    console.log("###a", history, total);
    if (history != undefined && total !== -1) {
      console.log("###a", history, total);

      setMemberHistory(history);
    }
  }, [history]);

  return (
    <>
      <div className="innerDiv">
        <div style={{ width: "80%", paddingTop: "0.5rem" }}>
          <h3>Memberships</h3>
        </div>
      </div>

      {memberHistory?.map((item) => {
        return (
          <div className="innerDiv" key={item?.id}>
            <div className="panel-body widget-shadow" style={{ width: "80%" }}>
              <div className="historyHeading">
                <h3>{item?.membership_name}asddas</h3>
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
                <p>Amount: </p> Rs {item?.amount}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
