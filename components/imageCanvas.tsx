import React from "react";
import { MemeTemplate, TextBox } from "./memeTemplate";
import { drawImage, drawTextLines } from "./canvas/drawHelpers";

type ImageCanvasProps = MemeTemplate;

type ImageCanvasState = MemeTemplate;

export class ImageCanvas extends React.Component<
  ImageCanvasProps,
  ImageCanvasState
> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;

  imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: ImageCanvasProps) {
    super(props);

    this.state = { ...props };

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  static getDerivedStateFromProps(props: ImageCanvasProps): any {
    return {
      width: props.width,
      height: props.height,
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
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    drawImage(ctx, this.imageRef.current, this.state.width, this.state.height);

    this.state.textBoxes.forEach((ea) => {
      drawTextLines(ctx, ea.text, ea.offsetX, ea.offsetY);
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <div>
          {this.state.textBoxes.map((value: TextBox, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`text-box-control-${index}`}>
              {/* <label className="controls__label" htmlFor="name">Overlay Text</label> */}
              <textarea
                className="controls__input"
                // id="name"
                // type="text"
                defaultValue={value.text}
                onChange={(e) => {
                  const { textBoxes } = this.state;
                  textBoxes[index].text = e.target.value;
                  this.setState({ textBoxes });
                }}
              />
              <input
                className="controls__input"
                // id="name"
                type="number"
                defaultValue={value.offsetX}
                onChange={(e) => {
                  const { textBoxes } = this.state;
                  textBoxes[index].offsetX = parseInt(e.target.value, 10);
                  this.setState({ textBoxes });
                }}
              />
              <input
                className="controls__input"
                // id="name"
                type="number"
                defaultValue={value.offsetY}
                onChange={(e) => {
                  const { textBoxes } = this.state;
                  textBoxes[index].offsetY = parseInt(e.target.value, 10);
                  this.setState({ textBoxes });
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <img
            src={this.state.imageSrc}
            ref={this.imageRef}
            style={{ display: "none" }}
            alt=""
          />
          <canvas
            style={{ display: "block" }}
            width={this.state.width}
            height={this.state.height}
            ref={this.canvasRef}
          />
        </div>
      </div>
    );
  }
}

export default ImageCanvas;
