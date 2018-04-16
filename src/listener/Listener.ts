
export class Listener {
   /** 有效标志 */
   public enable: boolean;
   /** 代码 */
   public code: string;
   /** 拥有者 */
   public owner: any;
   /** 函数 */
   public callback: Function;
   /** 参数集合 */
   public parameters: any;
   /** 计数器 */
   public counter: number;

   /**
    * 构造处理。
    * - new Listener(callback)
    * - new Listener(owner, callback)
    *
    * @param param1 参数1
    * @param param2 参数2
    */
   public constructor(param1?: any, param2?: Function) {
      this.code = null as any;
      this.owner = null as any;
      this.callback = null as any;
      this.parameters = null as any;
      this.counter = null as any;

      // 设置属性
      this.enable = true;
      this.counter = -1;
      // 设置属性
      var argumentCount = arguments.length;
      if (argumentCount == 1) {
         this.callback = param1;
      } else if (argumentCount == 2) {
         this.owner = param1;
         this.callback = param2 as any;
      } else if (argumentCount > 2) {
      }
   }

   /**
    * 事件处理。
    *
    * @param sender 发出对象
    * @param parameters 参数集合
    */
   public process(sender: any, parameters: Array<any>): void {
      if (this.enable) {
         // 获得调用者
         var owner = this.owner || sender;
         // 计数处理
         if (this.counter > 0) {
            this.counter--;
         }
      }
   }
}
