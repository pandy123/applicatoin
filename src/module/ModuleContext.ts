import { Application } from "../appliation/Application";


/**
 * 模块环境。
 */
export class ModuleContext {
   /** 应用 */
   public application: Application;
   constructor() {
      this.application = null as any;
   }
}