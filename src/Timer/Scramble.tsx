import React from "react";
import "./Scramble.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

function arrowButton() {
  return (
    <span className="select-icon">
      <AiOutlineArrowLeft></AiOutlineArrowLeft>
    </span>
  );
}

export default function Scramble(props: any) {
  return (
    <div className="header">
      <div className="selection" onClick={props.onClick}>
        select
      </div>
      <div className="scramble">{props.scramble}</div>
    </div>
  );
}
