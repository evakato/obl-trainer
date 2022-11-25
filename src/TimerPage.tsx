import React, { Component } from "react";
import "./TimerPage.css";
import Timer from "./Timer/Timer";
import Scramble from "./Timer/Scramble";
import Times from "./Timer/Times";
import Graph from "./Graph/Graph";
import generateScramble from "./Graph/App";
import generateGraph from "./Graph/generateGraph";
import SelectionPage from "./SelectionPage";
import { caseNames } from "./Graph/caseNames";
import { categories } from "./Graph/categories";

interface TimerState {
  selectionPage: boolean;
  isActive: boolean;
  time: number;
  timeList: Array<any>;
  graph: Graph;
  scramble?: string;
  nextScramble?: string;
  intervalId: any;
  caseSelections: Array<string>;
  nameCaseSelections: Array<string>;
}

interface TimerProps {}

class TimerPage extends Component<TimerProps, TimerState> {
  constructor(props: TimerProps) {
    super(props);
    this.state = {
      selectionPage: true,
      isActive: false,
      time: 0,
      timeList: [],
      graph: generateGraph(),
      scramble: "",
      nextScramble: "",
      intervalId: null,
      caseSelections: [],
      nameCaseSelections: [],
    };
    this.handleSpace = this.handleSpace.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.showPage = this.showPage.bind(this);
    this.setCaseSelections = this.setCaseSelections.bind(this);
    this.addCaseSelections = this.addCaseSelections.bind(this);
    this.removeCaseSelections = this.removeCaseSelections.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectNone = this.selectNone.bind(this);
  }

  showPage = () => {
    this.setState({ selectionPage: !this.state.selectionPage });
    this.setState({
      scramble: generateScramble(this.state.graph, this.state.caseSelections),
    });
  };

  setCaseSelections = (caseName: string) => {
    let fullySelected: boolean = true;
    if (this.state.caseSelections.length === 0) {
      fullySelected = false;
    } else {
      caseNames[caseName].every((specificCase) => {
        if (!this.state.caseSelections.includes(specificCase)) {
          fullySelected = false;
          return false;
        }
        return true;
      });
    }
    if (!fullySelected) {
      this.setState({
        caseSelections: [...this.state.caseSelections, ...caseNames[caseName]],
      });
    } else {
      this.setState({
        caseSelections: this.state.caseSelections.filter(function (
          caseSelection
        ) {
          return !caseNames[caseName].includes(caseSelection);
        }),
      });
    }
  };

  addCaseSelections = (caseName: string) => {
    this.setState({
      caseSelections: [...this.state.caseSelections, ...caseNames[caseName]],
    });
    this.setState({
      nameCaseSelections: [...this.state.nameCaseSelections, caseName],
    });
  };

  removeCaseSelections = (caseName: string) => {
    this.setState({
      caseSelections: this.state.caseSelections.filter(function (
        caseSelection
      ) {
        return !caseNames[caseName].includes(caseSelection);
      }),
    });
    this.setState({
      nameCaseSelections: this.state.nameCaseSelections.filter(function (
        nameCaseSelection
      ) {
        return caseName !== nameCaseSelection;
      }),
    });
  };

  selectAll = (caseCategory: string, caseSubcategory: string) => {
    this.selectNone(caseCategory, caseSubcategory);
    this.setState({
      caseSelections: [
        ...this.state.caseSelections,
        ...this.getAllCasesByCategory(caseCategory, caseSubcategory),
      ],
    });
    this.setState({
      nameCaseSelections: [
        ...this.state.nameCaseSelections,
        ...categories[caseCategory][caseSubcategory],
      ],
    });
  };

  selectNone = (caseCategory: string, caseSubcategory: string) => {
    this.setState({
      nameCaseSelections: this.state.nameCaseSelections.filter(
        (val) => !categories[caseCategory][caseSubcategory].includes(val)
      ),
    });
    this.setState({
      caseSelections: this.state.caseSelections.filter(
        (val) =>
          !this.getAllCasesByCategory(caseCategory, caseSubcategory).includes(
            val
          )
      ),
    });
  };

  getAllCasesByCategory = (
    caseCategory: string,
    caseSubcategory: string
  ): Array<string> => {
    let allCaseSelections: Array<string> = [];
    categories[caseCategory][caseSubcategory].map((eachCase: string) =>
      allCaseSelections.push(...caseNames[eachCase])
    );
    return allCaseSelections;
  };

  resetTimes = () => {
    this.setState({
      timeList: [],
    });
  };

  handleTouchStart() {
    if (!this.state.isActive) {
      this.setState({ time: 0 });
      let interval = setInterval(() => {
        this.setState((time) => {
          return { time: this.state.time + 10 };
        });
      }, 10);
      this.setState({ intervalId: interval });
      this.setState({ isActive: true });
      this.setState({
        nextScramble: generateScramble(
          this.state.graph,
          this.state.caseSelections
        ),
      });
    } else {
      clearInterval(this.state.intervalId);
      if (this.state.time !== 0) {
        this.setState({
          timeList: [...this.state.timeList, this.state.time],
        });
      }
      this.setState({ isActive: false });
      this.setState({ scramble: this.state.nextScramble });
    }
    return () => {
      clearInterval(this.state.intervalId);
    };
  }

  handleSpace(event: any) {
    if (event.keyCode === 32) {
      if (!this.state.isActive) {
        this.setState({ time: 0 });
        let interval = setInterval(() => {
          this.setState((time) => {
            return { time: this.state.time + 10 };
          });
        }, 10);
        this.setState({ intervalId: interval });
        this.setState({ isActive: true });
        this.setState({
          nextScramble: generateScramble(
            this.state.graph,
            this.state.caseSelections
          ),
        });
      } else {
        clearInterval(this.state.intervalId);
        if (this.state.time !== 0) {
          this.setState({
            timeList: [...this.state.timeList, this.state.time],
          });
        }
        this.setState({ isActive: false });
        this.setState({ scramble: this.state.nextScramble });
      }
      return () => {
        clearInterval(this.state.intervalId);
      };
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleSpace, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleSpace, false);
  }

  render() {
    return (
      <div className="body">
        {this.state.selectionPage ? (
          <SelectionPage
            onClick={this.showPage}
            setCaseSelections={this.setCaseSelections}
            addCaseSelections={this.addCaseSelections}
            removeCaseSelections={this.removeCaseSelections}
            selectedCases={this.state.nameCaseSelections}
            selectAllOnClick={this.selectAll}
            selectNoneOnClick={this.selectNone}
          ></SelectionPage>
        ) : (
          <div className="grid-container">
            <Scramble
              scramble={this.state.scramble}
              onClick={this.showPage}
            ></Scramble>
            <div className="main">
              <div className="sidebar-layout">
                <div className="sidebar">
                  <Times times={this.state.timeList}></Times>
                </div>
                <div className="selection" onClick={this.resetTimes}>
                  Reset
                </div>
              </div>
              <div className="timer" onTouchStart={this.handleTouchStart}>
                <Timer time={this.state.time} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TimerPage;
