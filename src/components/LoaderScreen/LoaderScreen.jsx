import React from "react";
import "./LoaderScreen.css";

const LoaderScreen = () => {
  return (
    <div className="loading__screen__main__container">
      <div className="loading__screen__main__container-box">
        <div className="loading__screen-box--animation-div"></div>
        <div className="loading__screen-box--text flex">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoaderScreen;
