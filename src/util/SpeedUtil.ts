
/**
 * 测速工具
 */
export class SpeedUtil {
   /** 开始时刻 */
   public static _start: number;
   /** 结束时刻 */
   public static _end: number;

   /**
    * 开始处理。
    */
   public static begin() {
      SpeedUtil._start = new Date().getTime();
   }

   /**
    * 结束处理。
    */
   public static end(): number {
      SpeedUtil._end = new Date().getTime();
      var tick = SpeedUtil._end - SpeedUtil._start;
      return tick;
   }

   /**
    * 结束处理。
    */
   public static test(message: string, span: number) {
      SpeedUtil._end = new Date().getTime();
      var tick = SpeedUtil._end - SpeedUtil._start;
   }
}