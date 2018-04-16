export class Speed {
   /** 开始时间 */
   public startTick: number;
   /** 结束时间 */
   public endTick: number;
   /** 当前间隔 */
   public current: number;
   /** 执行间隔 */
   public span: number;
   /** 最小间隔 */
   public spanMin: number;
   /** 最大间隔 */
   public spanMax: number;
   /** 参数集合 */
   public parameters: any;
   // 开始时间

   public constructor(...params: Array<any>) {
      // 设置属性
      this.startTick = 0;
      this.endTick = 0;
      this.span = 0;
      this.spanMin = Number.MAX_VALUE;
      this.spanMax = 0;
      this.parameters = arguments;
      this.startTick = new Date().getTime();
      this.current = 0;
   }

   /**
    * 开始处理。
    */
   public begin() {
      this.startTick = new Date().getTime();
   }

   /**
    * 结束处理。
    */
   public end() {
      this.endTick = new Date().getTime();
      var current = this.current = this.endTick - this.startTick;
      this.span += current;
      if (current < this.spanMin) {
         this.spanMin = current;
      }
      if (current > this.spanMax) {
         this.spanMax = current;
      }
   }

   /**
    * 重置数据。
    */
   public reset() {
      this.startTick = 0;
      this.endTick = 0;
      this.span = 0;
   }

   /**
    * 记录运行信息。
    */
   public record(): number {
      this.end();
      return this.current;
   }

   /**
    * 获得字符串。
    *
    * @return 字符串
    */
   public toString() {
      return this.current + '/' + this.span + ' (' + this.spanMin + ' - ' + this.spanMax + ')';
   }
}
