import React from "react";
import Cell from "./_cell";

interface GridCanvasProps {
  rows: number;
  columns: number;

  cellHeight: number;
  cellWidth: number;
}

interface GridCanvasState {
  rows: number;
  columns: number;

  cellHeight: number;
  cellWidth: number;
}

export class GridCanvas extends React.Component<
  GridCanvasProps,
  GridCanvasState
> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;

  constructor(props: GridCanvasProps) {
    super(props);

    this.state = {
      ...props,
    };

    this.canvasRef = React.createRef();
  }

  static getDerivedStateFromProps(props: GridCanvasProps) {
    return {
      rows: props.rows,
      columns: props.columns,
      // textBoxes: props.textBoxes,
    };
  }

  componentDidMount(): void {
    this.drawGrid();
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    // console.log("GridCanvas componentDidUpdate");
    // console.log("prevProps");
    // console.log(prevProps);
    // console.log("prevState");
    // console.log(prevState);
    // console.log("snapshot");
    // console.log(snapshot);
    // console.log("this.state");
    // console.log(this.state);

    this.drawGrid();
  }

  drawGrid(): void {
    const ctx = this.canvasRef.current.getContext("2d");

    const width = this.state.cellWidth * this.state.columns;
    const height = this.state.cellHeight * this.state.rows;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this.state.rows; i += 1) {
      for (let j = 0; j < this.state.columns; j += 1) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        ctx.fillRect(
          i * this.state.cellWidth,
          j * this.state.cellHeight,
          this.state.cellWidth,
          this.state.cellHeight
        );
      }
    }

    // DrawOverlay(ctx, this.imageRef.current, this.state.width, this.state.height);

    // this.state.textBoxes.forEach((ea) => {
    //   ctx.fillStyle = "black"; // TODO: pick color
    //   ctx.textBaseline = 'middle';
    //   ctx.font = "50px 'Montserrat'";

    //   ea.text.split("\n").forEach((line: string, index: number) => {
    //     ctx.fillText(line, ea.offsetX, ea.offsetY + index * 50);
    //   });
    // })
  }

  render(): JSX.Element {
    const elements = [];

    for (let i = 0; i < this.state.rows; i += 1) {
      for (let j = 0; j < this.state.columns; j += 1) {
        elements.push(
          <Cell
            cellHeight={this.state.cellHeight}
            cellWidth={this.state.cellWidth}
            row={i}
            column={j}
            key={`cell-${i}-${j}`}
          />
        );
      }
    }

    return (
      <div>
        <div>
          <div>{elements}</div>

          <canvas
            style={{ display: "block" }}
            width={this.state.cellWidth * this.state.columns}
            height={this.state.cellHeight * this.state.rows}
            ref={this.canvasRef}
          />
          <div />
        </div>
      </div>
    );
  }
}

export default GridCanvas;
