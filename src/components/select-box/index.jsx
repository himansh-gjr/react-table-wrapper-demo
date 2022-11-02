import React, { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import "./index.css";
import Arrow from "../../assets/image/arrow.png";
import { isUndefined } from "lodash";
import classNames from "classnames";

const SelectBox = ({
  value,
  onChange,
  options = [],
  className = "",
  containerStyle = {},
  register,
  helperText,
  error,
  tabIndex = "0",
  placeholder = "Select",
  defaultPosition = "bottom",
  enablePositionToggle = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(value);
  const [index, setIndex] = useState();
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    if (value) {
      const currentSelected = options.find((opt, i) => {
        if (opt.value === value) {
          setIndex(i);
          return opt;
        }
      });
      setSelected(currentSelected);
    }
  }, [value]);

  useEffect(() => {
    if (enablePositionToggle) {
      let element = document.getElementById("selectbox_content");
      if (element && isActive) {
        if (
          window.innerHeight - element.getBoundingClientRect().bottom <
          element.scrollHeight
        ) {
          setPosition("top");
        }
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (options.length > 0) {
      const element = document.getElementById(`selectbox_item_${index}`);
      element && element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [index]);

  const handleKeyDown = (e) => {
    if (isActive && options.length > 0 && e.keyCode === 40) {
      if (isUndefined(index)) {
        setIndex(0);
      } else {
        index + 1 <= options.length - 1 && setIndex((prev) => prev + 1);
      }
    }

    if (isActive && options.length > 0 && e.keyCode === 38) {
      if (index) {
        setIndex((prev) => {
          if (prev !== 0) {
            return prev - 1;
          }
        });
      }
    }

    if (options.length > 0 && e.keyCode === 13) {
      if (!isUndefined(index)) {
        setSelected(options[index]);
        onChange(options[index].value, options[index], index);
        setIsActive(false);
        setIndex();
      } else {
        setIsActive(!isActive);
      }
    }
  };

  return (
    <div className={`${className} selectbox`} style={containerStyle}>
      <ClickAwayListener
        onClickAway={(e) => {
          !e.target.id.includes("selectbox_item") && setIsActive(false);
        }}
      >
        <div
          className={`selectbox_btn ${error && error.message && "error"} ${
            isActive && "selection-active"
          }`}
          tabIndex={tabIndex}
          onKeyDown={handleKeyDown}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <span
            className="d-body"
            style={{
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {" "}
            {selected?.label || placeholder}
          </span>
          <img src={Arrow} />
          <select {...register} {...props}>
            {options.map((op, i) => (
              <option key={i} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>
      </ClickAwayListener>
      {isActive && (
        <div
          className={`selectbox_content ${enablePositionToggle && position}`}
          id="selectbox_content"
        >
          {options.map((option, id) => (
            <div
              key={`selectbox_item_${id}`}
              id={`selectbox_item_${id}`}
              className={classNames(
                `selectbox_item`,
                index === id && "select_active"
              )}
              onClick={(e) => {
                setSelected(option);
                onChange(option.value, option, id);
                setIsActive(false);
              }}
            >
              <span
                className="d-body"
                id={`selectbox_item_span_${id}`}
                style={{
                  color: "var(--dark-standard)",
                  textTransform: "capitalize",
                }}
              >
                {" "}
                {option?.label}
              </span>
            </div>
          ))}
        </div>
      )}
      {((error && error.message) || helperText) && (
        <label
          className={`d-caption ${error && error.message && "error_text"}`}
        >
          {(error && error.message) || helperText}
        </label>
      )}
    </div>
  );
};

export default SelectBox;
