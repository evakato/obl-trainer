import React from "react";
import "./Timer.css";

export default function Timer(props: any) {
  return (
    <div className="timer">
      {Math.floor((props.time / 60000) % 60) ? (
        <span className="digits">
          {("" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </span>
      ) : (
        <span></span>
      )}
      <span className="digits">
        {("" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}
