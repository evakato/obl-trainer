import React from "react";
import "./SelectionPage.css";
import { caseNames } from "./Graph/caseNames";

function SelectionPage(props: any) {
  return (
    <div className="selection-grid-container">
      <div className="selection-header">
        <span className="title">
          obl trainer <span className="author">by eva kato</span>
        </span>
        <button className="button go-button" onClick={props.onClick}>
          go!
        </button>
      </div>
      <div className="selection-body">
        <span className="select-text">select cases ~ </span>
        <div>
          <button
            className="button select-button"
            onClick={props.selectAllOnClick}
          >
            select all
          </button>
          <button
            className="button select-button"
            onClick={props.selectNoneOnClick}
          >
            select none
          </button>
        </div>
      </div>
      <div>
        {Object.keys(caseNames).map((key, i) => {
          return props.selectedCases.includes(caseNames[key][0]) ? (
            <button
              className="case-button selected-case"
              onClick={() => props.removeCaseSelections(key)}
            >
              {key}
            </button>
          ) : (
            <button
              className="case-button"
              onClick={() => props.addCaseSelections(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SelectionPage;
