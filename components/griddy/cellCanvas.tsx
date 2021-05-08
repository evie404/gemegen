import React from "react";

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
  constructor(props: CellCanvasProps) {
    super(props);

    this.state = {
      ...props,
    };
  }

  static getDerivedStateFromProps(
    props: CellCanvasProps,
    state: CellCanvasProps
  ) {
    // console.log("CellCanvas getDerivedStateFromProps");
    // console.log("props");
    // console.log(props);
    // console.log("state");
    // console.log(state);

    return props;
  }

  // componentDidUpdate(prevProps, prevState, snapshot): void {
  //   console.log("CellCanvas componentDidUpdate");
  //   // console.log(prevProps);
  //   // console.log("prevState");
  //   // console.log(prevState);
  //   // // console.log(snapshot);
  //   console.log("this.state");
  //   console.log(this.state);
  // }

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
          paddingTop: 100,
          fontSize: 24,
          color: "black",
        }}
      >
        {this.state.content}
      </div>
    );
  }
}
