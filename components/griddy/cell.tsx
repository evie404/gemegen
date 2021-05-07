import React from "react";

interface CellProps {
  row: number;
  column: number;

  cellHeight: number;
  cellWidth: number;
}

interface CellState {
  row: number;
  column: number;

  cellHeight: number;
  cellWidth: number;

  cellActive: boolean;
}

class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);

    this.state = {
      ...props,

      cellActive: false,
    }; // TODO: fix this
  }

  render(): JSX.Element {
    const classes = ["cell"];
    if (this.state.cellActive) {
      classes.push("active");
      console.log(classes);
    }
    return (
      <div
        className={classes.join(" ")}
        style={{
          width: this.state.cellWidth,
          height: this.state.cellHeight,
          position: "absolute",
          marginTop: this.state.row * this.state.cellHeight,
          marginLeft: this.state.column * this.state.cellWidth,
        }}
        // role="switch"
        onClick={() => {
          this.setState((prevState) => ({ cellActive: !prevState.cellActive }));
          console.log("click");
        }}
      >
        <p className="cell-controls">text</p>
      </div>
    );
  }
}

export default Cell;
