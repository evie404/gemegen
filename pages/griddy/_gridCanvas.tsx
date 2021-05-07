// eslint-disable-next-line max-classes-per-file
import React from "react";
import Cell from "./_cell";

interface GridProps extends CellDimensions {
  rows: number;
  columns: number;
}

interface CellDimensions {
  cellHeight: number;
  cellWidth: number;
}

interface Coordinates {
  row: number;
  column: number;
}
interface GridControlState extends GridProps {
  activeCell: Coordinates;
  cells: CellContent[][];
}

type GridCanvasState = GridProps;

interface CellCanvasProps extends CellDimensions, CellContent {}

interface CellContent {
  contentType: "image" | "text";
  content: string;
}

class CellCanvas extends React.Component<CellCanvasProps, CellCanvasProps> {
  constructor(props: CellCanvasProps) {
    super(props);

    this.state = {
      ...props,
    };
  }

  render(): JSX.Element {
    if (this.state.contentType === "image") {
      return (
        <img
          src={this.state.content}
          alt={this.state.content}
          style={{
            width: this.state.cellWidth,
            height: this.state.cellHeight,
          }}
        />
      );
    }

    return (
      <div
        style={{
          width: this.state.cellWidth,
          height: this.state.cellHeight,
        }}
      >
        {this.state.content}
      </div>
    );
  }
}

export class GridControl extends React.Component<GridProps, GridControlState> {
  constructor(props: GridProps) {
    super(props);

    const cells: CellContent[][] = [];

    for (let i = 0; i < this.props.rows; i += 1) {
      cells.push([]);

      for (let j = 0; j < this.props.columns - 1; j += 1) {
        cells[i].push({
          content: "/images/fn.png",
          contentType: "image",
        });
      }

      cells[i].push({
        content: "someText",
        contentType: "text",
      });
    }

    cells[this.props.rows - 1][0].content = "/images/fy.png";

    this.state = {
      ...props,
      activeCell: {
        row: -1,
        column: -1,
      },
      cells: cells,
    };
  }

  static getDerivedStateFromProps(props: GridProps) {
    return {
      rows: props.rows,
      columns: props.columns,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    // console.log("GridControl componentDidUpdate");
    // console.log(prevProps);
    // console.log("prevState");
    // console.log(prevState);
    // console.log(snapshot);
    // console.log("this.state");
    // console.log(this.state);
  }

  render(): JSX.Element {
    const controlElements = [];

    for (let i = 0; i < this.state.rows; i += 1) {
      for (let j = 0; j < this.state.columns; j += 1) {
        const classes = ["cell"];

        if (
          this.state.activeCell.row === i &&
          this.state.activeCell.column === j
        ) {
          classes.push("active");
          console.log(classes);
        }

        controlElements.push(
          <div
            style={{
              width: this.state.cellWidth,
              height: this.state.cellHeight,
              position: "absolute",
              marginTop: i * this.state.cellHeight,
              marginLeft: j * this.state.cellWidth,
            }}
            key={`cell-${i}-${j}`}
          >
            <div
              className={classes.join(" ")}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
              onClick={() => {
                this.setState((prevState) => {
                  if (
                    prevState.activeCell.row === i &&
                    prevState.activeCell.column === j
                  ) {
                    return {
                      activeCell: {
                        row: -1,
                        column: -1,
                      },
                    };
                  }

                  return {
                    activeCell: {
                      row: i,
                      column: j,
                    },
                  };
                });
                console.log("click");
              }}
            />
            <CellCanvas {...this.state} {...this.state.cells[i][j]} />
          </div>
        );
      }
    }

    return (
      <div>
        <div>
          <div>{controlElements}</div>
          <GridCanvas {...this.state} />
        </div>
      </div>
    );
  }
}

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
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
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
