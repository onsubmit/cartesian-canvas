import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { CartesianPlane } from '../../CartesianPlane';
import { Constants } from '../../Constants';
import { LineSegment } from '../../Drawables/LineSegment';
import { Point } from '../../Drawables/Point';
import { Polygon } from '../../Drawables/Polygon';
import { Scene, SceneCanvases, SceneProps } from './Scene';

function MainScene() {
  const CANVAS_SCALE = 100;

  const sceneCanvasesRef = useRef<SceneCanvases | null>(null);
  const [sceneProps, setSceneProps] = useState<SceneProps | null>(null);

  useEffect(() => {
    if (!sceneCanvasesRef.current?.background) {
      return;
    }

    if (sceneProps?.background?.canvasModel) {
      draw();
      return;
    }

    const backgroundCanvasContext = sceneCanvasesRef.current.background.getContext('2d');
    if (!backgroundCanvasContext) {
      throw new Error('Could not get background canvas drawing context');
    }

    const cartesianPlane: CartesianPlane = {
      x: {
        min: -10,
        max: 10,
      },
      y: {
        min: -10,
        max: 10,
      },
    };

    setSceneProps({
      background: {
        canvasModel: new CanvasModel(backgroundCanvasContext, CANVAS_SCALE, cartesianPlane),
        drawables: [],
      },
    });
  }, [sceneProps?.background?.canvasModel]);

  function draw() {
    setSceneProps((prev) => {
      if (!prev) {
        return null;
      }

      const ngonPoints: Array<Point> = [];
      const ngonSides = 5;
      const radius = 10;
      const twoPiDivSides = Constants.TWO_PI / ngonSides;
      for (let i = 0; i < ngonSides; i++) {
        ngonPoints.push(
          new Point({
            coordinate: { x: radius * Math.cos(twoPiDivSides * i), y: radius * Math.sin(twoPiDivSides * i) },
          })
        );
      }

      const ngon = new Polygon({
        points: ngonPoints,
      });

      const splitPoints = ngon.lineSegments.map((segment) => segment.split(75));
      const splitPointsLength = splitPoints.length;
      const curveSegments: Array<LineSegment> = [];
      for (let i = 0; i < splitPointsLength; i++) {
        const points1 = splitPoints[i]!;
        const points2 = splitPoints[(i + 1) % splitPointsLength]!;
        for (let j = 0; j < points1.length; j++) {
          const point1 = points1[j]!;
          const point2 = points2[j]!;
          curveSegments.push(new LineSegment({ point1, point2 }));
        }
      }

      return {
        background: {
          canvasModel: prev.background?.canvasModel ?? null,
          drawables: [ngon, ...curveSegments],
        },
      };
    });
  }

  return <Scene ref={sceneCanvasesRef} background={sceneProps?.background} />;
}

export default MainScene;
