import React from "react";

function DrawOverlay(ctx: CanvasRenderingContext2D, img: CanvasImageSource, width: number, height: number) {
    ctx.drawImage(img,0,0);
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, width, height);
}


interface ImageCanvasProps extends MemeTemplate {}

interface ImageCanvasState extends MemeTemplate {}

interface TextBox {
  text: string;
  offsetX: number;
  offsetY: number;
  // TODO: color
}

interface MemeTemplate {
  imageSrc: string
  textBoxes: TextBox[]

  // TODO
  width: number
  height: number
}


const defaultMemeTemplates = [
  {
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [{
      text: "NYET",
      offsetX: 450,
      offsetY: 175,
    },{
      text: "MTF",
      offsetX: 450,
      offsetY: 525,
    }],
    imageSrc: "/2srcf5.jpg",
  },
  {
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [{
      text: "NYET",
      offsetX: 450,
      offsetY: 175,
    },{
      text: "FTM",
      offsetX: 450,
      offsetY: 525,
    }],
    imageSrc: "/3hxd77.png",
  },
  {
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [{
      text: "NYET",
      offsetX: 450,
      offsetY: 175,
    },{
      text: "wat",
      offsetX: 450,
      offsetY: 525,
    }],
    imageSrc: "/3jauzd.png",
  },
]

class ImageCanvas extends React.Component<ImageCanvasProps, ImageCanvasState> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: ImageCanvasProps) {
    super(props);

    this.state = defaultMemeTemplates[2];

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  componentWillReceiveProps(props: ImageCanvasProps) {
  this.setState({
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
      ctx.fillStyle = "black"; // TODO: pick color
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
                  {/* <label className="controls__label" htmlFor="name">Overlay Text</label> */}
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
