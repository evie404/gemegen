import React from "react";
import ImageCanvas from "./_imageCanvas";

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
      image: <img src="/2srcf5.jpg" />,
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
        {/* <h1>Overlay text on canvas image and save as base64</h1> */}
        <div className="page-wrap">
          <div className="controls">
            {/* <input className="controls__input" type="file" id="imageLoader" name="imageLoader" />
            <label className="controls__label" htmlFor="name">First, choose an image.</label> */}
            {/* <hr></hr> */}
            <p>I like Sophie and memes</p>
            {/* <p>Parent element: {this.state.parentText}</p> */}
            {/* {this.state.image} */}
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
            {/* <DynamicImageCanvas image={this.state.image} width={400} height={400} text={this.state.parentText} /> */}
            <ImageCanvas image={this.state.image} width={400} height={400} text={this.state.parentText}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
