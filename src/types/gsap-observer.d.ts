declare module 'gsap/dist/Observer' {
  export type ObserverTarget =
    | Window
    | Document
    | HTMLElement
    | EventTarget
    | string;

  export type ObserverTypeString =
    | 'wheel'
    | 'touch'
    | 'pointer'
    | 'wheel,touch,pointer'
    | 'wheel,touch'
    | 'wheel,pointer'
    | 'touch,pointer';

  export interface ObserverVars {
    target?: ObserverTarget;
    type?: ObserverTypeString;
    wheelSpeed?: number;
    tolerance?: number;
    preventDefault?: boolean;

    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
  }

  export interface ObserverInstance {
    kill: () => void;
  }

  export interface ObserverPlugin {
    create: (vars: ObserverVars) => ObserverInstance;
  }

  export const Observer: ObserverPlugin;
}
