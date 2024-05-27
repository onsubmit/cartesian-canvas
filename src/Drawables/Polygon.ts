import { CanvasModel } from '../CanvasModel';
import { Drawable } from './Drawable';
import { LineSegment } from './LineSegment';
import { Point } from './Point';

export type PolygonArgs = {
  points: Array<Point>;
  color?: string;
};

export class Polygon extends Drawable {
  private _points: Array<Point>;

  constructor({ points, color }: PolygonArgs) {
    super(color);
    this._points = points;
  }

  draw = (canvasModel: CanvasModel): void => {
    for (let i = 0, len = this._points.length; i < len; i++) {
      const point1 = this._points[i]!;
      const point2 = this._points[(i + 1) % len]!;
      const segment = new LineSegment({ point1, point2, color: this.color });

      point1.draw(canvasModel);
      point2.draw(canvasModel);
      segment.draw(canvasModel);
    }
  };
}
