import React from "react";
import "./Times.css";

export default function Times(props: any) {
  return (
    <div>
      {props.times
        .slice(0)
        .reverse()
        .map((time: any) => (
          <span className="time">
            {Math.floor((time / 60000) % 60) ? (
              <span>{("" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            ) : (
              <span></span>
            )}
            <span>{("" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
          </span>
        ))}
    </div>
  );
}
