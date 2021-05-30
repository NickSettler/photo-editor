import Scene from '../Scene/Scene';
import EventSystem from '../EventSystem/EventSystem';

export type PhotoEditorOptions = {
  width: number;
  height: number;
};

const DefaultPhotoEditorOptions: PhotoEditorOptions = {
  width: 640,
  height: 480
};

export default class PhotoEditor {
  /* Параметры канваса */
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;

  /* Параметры отрисовки и производительности */
  private _runTime = 0;

  private _scenes: Array<Scene>;

  constructor(
    canvas: HTMLCanvasElement,
    { width, height }: PhotoEditorOptions = DefaultPhotoEditorOptions
  ) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._width = this._canvas.width = width;
    this._height = this._canvas.height = height;

    this._scenes = [];

    this.start();
  }

  public addScene(scene: Scene): void {
    this._scenes.push(scene);
  }

  private update(dt: number) {
    // console.log(dt);
  }
  private render(dt: number) {
    const renderScenes = (context: CanvasRenderingContext2D) => {
      this._scenes.forEach((scene: Scene) => scene.render(context));
    };

    const internalCanvas = document.createElement('canvas');
    internalCanvas.width = this._width;
    internalCanvas.height = this._height;
    const internalContext = internalCanvas.getContext('2d', {
      alpha: false
    });

    renderScenes(internalContext);

    this._context.drawImage(internalCanvas, 0, 0);
  }

  private tick(time: number): void {
    const delta = time - this._runTime;
    this._runTime = time;

    this.update(delta);
    this.render(delta);

    requestAnimationFrame(this.tick.bind(this));
  }
  private start() {
    this.tick(performance.now());
  }
}
