import ToggleComp from "./ToggleComp";
import PropTypes from "prop-types";
import { useSettingsStore } from "../store/secondaryStore";

const labelObj = {
  automaticBirthdayWishesSms: "Automatic Birthday Wishes Sms",
  automaticMarriageAnniversaryWishesSms:
    "Automatic Marriage Anniversary Wishes Sms",
  automaticMembershipAnniversaryWishesSms:
    "Automatic Membership Anniversary Wishes Sms",
  automaticExpirySevenDaySms: "Automatic Expiry Seven Day Sms",
  automaticExpiryBeforeDaySms: "Automatic Expiry Before Day Sms",
  automaticBirthdayWishesEmail: "Automatic Birthday Wishes Email",
  automaticMarriageAnniversaryWishesEmail:
    "Automatic Marriage Anniversary Wishes Email",
  automaticMembershipAnniversaryWishesEmail:
    "Automatic Membership Anniversary Wishes Email",
  automaticExpirySevenDayEmail: "Automatic Expiry Seven Day Email",
  automaticExpiryBeforeDayEmail: "Automatic Expiry Before Day Email",
  automaticBirthdayWishesWa: "Automatic Birthday Wishes WhatsApp",
  automaticMarriageAnniversaryWishesWa:
    "Automatic Marriage Anniversary Wishes WhatsApp",
  automaticMembershipAnniversaryWishesWa:
    "Automatic Membership Anniversary Wishes WhatsApp",
  automaticExpirySevenDayWa: "Automatic Expiry Seven Day WhatsApp",
  automaticExpiryBeforeDayWa: "Automatic Expiry Before Day WhatsApp",
};

export default function SettingsToggle({ toggleKey }) {
  const settings = useSettingsStore((state) => state.settings);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  const handleToggle = () => {
    updateSettings(toggleKey);
  };

  return (
    <ToggleComp
      isChecked={settings[toggleKey]}
      handleToggle={handleToggle}
      labelText={labelObj[toggleKey]}
    />
  );
}

SettingsToggle.propTypes = {
  toggleKey: PropTypes.string,
};
