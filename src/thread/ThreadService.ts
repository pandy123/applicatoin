import { Service } from '../service/Service';
import { Thread } from './Thread';
import { TimerUtil } from '../util/TimerUtil';
import { TickerUtil } from '../util/TickerUtil';
import { ThreadStatusEnum } from './ThreadStatusEnum';

export class ThreadService extends Service {
   /** 帧模式 */
   protected _frameMode: boolean;
   /** 执行间隔 */
   protected _interval: number;
   /** 运行状态 */
   protected _statusRunning: boolean;
   /** 句柄 */
   protected _hHandle: any;
   /** 线程集合 */
   protected _threads: Array<Thread>;

   /**
    * 构造处理。
    */
   public constructor() {
      super();
      // 设置属性
      this._scopeCd = 'ScopeEnum.Global';
      this._frameMode = (typeof window != 'undefined');
      this._interval = 10;
      this._statusActive = true;
      this._threads = new Array<Thread>();
      this._statusRunning = false;
   }

   /**
    * 获得线程集合。
    *
    * @return 线程集合
    */
   public get threads(): Array<Thread> {
      return this._threads;
   }

   /**
    * 初始化处理
    */
   public initialize() {
      TimerUtil.setup();
      // 设置回调
      if (this._frameMode) {
         requestAnimationFrame(this.onInterval);
      } else {
         this._hHandle = setInterval(this.onInterval, this._interval);
      }
   }

   /**
    * 回调处理。
    */
   public onInterval = (tick: number) => {
      // 更新时间
      TimerUtil.update();
      TickerUtil.update(tick);
      // 处理线程
      this.processAll();
      // 请求下一帧
      if (this._frameMode) {
         if (this.statusActive) {
            requestAnimationFrame(this.onInterval);
         }
      }
   }

   /**
    * 增加一个新线程。
    *
    * @param thread 线程
    */
   public push(thread: Thread) {
      this._threads.push(thread);
   }

   /**
    * 启动一个新线程。
    *
    * @param thread 线程
    */
   public register(thread: Thread) {
      thread.start();
      this._threads.push(thread);
   }

   /**
    * 启动一个新线程。
    *
    * @param thread 线程
    */
   public find(name: string): Thread {
      var length = this._threads.length;
      for (var n = 0; n < length; n++) {
         var thread = this._threads[n];
         if (thread.name == name) {
            return thread;
         }
      }
      return null as any;
   }

   /**
    * 启动一个新线程。
    *
    * @param thread 线程
    */
   public resetThread(name: string) {
      var thread = this.find(name);
      if (thread) {
         var current = TimerUtil.current;
         thread.reset(current);
      }
   }
   /**
    * 停止一个新线程。
    *
    * @param thread 线程
    */
   public stop(thread: Thread) {
      var index = this._threads.indexOf(thread);
      this._threads.splice(index, 1);
      thread.stop();
   }

   /**
    * 处理一个线程
    *
    * @param thread 线程
    * @param tick 时间戳
    */
   public processThread(thread: Thread, tick: number) {
      if (thread) {
         var statusCd = thread.statusCd;
         switch (statusCd) {
            case ThreadStatusEnum.Sleep:
               break;
            case ThreadStatusEnum.Active:
               thread.process(tick);
               break;
            case ThreadStatusEnum.Finish:
               var index = this._threads.indexOf(thread);
               this._threads.splice(index, 1);
               break;
         }
      }
   }

   /**
    * 处理线程集合
    *
    * @param tick 时间戳
    */
   public processThreads(tick: number) {
      var threads = this._threads;
      var count = threads.length;
      for (var i = 0; i < count; i++) {
         var thread = threads[i];
         this.processThread(thread, tick);
      }
   }

   /**
    * 处理所有线程
    *
    * @param thread 线程
    */
   public processAll() {
      // 激活处理
      if (this._statusActive) {
         var threads = this._threads;
         var current = TimerUtil.current;
         this.processThreads(current);
      }
   }
}
