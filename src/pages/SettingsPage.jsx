import { useGetAPI, usePostAPI } from "../api/Apis";
import { useRefetchStore } from "../store/userStore";
import { useSettingsStore } from "../store/secondaryStore";
import SettingsToggle from "../components/SettingsToggle";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const settingsCount = useRefetchStore((state) => state.settingsCount);
  const refetchSettings = useRefetchStore((state) => state.refetchSettings);
  const settings = useSettingsStore((state) => state.settings);
  const isEdit = useSettingsStore((state) => state.isEdit);

  const [isChanged, setIsChanged] = useState(0);

  useGetAPI("users/settings", "settings", settingsCount);

  const isDisable = isChanged === 0 || isChanged === 1 || !isEdit;

  const { mutate, isLoading } = usePostAPI({
    method: "patch",
    endPoint: `user-settings`,
    onSuccess: () => {
      refetchSettings();
      setIsChanged(3);
    },
    onError: () => {
      setIsChanged(1);
    },
  });

  const updateSettings = () => {
    const payload = {
      ...settings,
    };
    mutate(payload);
  };

  console.log("###", settings, isEdit);

  useEffect(() => {
    if (isChanged !== 2 && isEdit) {
      setIsChanged(2);
    }
  }, [settings]);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Settings</h2>
          </div>

          {isChanged === 3 && (
            <div className="successText">
              Your setting are saved successfully.
            </div>
          )}
          <div className="settingsContainer">
            <div className="settingBox">
              <h4>SMS</h4>
              <SettingsToggle toggleKey="automaticBirthdayWishesSms" />
              <SettingsToggle toggleKey="automaticMarriageAnniversaryWishesSms" />
              <SettingsToggle toggleKey="automaticMembershipAnniversaryWishesSms" />
              <SettingsToggle toggleKey="automaticExpirySevenDaySms" />
              <SettingsToggle toggleKey="automaticExpiryBeforeDaySms" />
            </div>
            <div className="settingBox">
              <h4>Email</h4>
              <SettingsToggle toggleKey="automaticBirthdayWishesEmail" />
              <SettingsToggle toggleKey="automaticMarriageAnniversaryWishesEmail" />
              <SettingsToggle toggleKey="automaticMembershipAnniversaryWishesEmail" />
              <SettingsToggle toggleKey="automaticExpirySevenDayEmail" />
              <SettingsToggle toggleKey="automaticExpiryBeforeDayEmail" />
            </div>
            <div className="settingBox">
              <h4>WhatsApp</h4>
              <SettingsToggle toggleKey="automaticBirthdayWishesWa" />
              <SettingsToggle toggleKey="automaticMarriageAnniversaryWishesWa" />
              <SettingsToggle toggleKey="automaticMembershipAnniversaryWishesWa" />
              <SettingsToggle toggleKey="automaticExpirySevenDayWa" />
              <SettingsToggle toggleKey="automaticExpiryBeforeDayWa" />
              {isChanged === 1 && (
                <div className="errorText" style={{ padding: "1rem 0rem" }}>
                  Api failed due to some internal reason. Please try again after
                  some time.
                </div>
              )}
            </div>
          </div>
          <div className="alignRight" style={{ marginTop: "1rem" }}>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => {
                refetchSettings();
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className={`btn btn-warning ${isDisable && "disabled"}`}
              style={{ marginLeft: "1rem" }}
              onClick={updateSettings}
            >
              {isLoading ? <div className="loader" /> : <>Update settings </>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
