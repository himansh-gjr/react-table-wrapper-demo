import React from "react";
import styled from "styled-components";
import EmptyBoxIcon from "../../assets/image/empty-box.svg";

const EmptyStates = ({ className, style, fontSize, message, ...props }) => {
  return (
    <EmptyState className={`${className}`} style={style}>
      <img className="empty-icon" src={EmptyBoxIcon} />
      <div
        className={`d-subHeading d-size ${fontSize}`}
        style={{ color: "var(--dark-light)" }}
      >
        {message}
      </div>
    </EmptyState>
  );
};

export default EmptyStates;

const EmptyState = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .empty-icon {
    padding-bottom: var(--loose-spacing);
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    .d-size {
      font-size: var(--s-screen-button-fs);
      line-height: var(--s-screen-button-lh);
      font-weight: 400;
    }
  }
`;
