import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { CartesianPlane } from '../../CartesianPlane';
import { Point } from '../../Drawables/Point';
import { Scene, SceneCanvases, SceneProps } from './Scene';

function MainScene() {
  const CANVAS_SCALE = 30;

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

      return {
        background: {
          canvasModel: prev.background?.canvasModel ?? null,
          drawables: [new Point({ x: 0, y: 0 })],
        },
      };
    });
  }

  return <Scene ref={sceneCanvasesRef} background={sceneProps?.background} />;
}

export default MainScene;
