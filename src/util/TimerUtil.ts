export class TimerUtil {
   // 开始时间
   public static _startTime: number;
   public static _lastTime: number;
   public static _count: number;
   public static interval: number;

   /**
    * 构造处理。
    */
   public static initialize() {
      var tick = new Date().getTime();
      this._startTime = tick;
      this._lastTime = tick;
      this.interval = 0;
   }

   /**
    * 设置处理。
    */
   public static setup() {
      this.initialize();
   }

   /**
    * 获得现在时刻。
    *
    * @return 时刻
    */
   public static now(): number {
      return new Date().getTime();
   }

   /**
    * 获得当前时间。
    *
    * @return 时间
    */
   public static get current(): number {
      return this._lastTime;
   }

   /**
    * 获得经过时间。
    *
    * @return 经过时间
    */
   public static get elapsed(): number {
      return this._lastTime - this._startTime;
   }

   /**
    * 更新处理。
    */
   public static update() {
      var tick = new Date().getTime();
      this._count++;
      this.interval = tick - this._lastTime;
      this._lastTime = tick;
   }
}

// 初始化
TimerUtil.initialize();
