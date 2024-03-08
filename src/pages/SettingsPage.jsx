import { useState } from "react";
import ToggleComp from "../components/ToggleComp";

export default function SettingsPage() {
  const [automaticBirthdayWishesSms, setAutomaticBirthdayWishesSms] =
    useState(false);
  const [
    automaticMarriageAnniversaryWishesSms,
    setAutomaticMarriageAnniversaryWishesSms,
  ] = useState(false);
  const [
    automaticMembershipAnniversaryWishesSms,
    setAutomaticMembershipAnniversaryWishesSms,
  ] = useState(false);
  const [automaticExpirySevenDaySms, setAutomaticExpirySevenDaySms] =
    useState(false);
  const [automaticExpiryBeforeDaySms, setAutomaticExpiryBeforeDaySms] =
    useState(false);
  const [automaticBirthdayWishesEmail, setAutomaticBirthdayWishesEmail] =
    useState(false);
  const [
    automaticMarriageAnniversaryWishesEmail,
    setAutomaticMarriageAnniversaryWishesEmail,
  ] = useState(false);
  const [
    automaticMembershipAnniversaryWishesEmail,
    setAutomaticMembershipAnniversaryWishesEmail,
  ] = useState(false);
  const [automaticExpirySevenDayEmail, setAutomaticExpirySevenDayEmail] =
    useState(false);
  const [automaticExpiryBeforeDayEmail, setAutomaticExpiryBeforeDayEmail] =
    useState(false);
  const [automaticBirthdayWishesWa, setAutomaticBirthdayWishesWa] =
    useState(false);
  const [
    automaticMarriageAnniversaryWishesWa,
    setAutomaticMarriageAnniversaryWishesWa,
  ] = useState(false);
  const [
    automaticMembershipAnniversaryWishesWa,
    setAutomaticMembershipAnniversaryWishesWa,
  ] = useState(false);
  const [automaticExpirySevenDayWa, setAutomaticExpirySevenDayWa] =
    useState(false);
  const [automaticExpiryBeforeDayWa, setAutomaticExpiryBeforeDayWa] =
    useState(false);

  return (
    <div id="page-wrapper">
      <div className="main-page">
        <div className="tables">
          <div className="customHeaderPg">
            <h2 className="title1">Settings</h2>
          </div>

          <div className="settingBox">
            <h4>SMS</h4>
            <ToggleComp
              isChecked={automaticBirthdayWishesSms}
              setIsChecked={setAutomaticBirthdayWishesSms}
              labelText="Automatic Birthday Wishes Sms"
            />
            <ToggleComp
              isChecked={automaticMarriageAnniversaryWishesSms}
              setIsChecked={setAutomaticMarriageAnniversaryWishesSms}
              labelText="Automatic Marriage Anniversary Wishes Sms"
            />
            <ToggleComp
              isChecked={automaticMembershipAnniversaryWishesSms}
              setIsChecked={setAutomaticMembershipAnniversaryWishesSms}
              labelText="Automatic Membership Anniversary Wishes Sms"
            />
            <ToggleComp
              isChecked={automaticExpirySevenDaySms}
              setIsChecked={setAutomaticExpirySevenDaySms}
              labelText="Automatic Expiry Seven Day Sms"
            />
            <ToggleComp
              isChecked={automaticExpiryBeforeDaySms}
              setIsChecked={setAutomaticExpiryBeforeDaySms}
              labelText="Automatic Expiry Before Day Sms"
            />
          </div>
          <div className="settingBox">
            <h4>Email</h4>
            <ToggleComp
              isChecked={automaticBirthdayWishesEmail}
              setIsChecked={setAutomaticBirthdayWishesEmail}
              labelText="Automatic Birthday Wishes Email"
            />
            <ToggleComp
              isChecked={automaticMarriageAnniversaryWishesEmail}
              setIsChecked={setAutomaticMarriageAnniversaryWishesEmail}
              labelText="Automatic Marriage Anniversary Wishes Email"
            />
            <ToggleComp
              isChecked={automaticMembershipAnniversaryWishesEmail}
              setIsChecked={setAutomaticMembershipAnniversaryWishesEmail}
              labelText="Automatic Membership Anniversary Wishes Email"
            />
            <ToggleComp
              isChecked={automaticExpirySevenDayEmail}
              setIsChecked={setAutomaticExpirySevenDayEmail}
              labelText="Automatic Expiry Seven Day Email"
            />
            <ToggleComp
              isChecked={automaticExpiryBeforeDayEmail}
              setIsChecked={setAutomaticExpiryBeforeDayEmail}
              labelText="Automatic Expiry Before Day Email"
            />
          </div>
          <div className="settingBox">
            <h4>WhatsApp</h4>
            <ToggleComp
              isChecked={automaticBirthdayWishesWa}
              setIsChecked={setAutomaticBirthdayWishesWa}
              labelText="Automatic Birthday Wishes WhatsApp"
            />
            <ToggleComp
              isChecked={automaticMarriageAnniversaryWishesWa}
              setIsChecked={setAutomaticMarriageAnniversaryWishesWa}
              labelText="Automatic Marriage Anniversary Wishes WhatsApp"
            />
            <ToggleComp
              isChecked={automaticMembershipAnniversaryWishesWa}
              setIsChecked={setAutomaticMembershipAnniversaryWishesWa}
              labelText="Automatic Membership Anniversary Wishes WhatsApp"
            />
            <ToggleComp
              isChecked={automaticExpirySevenDayWa}
              setIsChecked={setAutomaticExpirySevenDayWa}
              labelText="Automatic Expiry Seven Day WhatsApp"
            />
            <ToggleComp
              isChecked={automaticExpiryBeforeDayWa}
              setIsChecked={setAutomaticExpiryBeforeDayWa}
              labelText="Automatic Expiry Before Day WhatsApp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
