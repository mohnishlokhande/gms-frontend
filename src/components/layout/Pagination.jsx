import PropTypes from "prop-types";

export default function Pagination(props) {
  const { total, offset, setOffset } = props;

  const pg = Math.ceil(total / 20);
  const numbers = Array.from({ length: pg }, (_, index) => index + 1);

  return (
    <div className="paginationAlign">
      <ul className="pagination pagination-sm">
        <li
          onClick={() => {
            if (offset > 0) setOffset((state) => state - 1);
          }}
          className={offset <= 0 ? "disabled" : ""}
        >
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">«</span>
          </a>
        </li>
        {numbers.map((number) => (
          <li
            key={number}
            className={offset + 1 === number ? "active" : ""}
            onClick={() => {
              if (offset + 1 !== number) setOffset(number - 1);
            }}
          >
            <a href="#">{number}</a>
          </li>
        ))}
        <li
          onClick={() => {
            if (offset + 1 < pg) setOffset((state) => state + 1);
          }}
          className={offset + 1 >= pg ? "disabled" : ""}
        >
          <a href="#" aria-label="Next">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  total: PropTypes.number,
  offset: PropTypes.number,
  setOffset: PropTypes.func,
};
