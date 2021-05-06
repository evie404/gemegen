import React from "react";

function DrawOverlay(ctx: CanvasRenderingContext2D, img: CanvasImageSource, width: number, height: number) {
    ctx.drawImage(img,0,0);
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, width, height);
}

function DrawText(ctx: CanvasRenderingContext2D, text: string) {
    ctx.fillStyle = "white";
    ctx.textBaseline = 'middle';
    ctx.font = "50px 'Montserrat'";
    ctx.fillText(text, 50, 50);
}

interface ImageCanvasProps {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  width: number;
  height: number;
  text: string;
  imageSrc: string;
}

interface ImageCanvasState {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  width: number;
  height: number;
  text: string;
  imageSrc: string;

  canvasRef?: React.MutableRefObject<HTMLCanvasElement>;
}

class ImageCanvas extends React.Component<ImageCanvasProps, ImageCanvasState> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: ImageCanvasProps) {
    super(props);

    this.state = {
      image: props.image,
      width: 720, // TODO: dynamic size from image
      height: 695,
      text: "",
      imageSrc: "/2srcf5.jpg",
    };

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  componentWillReceiveProps(props: ImageCanvasProps) {
  this.setState({
      image: props.image,
      width: props.width,
      height: props.height,
      text: props.text,
    });
}


  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("ImageCanvas componentDidUpdate");
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
    console.log(this.state);

    this.drawText();
  }

  drawText() {
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    DrawOverlay(ctx, this.imageRef.current, this.state.width, this.state.height);
    DrawText(ctx, this.state.text);
    ctx.fillText(this.state.text, 50, 50);
  }

  componentDidMount() {
    this.drawText()
  }

  render(): JSX.Element {
    return (
      <div>
        <img src={this.state.imageSrc} ref={this.imageRef} style={{display:'none'}} />
        {/* {this.state.image.ref = } */}
        <h3>Dynamic text:</h3>
        <p>{this.state ? this.state.text : ""}</p>
        <canvas style={{ "display": "block" }} width={this.state.width} height={this.state.height} ref={this.canvasRef}/>
      </div>
    )
  }
}

export default ImageCanvas;
