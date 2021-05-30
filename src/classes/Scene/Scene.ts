import EventSystem from '../EventSystem/EventSystem';

export type SceneOptions = {
  width: number;
  height: number;
};

export const DefaultSceneOptions: SceneOptions = {
  width: 300,
  height: 300
};

export default class Scene {
  private _width: number;
  private _height: number;
  private _layers: never[];

  constructor({ width, height }: SceneOptions = DefaultSceneOptions) {
    this._width = width;
    this._height = height;
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'red';
    context.fillRect(0, 0, this._width, this._height);
  }
}
