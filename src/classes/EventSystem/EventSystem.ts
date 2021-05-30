import { EventEmitter } from 'events';

export type EventSystemSubscriber<
  T,
  U extends keyof GlobalEventHandlersEventMap
> = {
  event: keyof GlobalEventHandlersEventMap | string;
  subscriber: T;
  callback: (sub: T, params: GlobalEventHandlersEventMap[U]) => void;
};

export default class EventSystem extends EventEmitter {
  private static _instance: EventSystem;
  private _subscribers: EventSystemSubscriber<any, any>[];

  private constructor() {
    super();

    this._subscribers = [];
  }

  public static getInstance(): EventSystem {
    if (!this._instance) EventSystem._instance = new EventSystem();

    return EventSystem._instance;
  }

  /**
   * Регистрация слушателей событий
   * @param element HTML элемент для реагирования на события
   */
  public registerEvents(element: any): void {
    element.onclick = (e: MouseEvent) => this.onEvent('click', e);
    element.onmouseenter = (e: MouseEvent) => this.onEvent('mouseenter', e);
    element.onmousedown = (e: MouseEvent) => this.onEvent('mousedown', e);
    element.onmousemove = (e: MouseEvent) => this.onEvent('mousemove', e);
    element.onmouseup = (e: MouseEvent) => this.onEvent('mouseup', e);
    element.onmouseleave = (e: MouseEvent) => this.onEvent('mouseleave', e);
    element.onkeydown = (e: KeyboardEvent) => this.onEvent('keydown', e);
  }

  /**
   * Подписка элемента на события
   * @param {GlobalEventHandlers} event Событие для реагирования
   * @param subscriber Элемент для подписки на события
   * @param callback Колбэк события
   */
  public subscribe<T, U extends keyof GlobalEventHandlersEventMap>(
    event: U | string,
    subscriber: T,
    callback: (sub: T, params: GlobalEventHandlersEventMap[U]) => void
  ): void {
    this._subscribers.push({
      event,
      subscriber,
      callback: callback
    });
  }

  public notify<T, U extends keyof GlobalEventHandlersEventMap>(
    event: U | string,
    element: T,
    params: GlobalEventHandlersEventMap[U]
  ): void {
    this._subscribers.find((subscriber: EventSystemSubscriber<any, any>) => {
      if (subscriber.event === event && subscriber.subscriber === element)
        subscriber.callback(subscriber.subscriber, params);
    });
  }

  private onEvent<
    T extends keyof GlobalEventHandlersEventMap,
    U extends GlobalEventHandlersEventMap[T]
  >(event: T, params: U): void {
    this._subscribers.filter((sub: EventSystemSubscriber<any, any>) => {
      if (sub.event === event && document.activeElement === sub.subscriber)
        sub.callback(sub.subscriber, params);
    });
  }
}
