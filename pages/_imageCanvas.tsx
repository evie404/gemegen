import React from "react";

console.log("i loaded")

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

// const obj = {hello: 'world'};
// const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});

class ImageCanvas extends React.Component<ImageCanvasProps, ImageCanvasState> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
  imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: ImageCanvasProps) {
    super(props);

    this.state = {
      image: props.image,
      width: 400,
      height: 400,
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
        <img src={this.state.imageSrc} ref={this.imageRef} />
        {/* {this.state.image.ref = } */}
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

export default ImageCanvas;
