import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { CartesianPlane } from '../../CartesianPlane';
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
        min: -6,
        max: 6,
      },
      y: {
        min: -6,
        max: 6,
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

      const diamond = new Polygon({
        points: [
          new Point({ coordinate: { x: -5, y: 0 } }),
          new Point({ coordinate: { x: 0, y: 5 } }),
          new Point({ coordinate: { x: 5, y: 0 } }),
          new Point({ coordinate: { x: 0, y: -5 } }),
        ],
      });

      const splitPoints = diamond.lineSegments.flatMap((segment) => segment.split(10));

      return {
        background: {
          canvasModel: prev.background?.canvasModel ?? null,
          drawables: [diamond, ...splitPoints],
        },
      };
    });
  }

  return <Scene ref={sceneCanvasesRef} background={sceneProps?.background} />;
}

export default MainScene;
