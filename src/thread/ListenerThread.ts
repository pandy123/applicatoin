import { Thread } from './Thread';
import { Listeners } from '../listener/Listeners';

export class ListenerThread extends Thread {
   /** 处理监听集合 */
   public processListeners: Listeners;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this.processListeners = new Listeners(this);
   }

   /**
    * 调用处理。
    *
    * @return 处理结果
    */
   public onProcess() {
      this.processListeners.process();
      return 'ResultEnum.Success';
   }

}
