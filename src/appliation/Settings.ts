
import { Application } from './Application';


/**
 * 设置信息。
 */
export class Settings {
   /** 应用 */
   public application: Application;
   /** 窗口 */
   public htmlWindow: Window;
   /** 文档 */
   public htmlDocument: HTMLDocument;
   /** 面板 */
   public htmlPanel: HTMLBodyElement;
   constructor() {
      this.application = null as any;
      this.htmlWindow = null as any;
      this.htmlDocument = null as any;
      this.htmlPanel = null as any;
   }
}
