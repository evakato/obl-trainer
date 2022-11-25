import React, { ReactNode } from "react";
import "./CaseModal.css";

interface ModalType {
  cases: Array<string>;
  selectedCases: Array<string>;
  isOpen: boolean;
  toggle: () => void;
  addCaseSelections: any;
  removeCaseSelections: any;
  overallCaseName: string;
  subCaseName: string;
  selectAllOnClick: any;
  selectNoneOnClick: any;
}

export default function CaseModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <span className="modal-title">
              {props.overallCaseName + props.subCaseName}
            </span>
            <div className="container">
              {Array.apply(null, Array(15)).map((nm: any, i) =>
                i < props.cases.length ? (
                  props.selectedCases.includes(props.cases[i]) ? (
                    <button
                      className="case-button selected-case"
                      onClick={() => props.removeCaseSelections(props.cases[i])}
                    >
                      {props.cases[i]}
                    </button>
                  ) : (
                    <button
                      className="case-button"
                      onClick={() => props.addCaseSelections(props.cases[i])}
                    >
                      {props.cases[i]}
                    </button>
                  )
                ) : (
                  <></>
                )
              )}
            </div>
            <div className="modal-footer">
              <>
                {
                  props.cases.filter((value) =>
                    props.selectedCases.includes(value)
                  ).length
                }
                /{props.cases?.length}
              </>
              <button
                className="case-button footer-button"
                onClick={() =>
                  props.selectNoneOnClick(
                    props.overallCaseName,
                    props.subCaseName
                  )
                }
              >
                select none
              </button>
              <button
                className="case-button footer-button"
                onClick={() =>
                  props.selectAllOnClick(
                    props.overallCaseName,
                    props.subCaseName
                  )
                }
              >
                select all
              </button>
              <button
                className="case-button footer-button"
                onClick={props.toggle}
              >
                done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
