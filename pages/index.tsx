import React from "react";
import {ImageCanvas, DefaultMemeTemplates} from "./_imageCanvas";

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

  // pickTemplate()

  render(): JSX.Element {
    return (
      <div>
        {/* <h1>Overlay text on canvas image and save as base64</h1> */}
        <div className="page-wrap">
          <div className="controls">
            <p>I like Sophie and memes</p>
            {/* <p>Parent element: {this.state.parentText}</p> */}
            {/* {this.state.image} */}
            <input type="radio" id="mtf" name="template" value="mtf" />
            <label htmlFor="mtf">mtf</label>
            <input type="radio" id="ftm" name="template" value="ftm" />
            <label htmlFor="ftm">ftm</label>
          </div>
          <div id="canvas-wrap">
            <ImageCanvas {...DefaultMemeTemplates[1]}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
