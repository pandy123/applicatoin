export class Timer {
   /** 开始时间 */
   public _startTime: number;
   /** 结束时间 */
   public _lastTime: number;
   /** 次数 */
   public _count: number;
   /** 间隔 */
   public interval: number;

   /**
    * 构造处理。
    */
   public constructor() {
      this._startTime = 0;
      this._lastTime = 0;
      this._count = 0;
      this.interval = 0;
   }

   /**
    * 配置处理。
    */
   public setup() {
      var tick = new Date().getTime();
      this._startTime = tick;
      this._lastTime = tick;
      this.interval = 0;
   }

   /**
    * 获得现在时刻。
    */
   public now() {
      return new Date().getTime();
   }

   /**
    * 获得当前时间长度。
    *
    * @return 时间长度
    */
   public get length() {
      return this._lastTime - this._startTime;
   }

   /**
    * 获得当前时间。
    *
    * @return 时间
    */
   public get current() {
      return this._lastTime;
   }

   /**
    * 获得速率(次/秒)。
    *
    * @return 速率
    */
   public rate() {
      if (this._count == 0) {
         return 0;
      }
      var t = this._lastTime - this._startTime;
      var c = this._count * 1000 / t;
      return parseInt(c as any);
   }

   /**
    * 更新处理。
    */
   public update() {
      var tick = new Date().getTime();
      this._count++;
      this.interval = tick - this._lastTime;
      this._lastTime = tick;
   }
}
