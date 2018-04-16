import { SpeedUtil } from '../util/SpeedUtil';
import { TimerUtil } from '../util/TimerUtil';
import { ThreadStatusEnum } from './ThreadStatusEnum';

export abstract class Thread {
   /** 名称 */
   public name: string;
   /** 延时 */
   public delay: number;
   /** 间隔 */
   public interval: number;
   /** 状态 */
   public statusCd: ThreadStatusEnum;
   /** 启动时刻 */
   protected _startTick: number;
   /** 最后时刻 */
   protected _lastTick: number;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.delay = 0;
      this.interval = 100;
      this._startTick = 0;
      this._lastTick = 0;
      this.statusCd = ThreadStatusEnum.Sleep;
      this.name = null as any;
   }

   /**
    * 启动处理。
    */
   public start() {
      this.statusCd = ThreadStatusEnum.Active;
      this._startTick = TimerUtil.current;
   }

   /**
    * 暂停处理。
    */
   public pause() {
      this.statusCd = ThreadStatusEnum.Sleep;
   }

   /**
    * 继续处理。
    */
   public resume() {
      this.statusCd = ThreadStatusEnum.Active;
   }

   /**
    * 停止处理。
    */
   public stop() {
      this.statusCd = ThreadStatusEnum.Finish;
   }

   /**
    * 重置处理。
    */
   public reset(tick: number) {
      this._lastTick = tick;
   }
   /**
    * 调用处理。
    */
   public onProcess() {
   };

   /**
    * 调用处理。
    *
    * @param tick 时刻
    */
   public process(tick: number) {
      SpeedUtil.begin();
      if (this._lastTick == 0) {
         // 起始第一针
         var span = tick - this._startTick;
         if (span >= this.delay) {
            this.onProcess();
            this._lastTick = tick;
         }
      } else {// 后面的针
         var span = tick - this._lastTick;
         if (span > this.interval) {
            this.onProcess();
            this._lastTick = tick;
         }
      }
      SpeedUtil.test('Process thread slow. (thread=' + this.name + ')', 30);
   }
}
