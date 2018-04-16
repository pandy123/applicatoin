import { Service } from './Service';


export class ServiceManager {
   /** 服务集合 */
   protected _services: Object;

   /**
    * 构造处理。
    */
   public constructor() {
      this._services = new Object();
   }

   /**
    * 注册一个服务。
    *
    * @param service 服务
    */
   public register(service: Service) {
      var services = this._services as any;
      services[service.name] = service;
   }

   /**
    * 注册一个服务类。
    *
    * @param clazz 类名称
    */
   public registerClass(clazz: Function) {

      var service = this.get(clazz);
      // 保存服务
      var services = this._services as any;
      if (services[service.name]) {
         return;
      }
      this.register(service);
   }

   /**
    * 绑定一个服务。
    *
    * @param service 服务
    */
   public bind(service: Service) {
      var services = this._services as any;
      if (services) {
         if (services[service.name]) {
            return;
         }
      }
      this.register(service);
   }

   /**
    * 根据名称查找服务。
    *
    * @param name 名称
    * @return 服务
    */
   public find(name: string): any {
      var result = null;
      var services = this._services as any;
      if (services) {
         result = services[name];
      }
      return result;
   }

   /**
    * 根据类获得一个服务实例。
    *
    * @param value 类对象
    * @return 服务实例
    */
   public get(value: any): any {

      var instance = value.buildInstance();
      return instance;
   }

   /**
    * 加载配置信息。
    *
    * @param jconfig 配置信息
    */
   public loadConfig(jconfig: any) {
      if (jconfig) {
         var services = this._services as any;
         for (var name in services) {
            var service = services[name];
            var jservice = jconfig[name];
            if (service && jservice) {
               service.initializeConfig(jservice);
            }
         }
      }
   }

}
