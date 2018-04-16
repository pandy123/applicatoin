import { View } from './View';

/**
 * 视窗事件。
 */
export class ViewEvent {
   /** 视图 */
   public view: View;
   /** 前执行 */
   public before: boolean;

   constructor() {
      this.view = null as any;
      this.before = null as any;
   }
   /**
    * 释放处理。
    */
   public free() {
      this.view = null as any;
      this.before = null as any;
   }
}
