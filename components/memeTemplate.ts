export interface TextBox {
  text: string;
  offsetX: number;
  offsetY: number;
  // TODO: color
}

export interface MemeTemplate {
  name: string;

  imageSrc: string;
  textBoxes: TextBox[];

  // TODO
  width: number;
  height: number;
}

export const DefaultMemeTemplates = [
  {
    name: "MTF",
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [
      {
        text: "NYET",
        offsetX: 450,
        offsetY: 175,
      },
      {
        text: "MTF",
        offsetX: 450,
        offsetY: 525,
      },
    ],
    imageSrc: "/2srcf5.jpg",
  },
  {
    name: "FTM",
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [
      {
        text: "NYET",
        offsetX: 450,
        offsetY: 175,
      },
      {
        text: "FTM",
        offsetX: 450,
        offsetY: 525,
      },
    ],
    imageSrc: "/3hxd77.png",
  },
  {
    name: "MTFwat",
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [
      {
        text: "DA",
        offsetX: 450,
        offsetY: 175,
      },
      {
        text: "wat",
        offsetX: 450,
        offsetY: 525,
      },
    ],
    imageSrc: "/3jauzd.png",
  },
];
