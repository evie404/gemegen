export function drawImage(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  width: number,
  height: number
): void {
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = "rgba(255, 255, 255, 0)";
  ctx.fillRect(0, 0, width, height);
}

export function drawTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  offsetX: number,
  offsetY: number
): void {
  ctx.fillStyle = "black"; // TODO: pick color
  ctx.textBaseline = "middle";
  ctx.font = "50px 'Montserrat'";

  text.split("\n").forEach((line: string, index: number) => {
    ctx.fillText(line, offsetX, offsetY + index * 50);
  });
}
