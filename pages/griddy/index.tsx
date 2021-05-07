import React from "react";
import { GridControl } from "./_gridCanvas";

type HomeProps = Record<string, never>;
interface HomeState {
  numRows: number;
  numColumns: number;
}

// templates -> image, [text positions]
// template selector -> change image, show textboxes

class Griddy extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      numRows: 2,
      numColumns: 2,
    };
  }

  // pickTemplate()

  render(): JSX.Element {
    return (
      <div>
        <h1>Griddy</h1>
        {/* <h1>Overlay text on canvas image and save as base64</h1> */}
        <div className="page-wrap">
          <div className="controls">
            <p>I like Sophie and memes</p>
            <div>
              <label htmlFor="numRows">Rows</label>
              <input
                type="number"
                id="numRows"
                name="numRows"
                defaultValue={this.state.numRows}
                onChange={(e) => {
                  // console.log(e.target.value);
                  this.setState({ numRows: parseInt(e.target.value, 10) });
                }}
              />
              <label htmlFor="numColumns">Columns</label>
              <input
                type="number"
                id="numColumns"
                name="numColumns"
                defaultValue={this.state.numColumns}
                onChange={(e) => {
                  // console.log(e.target.value);
                  this.setState({ numColumns: parseInt(e.target.value, 10) });
                }}
              />
            </div>
          </div>
          <GridControl
            rows={this.state.numRows}
            columns={this.state.numColumns}
            cellHeight={250}
            cellWidth={250}
          />
        </div>
      </div>
    );
  }
}

export default Griddy;
