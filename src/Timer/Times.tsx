import "./Times.css";
import ReactTooltip from "react-tooltip";

export default function Times(props: any) {
  return (
    <>
      {props.times
        .slice(0)
        .reverse()
        .map((time: any, i: number) => (
          <>
            <div data-tip={props.scrambles[props.scrambles.length - i - 1]}>
              <span className="time">
                {Math.floor((time / 60000) % 60) ? (
                  <span>
                    {("" + Math.floor((time / 60000) % 60)).slice(-2)}:
                  </span>
                ) : (
                  <span></span>
                )}
                <span>{("" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
              </span>
              <ReactTooltip
                place="right"
                border
                effect="solid"
                textColor="#878769"
                backgroundColor="#efebce"
                borderColor="#bb8588"
              />
            </div>
          </>
        ))}
    </>
  );
}
