import React from "react";
import "./checkbox.css";
import classnames from "classnames";

const Checkbox = ({
  label = "",
  className,
  disabled = false,
  indeterminate = false,
  ...props
}) => {
  const defaultRef = React.useRef();
  const resolvedRef = defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <label className={`checkbox_container ${className}`}>
      <input type="checkbox" ref={resolvedRef} disabled={disabled} {...props} />
      {label && (
        <span
          className="d-body"
          style={{ marginLeft: "2rem", textTransform: "capitalize" }}
        >
          {label}
        </span>
      )}
      <span className={classnames("checkmark", disabled && "disabled")}></span>
    </label>
  );
};

export default Checkbox;
