import { InvokeThread } from '../thread/InvokeThread';
import { ThreadService } from '../thread/ThreadService';
import { ModuleManager } from '../module/ModuleManager';
import { Settings } from './Settings';

/**
 * 应用程序。
 */
export class Application {
   /** 名称 */
   public name: string;
   /** 标签 */
   public label: string;
   /** 配置信息 */
   public settings: Settings;
   /** 模块管理器 */
   public moduleManager: ModuleManager;
   /** 配置标志 */
   protected _setuped: boolean;
   /** 线程 */
   protected _thread: InvokeThread;
   /** 间隔 */
   protected _interval: number;
   /** 存储控制台 */
   protected _threadService: ThreadService;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this._interval = 10;
      this.name = null as any;
      this.label = null as any;
      this.settings = null as any;
      this.moduleManager = null as any;
      this._setuped = null as any;
      this._thread = null as any;
      this._interval = null as any;
      this._threadService = null as any;
   }

   /**
    * 配置处理。
    */
   public onSetup(settings: Settings) {
      // 设置属性
      this.settings = settings;
      // 创建管理器
      var moduleManager = this.moduleManager = new ModuleManager();
      moduleManager.context.application = this;
      // 创建线程
      var thread = this._thread = new InvokeThread(this, this.process, this._interval);
      thread.name = 'application.thread';
      thread.interval = this._interval;
      this._setuped = true;
   }

   /**
    * 配置处理。
    */
   public setup(settings: Settings) {
      if (!this._setuped) {
         this.onSetup(settings);
         this._setuped = true;
      }
   }

   /**
    * 启动处理。
    */
   public start() {
      // 注册并启动
      this._threadService.register(this._thread);
   }

   /**
    * 逻辑处理。
    */
   public process() {
      this.moduleManager.process();
   }

   /**
    * 停止处理。
    */
   public stop() {
      this._thread.stop();
   }

}
