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
    // const ctx = this.canvasRef.current.getContext('2d');
    // ctx.clearRect(0, 0, this.state.width, this.state.height);
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
    return (
      <div>
        <div>
          <canvas
            style={{ "display": "block" }}
            width={this.state.cellWidth * this.state.columns}
            height={this.state.cellHeight * this.state.rows}
            ref={this.canvasRef}
          />
        </div>
      </div>
    )
  }
}
