

export class Service {
   /** 名称 */
   public name: string;
   /** 范围类型 */
   protected _scopeCd: any;
   /** 初始化状态 */
   protected _statusInitialize: boolean;
   /** 设置状态 */
   protected _statusSetup: boolean;
   /** 激活状态 */
   protected _statusActive: boolean;
   /** 加载状态 */
   protected _statusLoad: boolean;
   static _instance: any;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this._scopeCd = 'ScopeEnum.Global';
      this._statusSetup = false;
      this._statusActive = false;
      this._statusLoad = false;
      this.name = null as any;
      this._statusInitialize = null as any;

   }

   /**
    * 获得范围。
    *
    * @return 范围
    */
   public get scopeCd() {
      return this._scopeCd;
   }

   public get instance() {
      if (!Service._instance) {
         Service._instance = new Service();
      }
      return Service._instance;
   }

   /**
    * 获得激活状态。
    *
    * @return 激活状态
    */
   public get statusActive(): boolean {
      return this._statusActive;
   }

   /**
    * 初始化处理。
    */
   public onInitialize() {
   }

   /**
    * 初始化处理。
    */
   public initialize() {
      if (!this._statusInitialize) {
         this.onInitialize();
         this._statusInitialize = true;
      }
   }

   /**
    * 加载配置信息。
    *
    * @param jconfig 配置信息
    */
   public initializeConfig(jconfig: any) {

   }

   /**
    * 配置处理。
    *
    * @param args 参数
    */
   public onSetup(args?: any) {
   }

   /**
    * 配置处理。
    *
    * @param args 参数
    */
   public setup(args?: any) {
      if (!this._statusSetup) {
         this.onSetup(args);
         this._statusSetup = true;
      }
   }

   /**
    * 激活处理。
    */
   public onActive() {
   }

   /**
    * 激活处理。
    */
   public active() {
      if (!this._statusActive) {
         this.onActive();
         this._statusActive = true;
      }
   }

   /**
    * 取消激活处理。
    */
   public onDeactive() {
   }

   /**
    * 取消激活处理。
    */
   public deactive() {
      if (this._statusActive) {
         this.onDeactive();
         this._statusActive = false;
      }
   }

   /**
    * 卸载处理。
    */
   public onUnload() {
   }

   /**
    * 卸载处理。
    */
   public unload() {
      if (this._statusLoad) {
         this.onUnload();
         this._statusLoad = false;
      }
   }
}
