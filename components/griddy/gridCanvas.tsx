import React from "react";
import { CellDimensions } from "./cellCanvas";

interface GridProps extends CellDimensions {
  rows: number;
  columns: number;
}

type GridCanvasState = GridProps;

export class GridCanvas extends React.Component<GridProps, GridCanvasState> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;

  constructor(props: GridProps) {
    super(props);

    this.state = {
      ...props,
    };

    this.canvasRef = React.createRef();
  }

  static getDerivedStateFromProps(props: GridProps) {
    return {
      rows: props.rows,
      columns: props.columns,
      // textBoxes: props.textBoxes,
    };
  }

  componentDidMount(): void {
    this.drawGrid();
  }

  componentDidUpdate(): void {
    this.drawGrid();
  }

  drawGrid(): void {
    const ctx = this.canvasRef.current.getContext("2d");

    const width = this.state.cellWidth * this.state.columns;
    const height = this.state.cellHeight * this.state.rows;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this.state.rows; i += 1) {
      for (let j = 0; j < this.state.columns; j += 1) {
        ctx.fillStyle = "white";
        // ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        ctx.fillRect(
          i * this.state.cellWidth,
          j * this.state.cellHeight,
          this.state.cellWidth,
          this.state.cellHeight
        );
      }
    }
  }

  render(): JSX.Element {
    return (
      <canvas
        style={{ display: "block" }}
        width={this.state.cellWidth * this.state.columns}
        height={this.state.cellHeight * this.state.rows}
        ref={this.canvasRef}
      />
    );
  }
}

export default GridCanvas;
