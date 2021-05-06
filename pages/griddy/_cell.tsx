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
}

class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);

    this.state = { ...props }; // TODO: fix this
  }

  render(): JSX.Element {
    return (
      <div
        className="cell"
        style={{
          width: this.state.cellWidth,
          height: this.state.cellHeight,
          position: "absolute",
          marginTop: this.state.row * this.state.cellHeight,
          marginLeft: this.state.column * this.state.cellWidth,
        }}
      >
        <p className="cell-controls">text</p>
      </div>
    );
  }
}

export default Cell;
