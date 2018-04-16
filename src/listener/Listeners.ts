import { Listener } from './Listener';

export class Listeners {
   /** 有效标志 */
   public enable: boolean;
   /** 代码 */
   public code: string;
   /** 发送者 */
   public sender: any;
   /** 监听集合 */
   public listeners: Array<Listener>;
   /** 执行监听集合 */
   protected _processListeners: Array<Listener>;

   /**
    * 构造处理。
    *
    * @param sender 发送者
    */
   public constructor(sender?: any) {
      // 设置属性
      this.enable = true;
      this.sender = sender || this;
      this.code = null as any;
      this.listeners = new Array<Listener>();
      this._processListeners = new Array<Listener>();
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      var listeners = this.listeners;
      if (listeners) {
         return listeners.length == 0;
      }
      return true;
   }

   /**
    * 查找一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    * @return 监听器
    */
   public find(owner: any, callback: Function, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any): Listener {
      var listeners = this.listeners;
      if (listeners) {
         var count = listeners.length;
         for (var i = 0; i < count; i++) {
            var listener = listeners[i];
            if ((listener.owner === owner) && (listener.callback === callback)) {
               var parameters = listener.parameters;
               if (parameters[0] == p1 && parameters[1] == p2 && parameters[2] == p3 && parameters[3] == p4 && parameters[4] == p5) {
                  return listener;
               }
            }
         }
      }
      return null as any;
   }

   /**
    * 注册一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    * @return 监听器
    */
   public register(owner: any, callback: Function, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any): Listener {
      // 检查是否已经注册
      var listener = this.find(owner, callback, p1, p2, p3, p4, p5);
      // 注册监听器
      listener = new Listener();
      listener.owner = owner;
      listener.parameters = [p1, p2, p3, p4, p5];
      listener.callback = callback;
      this.push(listener);
      // 返回监听器
      return listener as any;
   }

   /**
    * 注销一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    */
   public unregister(owner: any, callback: Function, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any) {
      // 检查是否已经注册
      var listener = this.find(owner, callback, p1, p2, p3, p4, p5);
      // 注销监听器
   }

   /**
    * 增加一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    * @return 监听器
    */
   public listen(owner: any, callback: Function, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any): Listener {
      // 检查是否已经注册
      var listener = this.find(owner, callback, p1, p2, p3, p4, p5);
      if (!listener) {
         // 注册监听器
         listener = new Listener();
         listener.owner = owner;
         listener.parameters = [p1, p2, p3, p4, p5];
         listener.callback = callback;
         this.push(listener);
      }
      // 返回监听器
      return listener as any;
   }

   /**
    * 移除一个监听器。
    *
    * @param owner 处理对象
    * @param callback 处理函数
    */
   public unlisten(owner: any, callback: Function, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any) {
      // 检查是否已经注册
      var listener = this.find(owner, callback, p1, p2, p3, p4, p5);
   }

   /**
    * 添加一个监听器对象到当前管理器内。
    *
    * @param listener 监听器对象
    */
   public push(listener: Listener) {
      // 增加监听器
      var listeners = this.listeners;
      if (!listeners) {
         listeners = this.listeners = new Array<Listener>();
         this._processListeners = new Array<Listener>();
      }
      listeners.push(listener);
   }


   /**
    * 允许一个监听器处理。
    *
    * @param owner 拥有者
    * @param method 函数
    * @param p1 参数1
    * @param p2 参数2
    * @param p3 参数3
    * @param p4 参数4
    * @param p5 参数5
    * @return 监听器
    */
   public enableListener(owner: any, method: Function, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any): Listener {
      var listener = this.find(owner, method, p1, p2, p3, p4, p5)
      if (listener) {
         listener.enable = true;
      }
      return listener;
   }

   /**
    * 禁止一个监听器处理。
    *
    * @param owner 拥有者
    * @param method 函数
    * @param p1 参数1
    * @param p2 参数2
    * @param p3 参数3
    * @param p4 参数4
    * @param p5 参数5
    * @return 监听器
    */
   public disableListener(owner: any, method: Function, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any): Listener {
      var listener = this.find(owner, method, p1, p2, p3, p4, p5)
      if (listener) {
         listener.enable = false;
      }
      return listener;
   }

   /**
    * 向所有监视器发出调用处理。
    *
    * @param parameters 参数集合
    */
   public process(p1?: any, p2?: any, p3?: any, p4?: any, p5?: any) {
      if (this.enable) {
         var listeners = this.listeners;
         if (listeners) {
            // 逻辑处理
            var processListeners = this._processListeners;
            var count = processListeners.length;
            for (var i = 0; i < count; i++) {
               var listener = processListeners[i];
               listener.process(this.sender, arguments as any);
            }
            // 逻辑处理
            var count = listeners.length;
            for (var i = count - 1; i >= 0; i--) {
               var listener = listeners[i];
            }
         }
      }
   }

   /**
    * 向所有监视器发出调用处理。
    *
    * @param parameters 参数集合
    */
   public dispatch(...parameters: Array<any>) {
      if (this.enable) {
         var listeners = this.listeners;
         if (listeners) {
            var count = listeners.length;
            for (var i = 0; i < count; i++) {
               var listener = listeners[i];
               listener.process(this.sender, parameters);
            }
         }
      }
   }

   /**
    * 清空处理。
    */
   public clear() {
      var listeners = this.listeners;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this.sender = null;
      var listeners = this.listeners;
      if (listeners) {
         var count = listeners.length;
         for (var i = 0; i < count; i++) {
            var listener = listeners[i];
            listeners[i] = null as any;
         }
         this.listeners = null as any;
      }
      this._processListeners = null as any;
   }
}

/**
 * 监听器集合类型。
 */
export type ListenersMap = {
   [key: string]: Listeners
}