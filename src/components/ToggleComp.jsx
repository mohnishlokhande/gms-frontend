import PropTypes from "prop-types";

export default function ToggleComp({ isChecked, setIsChecked, labelText }) {
  return (
    <div className="toggleBox">
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onClick={() => {
            setIsChecked((e) => !e);
          }}
        />
        <span className="slider round"></span>
      </label>

      {labelText}
    </div>
  );
}

ToggleComp.propTypes = {
  isChecked: PropTypes.bool,
  setIsChecked: PropTypes.func,
  labelText: PropTypes.string,
};
