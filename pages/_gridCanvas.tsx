import React from "react";

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

export class GridCanvas extends React.Component<GridCanvasProps, GridCanvasState> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;

  constructor(props: GridCanvasProps) {
    super(props);

    this.state = props;

    this.canvasRef = React.createRef();
  }

  componentWillReceiveProps(props: GridCanvasProps) {
  this.setState({
      rows: props.rows,
      columns: props.columns,
      // textBoxes: props.textBoxes,
    });
}


  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("GridCanvas componentDidUpdate");
    // console.log(prevProps);
    console.log("prevState");
    console.log(prevState);
    // console.log(snapshot);
    console.log("this.state");
    console.log(this.state);

    this.drawGrid();
  }

  drawGrid() {

    const ctx = this.canvasRef.current.getContext('2d');

    const width = this.state.cellWidth * this.state.columns;
    const height = this.state.cellHeight * this.state.rows;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.columns; j++) {
        ctx.fillStyle = 'rgba(255, 255, 255, '+Math.random()+')';
        ctx.fillRect(i*this.state.cellWidth, j*this.state.cellHeight, this.state.cellWidth, this.state.cellHeight);
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

  componentDidMount() {
    this.drawGrid()
  }

  render(): JSX.Element {
    const elements = [];

    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.columns; j++) {
        elements.push(
          <Cell
            cellHeight={this.state.cellHeight}
            cellWidth={this.state.cellWidth}
            row={i}
            column={j}
          />
        )
      }
    }

    return (
      <div>
        <div>
          <div>
            {
              elements
            }
          </div>

          <canvas
            style={{ "display": "block" }}
            width={this.state.cellWidth * this.state.columns}
            height={this.state.cellHeight * this.state.rows}
            ref={this.canvasRef}
          />
          <div>

          </div>
        </div>
      </div>
    )
  }
}

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

export class Cell extends React.Component<CellProps, CellState> {
  constructor(props: CellProps) {
    super(props);

    this.state = props; // TODO: fix this
  }

  render(): JSX.Element {
    return (
      <div className="cell" style={
        {
          width: this.state.cellWidth,
          height: this.state.cellHeight,
          position: 'absolute',
          marginTop: this.state.row * this.state.cellHeight,
          marginLeft: this.state.column * this.state.cellWidth,
        }}>
        <p className="cell-controls">
          text
        </p>
      </div>

    )
  }
}
