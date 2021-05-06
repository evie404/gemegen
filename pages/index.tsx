import React, { useRef, useEffect } from "react";

// var text_title ="Overlay text";
// var imageLoader = document.getElementById('imageLoader');
//     imageLoader.addEventListener('change', handleImage, false);
// var canvas = document.getElementById('imageCanvas');
// var ctx = canvas.getContext('2d');

function DrawOverlay(ctx: CanvasRenderingContext2D, img, width, height) {
    ctx.drawImage(img,0,0);
    ctx.fillStyle = 'rgba(30, 144, 255, 0.4)';
    ctx.fillRect(0, 0, width, height);
}
function DrawText(ctx: CanvasRenderingContext2D, text) {
    ctx.fillStyle = "white";
    ctx.textBaseline = 'middle';
    ctx.font = "50px 'Montserrat'";
    ctx.fillText(text, 50, 50);
}
// function handleImage(e) {
//     var reader = new FileReader();
//     var img = "";
//     var src = "";
//     reader.onload = function(event) {
//         img = new Image();
//         img.onload = function() {
//             canvas.width = img.width;
//             canvas.height = img.height;
//             ctx.drawImage(img,0,0);
//         }
//         img.src = event.target.result;
//         src = event.target.result;
//         canvas.classList.add("show");
//         DynamicText(img);
//     }

//     reader.readAsDataURL(e.target.files[0]);
// }
// function convertToImage() {
// 	window.open(canvas.toDataURL('png'));
// }
// document.getElementById('download').onclick = function download() {
// 		convertToImage();
// }

interface ImageCanvasProps {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  width: number;
  height: number;
  text: string;
}

interface ImageCanvasState {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  width: number;
  height: number;
  text: string;

  canvasRef?: React.MutableRefObject<HTMLCanvasElement>;
}

class ImageCanvas extends React.Component<ImageCanvasProps, ImageCanvasState> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  // imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: ImageCanvasProps) {
    super(props);


    this.state = {
      image: null,
      width: 400,
      height: 400,
      text: "",
    };

    this.canvasRef = React.createRef();
    // this.imageRef = React.createRef();
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
    // DrawOverlay(ctx, this.imageRef.current, this.state.width, this.state.height);
    DrawText(ctx, this.state.text);
    ctx.fillText(this.state.text, 50, 50);
  }

  componentDidMount() {
    this.drawText()
  }

  render(): JSX.Element {
    return (
      <div>
        {/* <img ref={this.imageRef} /> */}
        <h3>Dynamic text:</h3>
        <p>{this.state ? this.state.text : ""}</p>
        <canvas style={{ "display": "block" }} width={this.state.width} height={this.state.height} ref={this.canvasRef}/>
      </div>
    )
  }
}

interface ImageRefProps {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
}

class ImageRef extends React.Component<ImageRefProps> {
  imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: ImageRefProps) {
    super(props);

    this.state = {
      image: props.image,
    };

    this.imageRef = React.createRef();
  }

  render(): JSX.Element {
    return <img ref={this.imageRef} />;
  }
}

interface HomeProps {}

interface HomeState {
  image: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  parentText: string,
}

// templates -> image, [text positions]
// template selector -> change image, show textboxes

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      image: <img src="https://unsplash.it/400/400/?random" />,
      parentText: 'text',
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("Home componentDidUpdate");
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(snapshot);
    // console.log(this.state);
  }

  render(): JSX.Element {
    return (
      <div>
        <h1>Overlay text on canvas image and save as base64</h1>
        <div className="page-wrap">
          <div className="controls">
            <input className="controls__input" type="file" id="imageLoader" name="imageLoader" />
            <label className="controls__label" htmlFor="name">First, choose an image.</label>
            <hr></hr>
            <p>I like Sophie and memes</p>
            <p>Parent element: {this.state.parentText}</p>
            <input
              className="controls__input"
              id="name"
              type="text"
              defaultValue={this.state.parentText}
              onChange={(e) => {
                // console.log(e)
                // console.log(e.target)
                // console.log(e.target.value)
                this.setState({ parentText: e.target.value })
              }}
            />
            <label className="controls__label" htmlFor="name">Overlay Text</label>
          </div>
          <div id="canvas-wrap">
            <ImageCanvas image={this.state.image} width={400} height={400} text={this.state.parentText} />
            {/* <ImageCanvas image={this.state.image} width={400} height={400} text={this.state.parentText}/> */}
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
