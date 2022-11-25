import { isPropertySignature } from "typescript";
import Modal from "./CaseModal";
import useModal from "./useModal";

type ModalButtonProps = {
  overallCaseName: string;
  name: string;
  cases: Array<string>;
  selectedCases: Array<string>;
  addCaseSelections: any;
  removeCaseSelections: any;
  selectAllOnClick: any;
  selectNoneOnClick: any;
};

export default function ModalButton({
  overallCaseName,
  name,
  cases,
  selectedCases,
  addCaseSelections,
  removeCaseSelections,
  selectAllOnClick,
  selectNoneOnClick,
}: ModalButtonProps) {
  const { isOpen, toggle } = useModal();
  return (
    <>
      <button className="subcase-button" onClick={toggle}>
        <span className="subcase-text">{name}</span>
        <span className="subcase-case-number">
          {cases.filter((value) => selectedCases.includes(value)).length}/
          {cases?.length}
        </span>
      </button>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        cases={cases}
        selectedCases={selectedCases}
        addCaseSelections={addCaseSelections}
        removeCaseSelections={removeCaseSelections}
        overallCaseName={overallCaseName}
        subCaseName={name}
        selectAllOnClick={selectAllOnClick}
        selectNoneOnClick={selectNoneOnClick}
      ></Modal>
    </>
  );
}
