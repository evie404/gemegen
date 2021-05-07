import React from "react";
import { ImageCanvas } from "./_imageCanvas";
import { DefaultMemeTemplates } from "./_memeTemplate";

type HomeProps = Record<string, never>;
interface HomeState {
  templateIndex: number;
}

// templates -> image, [text positions]
// template selector -> change image, show textboxes

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      templateIndex: 0,
    };
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
            {DefaultMemeTemplates.map((ea, index) => (
              <div key={`meme-selector-${ea.name}`}>
                <input
                  type="radio"
                  id={ea.name}
                  name="template"
                  value={index}
                  checked={this.state.templateIndex === index}
                  onChange={(e) => {
                    // console.log(e.target.value);
                    this.setState({
                      templateIndex: parseInt(e.target.value, 10),
                    });
                  }}
                />
                <label htmlFor={ea.name}>{ea.name}</label>
              </div>
            ))}
          </div>
          <div id="canvas-wrap">
            {DefaultMemeTemplates.map((ea, index) => (
              <div
                style={{
                  display:
                    this.state.templateIndex === index ? "block" : "none",
                }}
                key={`image-canvas-container-${ea.name}`}
              >
                <ImageCanvas {...ea} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
