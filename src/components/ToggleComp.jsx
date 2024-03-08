import PropTypes from "prop-types";

export default function ToggleComp({ isChecked, handleToggle, labelText }) {
  return (
    <div className="toggleBox">
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onClick={() => {
            handleToggle();
          }}
        />
        <span className="slider round"></span>
      </label>
      <div style={{ marginLeft: "1.25rem", width: "80%" }}>{labelText}</div>
    </div>
  );
}

ToggleComp.defaultProps = {
  isChecked: false,
  handleToggle: () => {},
};
ToggleComp.propTypes = {
  isChecked: PropTypes.bool,
  handleToggle: PropTypes.func,
  labelText: PropTypes.string,
};
