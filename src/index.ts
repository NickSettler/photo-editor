import PhotoEditor from './classes/PhotoEditor/PhotoEditor';
import Scene from './classes/Scene/Scene';
import EventSystem from './classes/EventSystem/EventSystem';

const canvas: HTMLCanvasElement = document.getElementById(
  'canvas'
) as HTMLCanvasElement;

const photoEditor = new PhotoEditor(canvas);

const s = new Scene();

EventSystem.getInstance().registerEvents(window);

EventSystem.getInstance().subscribe('click', canvas, (sub, params) => {
  console.log(sub, params);
});

EventSystem.getInstance().subscribe('click', 'asd', (sub, params) => {
  console.log(sub, params);
});

window.onmousedown = (e) => {
  EventSystem.getInstance().notify('click', 'asd', e);
};
