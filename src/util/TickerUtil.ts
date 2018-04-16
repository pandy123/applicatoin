export class TickerUtil {
   /** 开始时刻 */
   public static startTick: number = 0;
   /** 上次时刻 */
   public static lastTick: number = 0;
   /** 当前时刻 */
   public static currentTick: number = 0;
   /** 次数 */
   public static count: number = 0;
   /** 间隔 */
   public static interval: number = 0;
   /** 当前间隔 */
   public static currentInterval: number = 0;
   /** 间隔限制 */
   public static limit: number = 50;

   /**
    * 获得当前时间长度。
    *
    * @return 时间长度
    */
   public get length(): number {
      return TickerUtil.lastTick - TickerUtil.startTick;
   }

   /**
    * 更新处理。
    */
   public static update(tick: number) {
      if (TickerUtil.count == 0) {
         TickerUtil.startTick = tick;
      }
      TickerUtil.currentTick = tick;
      TickerUtil.currentInterval = tick - TickerUtil.lastTick;
      TickerUtil.interval = Math.min(tick - TickerUtil.lastTick, TickerUtil.limit);
      TickerUtil.lastTick = tick;
      TickerUtil.count++;
   }
}