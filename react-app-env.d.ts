/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;

    // 是否开启vconsle
    readonly REACT_APP_V_CONSLO: "true" | "false"

    //环境变量
    readonly REACT_APP_BUSINESS_ENV: "dev" | "pre" | "pro"

    // 是否在npm run start 自动打开网页
    readonly REACT_APP_OPEN_BROWSER: "false" | "true"

    //app的入口文件
    readonly REACT_APP_ENTRY: 'index' | 'index-demo'

  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}


// 关于元素的只读信息
interface DOMRectReadOnly {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}
//监听器回调函数中的参数类型，自带元素本身(target)与对应的只读位置、大小信息(contentRect)
interface ResizeObserverEntry {
  target: HTMLElement | null;
  contentRect: ResizeObserverEntry["target"] extends null ? null : DOMRectReadOnly
}
// 监听器构造函数所需要传入的回调函数
type EntriesFuntion = (entries: Array<ResizeObserverEntry>) => void;
/**
* 元素大小、位置变化监听器
*/
declare class ResizeObserver {
  /**
   * 元素大小、位置变化监听器
   * @param entriesFn 关于挂载到监听器的回调函数
   * @returns {Observer} 返回一个监听器对象
   */
  constructor(entriesFn: EntriesFuntion): ResizeObserver { };
  /**
   * 执行目标元素的监听
   * @param target 要执行监听的目标元素
   * @param options 设置元素的盒子模型，默认为content-box
   * @returns {void}
   */
  observe(target: HTMLElement | null, options?: { box: 'border-box' | "content-box" }): void;

  /**
   * 取消目标元素的监听
   * @param target 要取消执行监听的目标元素
   * @returns {void}
   */
  unobserve(target: HTMLElement | null): void

  /**
   * 取消所有元素监听
   */
  disconnect(target: HTMLElement | null, options?: { box: 'border-box' | "content-box" }): void
}
