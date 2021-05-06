import React from "react";

function DrawOverlay(ctx: CanvasRenderingContext2D, img: CanvasImageSource, width: number, height: number) {
    ctx.drawImage(img,0,0);
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, width, height);
}


interface ImageCanvasProps {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  width: number;
  height: number;
  imageSrc: string;
  textBoxes: TextBox[];
}

interface ImageCanvasState {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  width: number;
  height: number;
  imageSrc: string;
  textBoxes: TextBox[];

  canvasRef?: React.MutableRefObject<HTMLCanvasElement>;
}

interface TextBox {
  text: string;
  offsetX: number;
  offsetY: number;
  // TODO: color
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
      textBoxes: [{
        text: "topText",
        offsetX: 455,
        offsetY: 109,
      },{
        text: "bottomText",
        offsetX: 411,
        offsetY: 475,
      }],
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
      // textBoxes: props.textBoxes,
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

    this.state.textBoxes.forEach((ea) => {
      ctx.fillStyle = "pink";
      ctx.textBaseline = 'middle';
      ctx.font = "50px 'Montserrat'";

      ea.text.split("\n").forEach((line: string, index: number) => {
        ctx.fillText(line, ea.offsetX, ea.offsetY + index * 50);
      });
    })

  }

  componentDidMount() {
    this.drawText()
  }

  render(): JSX.Element {
    return (
      <div>
        <div>
          {
            this.state.textBoxes.map((value: TextBox, index: number) => {
              return (
                <div>
                  <textarea
                    className="controls__input"
                    // id="name"
                    // type="text"
                    defaultValue={value.text}
                    onChange={(e) => {
                      const textBoxes = this.state.textBoxes;
                      textBoxes[index].text = e.target.value;
                      this.setState({ textBoxes: textBoxes });
                    }}
                  />
                  <input
                    className="controls__input"
                    // id="name"
                    type="number"
                    defaultValue={value.offsetX}
                    onChange={(e) => {
                      const textBoxes = this.state.textBoxes;
                      textBoxes[index].offsetX = parseInt(e.target.value);
                      this.setState({ textBoxes: textBoxes });
                    }}
                  />
                  <input
                    className="controls__input"
                    // id="name"
                    type="number"
                    defaultValue={value.offsetY}
                    onChange={(e) => {
                      const textBoxes = this.state.textBoxes;
                      textBoxes[index].offsetY = parseInt(e.target.value);
                      this.setState({ textBoxes: textBoxes });
                    }}
                  />
                  <label className="controls__label" htmlFor="name">Overlay Text</label>
                </div>
              )
            })
          }

        </div>
        <div>
          <img src={this.state.imageSrc} ref={this.imageRef} style={{display:'none'}} />
          <canvas style={{ "display": "block" }} width={this.state.width} height={this.state.height} ref={this.canvasRef}/>
        </div>
      </div>
    )
  }
}

export default ImageCanvas;
