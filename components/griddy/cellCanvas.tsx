import React from "react";
import { drawImage, drawTextLines } from "../canvas/drawHelpers";

export interface CellDimensions {
  cellHeight: number;
  cellWidth: number;
}

interface CellCanvasProps extends CellDimensions, CellContent {}

export interface CellContent {
  contentType: "image" | "text";
  content: string;
}

export class CellCanvas extends React.Component<
  CellCanvasProps,
  CellCanvasProps
> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: CellCanvasProps) {
    super(props);

    this.state = { ...props };

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  static getDerivedStateFromProps(props: CellCanvasProps): any {
    return {
      cellHeight: props.cellHeight,
      cellWidth: props.cellWidth,
      content: props.content,
      contentType: props.contentType,
    };
  }

  componentDidMount(): void {
    this.drawText();
  }

  componentDidUpdate(): void {
    // console.log("ImageCanvas componentDidUpdate");
    // console.log(prevProps);
    // console.log("prevState");
    // console.log(prevState);
    // console.log(snapshot);
    // console.log("this.state");
    // console.log(this.state);

    this.drawText();
  }

  drawText(): void {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, this.state.cellWidth, this.state.cellHeight);

    if (this.state.contentType === "image") {
      drawImage(
        ctx,
        this.imageRef.current,
        this.state.cellWidth,
        this.state.cellHeight
      );
    } else {
      drawTextLines(ctx, this.state.content, 50, 50);
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <img
          src={this.state.contentType === "image" ? this.state.content : ""}
          ref={this.imageRef}
          style={{ display: "none" }}
          width={this.state.cellWidth}
          height={this.state.cellHeight}
          alt=""
        />

        <canvas
          style={{ display: "block" }}
          width={this.state.cellWidth}
          height={this.state.cellHeight}
          ref={this.canvasRef}
        />
      </div>
    );
  }
}
