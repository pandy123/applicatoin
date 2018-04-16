import { Module, ModuleMap } from './Module';
import { ModuleContext } from './ModuleContext';

/**
 * 模块管理器。
 */
export class ModuleManager {
   /** 模块环境 */
   public context: ModuleContext;
   /** 模块集合 */
   public modules: ModuleMap;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.context = new ModuleContext();
      this.modules = new Object() as ModuleMap;
   }

   /**
    * 配置处理。
    *
    * @param module 模块
    */
   public setup() {
      var context = this.context;
      var modules = this.modules;
      for (var name in modules) {
         var module = modules[name];
         module.setup(context);
      }
   }

   /**
    * 注册模块。
    *
    * @param module 模块
    */
   public register(module: Module) {
      this.modules[module.name] = module;
   }

   /**
    * 根据名称获得模块。
    *
    * @param name 名称
    * @return 模块
    */
   public find(name: string): Module {
      return this.modules[name];
   }

   /**
    * 注销模块。
    *
    * @param module 模块
    */
   public unregister(module: Module) {
      delete this.modules[module.name];
   }

   /**
    * 启动处理。
    *
    * @param module 模块
    */
   public startup() {
      var context = this.context;
      var modules = this.modules;
      for (var name in modules) {
         var module = modules[name];
         module.startup(context);
      }
   }

   /**
    * 逻辑处理。
    */
   public process() {
      var context = this.context;
      var modules = this.modules;
      for (var name in modules) {
         var module = modules[name];
         module.process(context);
      }
   }

   /**
    * 停止处理。
    */
   public shutdown() {
      var context = this.context;
      var modules = this.modules;
      for (var name in modules) {
         var module = modules[name];
         module.shutdown(context);
      }
   }
}
