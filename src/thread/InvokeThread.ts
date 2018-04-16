import { Thread } from './Thread';


export class InvokeThread extends Thread {
   // 拥有着
   public owner: any;
   // 回调处理
   public callback: Function;

   /**
    * 构造处理。
    *
    * @param owner 调用者
    * @param callback 回调处理
    */
   public constructor(owner: any, callback: Function, interval?: number) {
      super();
      this.owner = owner;
      this.callback = callback;
      if (interval != null) {
         this.interval = interval;
      }
   }

   /**
    * 调用处理。
    *
    * @return 处理结果
    */
   public onProcess() {
      this.callback.call(this.owner);
      return 'ResultEnum.Success';
   }

}
