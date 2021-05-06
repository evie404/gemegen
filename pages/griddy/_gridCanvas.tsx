// eslint-disable-next-line max-classes-per-file
import React from "react";
import Cell from "./_cell";

interface GridProps {
  rows: number;
  columns: number;

  cellHeight: number;
  cellWidth: number;
}

interface Coordinates {
  row: number;
  column: number;
}
interface GridControlState extends GridProps {
  activeCell: Coordinates;
}

type GridCanvasState = GridProps;

export class GridControl extends React.Component<GridProps, GridControlState> {
  constructor(props: GridProps) {
    super(props);

    this.state = {
      ...props,
      activeCell: {
        row: -1,
        column: -1,
      },
    };
  }

  static getDerivedStateFromProps(props: GridProps) {
    return {
      rows: props.rows,
      columns: props.columns,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    console.log("GridControl componentDidUpdate");
    console.log(prevProps);
    console.log("prevState");
    console.log(prevState);
    console.log(snapshot);
    console.log("this.state");
    console.log(this.state);
  }

  render(): JSX.Element {
    const elements = [];

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

        elements.push(
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={classes.join(" ")}
            style={{
              width: this.state.cellWidth,
              height: this.state.cellHeight,
              position: "absolute",
              marginTop: i * this.state.cellHeight,
              marginLeft: j * this.state.cellWidth,
            }}
            // role="switch"
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
            key={`cell-${i}-${j}`}
          >
            <p className="cell-controls">text</p>
          </div>
        );
      }
    }

    return (
      <div>
        <div>
          <div>{elements}</div>
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
