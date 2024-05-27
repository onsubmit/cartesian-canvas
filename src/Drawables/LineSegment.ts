import { CanvasModel } from '../CanvasModel';
import { Drawable } from './Drawable';
import { Point } from './Point';

export type LineSegmentArgs = {
  point1: Point;
  point2: Point;
  color?: string;
};

export class LineSegment extends Drawable {
  private _point1: Point;
  private _point2: Point;

  constructor({ point1, point2, color }: LineSegmentArgs) {
    super(color);
    this._point1 = point1;
    this._point2 = point2;
  }

  draw = (canvasModel: CanvasModel): void => {
    const p1 = this.mapCoordsToCanvas(this._point1.coordinate, canvasModel);
    const p2 = this.mapCoordsToCanvas(this._point2.coordinate, canvasModel);
    canvasModel.context.beginPath();
    canvasModel.context.strokeStyle = this.color;
    canvasModel.context.moveTo(p1.x, p1.y);
    canvasModel.context.lineTo(p2.x, p2.y);
    canvasModel.context.stroke();
  };
}
