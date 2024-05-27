import { CanvasModel } from '../CanvasModel';
import { Colors } from '../Colors';
import { Constants } from '../Constants';
import { Coordinate } from '../Coordinate';
import { Drawable } from './Drawable';

export class Point extends Drawable {
  private static RADIUS = 4;

  private _coordinate: Coordinate;

  constructor(coordinate: Coordinate, color: string = Colors.black) {
    super(color);
    this._coordinate = coordinate;
  }

  draw = (canvasModel: CanvasModel) => {
    const p = this.mapCoordsToCanvas(this._coordinate, canvasModel);

    canvasModel.context.beginPath();
    canvasModel.context.fillStyle = this.color;
    canvasModel.context.arc(p.x, p.y, Point.RADIUS, 0, Constants.TWO_PI);
    canvasModel.context.closePath();
    canvasModel.context.fill();
  };
}
