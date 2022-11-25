import React from "react";
import "./SelectionPage.css";
import { caseNames } from "./Graph/caseNames";
import Collapsible from "react-collapsible";
import { categories } from "./Graph/categories";
import Img3C from "./co/3c.svg";
import ImgBarDiag from "./co/bardiag.svg";
import ImgBarBar from "./co/barbar.svg";
import ImgDiagDiag from "./co/diagdiag.svg";
import Img4C from "./co/4c.svg";
import ModalButton from "./Modal/ModalButton";

let imgArray = [Img3C, ImgBarDiag, ImgBarBar, ImgDiagDiag, Img4C];

function SelectionPage(props: any) {
  return (
    <div className="selection-grid-container">
      <div className="selection-header">
        <span className="title">
          obl trainer <span className="author">by eva</span>
        </span>
        <button className="button go-button" onClick={props.onClick}>
          go!
        </button>
      </div>
      <div className="selection-body">
        <span className="select-text">select cases ~ </span>
      </div>
      <div className="main-selection">
        {Object.keys(categories).map((key, i) => (
          <div>
            <div className="main-selection-button">
              <img src={imgArray[i]} className="co-img"></img>
            </div>
            <Collapsible trigger={key + " ⌄"}>
              {Object.keys(categories[key]).map((subCase, j) => (
                <ModalButton
                  overallCaseName={key}
                  name={subCase}
                  cases={categories[key][subCase]}
                  selectedCases={props.selectedCases}
                  addCaseSelections={props.addCaseSelections}
                  removeCaseSelections={props.removeCaseSelections}
                  selectAllOnClick={props.selectAllOnClick}
                  selectNoneOnClick={props.selectNoneOnClick}
                ></ModalButton>
              ))}
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectionPage;
