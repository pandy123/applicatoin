import { Document, DocumentMap } from '../document/Document';
import { Platform } from '../Platform';
import { View, ViewMap } from '../view/View';
import { ViewContext } from '../view/ViewContext';
import { ViewEvent } from '../view/ViewEvent';
import { ViewEventEnum } from '../view/ViewEventEnum';
import { ModuleContext } from './ModuleContext';
import { Application } from '../appliation/Application';

/**
 * 模块。
 */
export class Module {
   /** 应用 */
   public application: Application;
   /** 配置 */
   public settings: any;
   /** 名称 */
   public name: string;
   /** 激活的视图 */
   public activeView: View;
   /** 视图集合 */
   public views: ViewMap;
   /** 文档集合 */
   public documents: DocumentMap;
   /** 视图环境 */
   protected _viewContext: ViewContext;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.views = new Object() as ViewMap;
      this.documents = new Object() as DocumentMap;
      this._viewContext = new ViewContext();
      this.application = null as any;
      this.settings = null as any;
      this.name = null as any;
      this.activeView = null as any;
      this.documents = null as any;

   }

   /**
    * 配置处理。
    *
    * @param context 环境
    */
   public setup(context: ModuleContext) {
   }

   /**
    * 查找指定名称的文档。
    *
    * @param name 名称
    * @return 文档
    */
   public findDocument(name: string): Document {
      return this.documents[name];
   }

   /**
    * 根据名称注册一个文档。
    *
    * @param name 名称
    * @param document 文档
    */
   public registerDocument(name: string, document: Document) {
      // 注册到模块
      this.documents[name] = document;
      // 注册到应用
      var application = Platform.application;
      application.registerDocument(name, document);
   }

   /**
    * 根据名称注销一个文档。
    *
    * @param name 名称
    */
   public unregisterDocument(name: string) {
      delete this.documents[name];
   }

   /**
    * 查找指定名称的视图。
    *
    * @param name 名称
    * @return 视图
    */
   public findView(name: string): View {
      return this.views[name];
   }

   /**
    * 根据名称注册一个视图。
    *
    * @param name 名称
    * @param view 视图
    */
   public registerView(name: string, view: View) {
      // 注册到模块
      this.views[name] = view;
      // 注册到应用
      var application = Platform.application;
      application.registerView(name, view);
   }

   /**
    * 根据名称注册一个视图。
    *
    * @param name 名称
    */
   public unregisterView(name: string) {
      delete this.views[name];
   }

   /**
    * 选择视图。
    *
    * @param code 代码
    * @return 视图
    */
   public selectView(code: string) {
      // 获得视图
      var view = this.findView(code);
      // 激活视图
      var activeView = this.activeView;
      if (activeView != view) {
         // 激活前分发消息
         var event = new Object() as any;
         event.view = view;
         event.before = true;
         if (activeView) {
            // 取消激活前分发消息
            event.view = view;
            event.before = true;
            // 取消激活
            activeView.deactive();
            // 取消激活后分发消息
            event.view = view;
            event.before = false;
         }
         this.activeView = view;
         view.active();
         // 激活后分发消息
         event.view = view;
         event.before = false;
      }
      return view;
   }

   /**
    * 启动处理。
    *
    * @param context 环境
    */
   public startup(context: ModuleContext) {
      this.application = context.application;
   }

   /**
    * 业务处理。
    *
    * @param context 环境
    */
   public process(context: ModuleContext) {
      var viewContext = this._viewContext;
      // 逻辑处理
      var views = this.views;
      for (var name in views) {
         var view = views[name];
         view.processBefore(viewContext);
         view.process(viewContext);
         view.processAfter(viewContext);
      }
   }

   /**
    * 设备改变大小处理。
    *
    * @param sender 发送者
    * @param event 事件
    */
   public resize() {
      // 逻辑处理
      var views = this.views;
      for (var name in views) {
         var view = views[name];
         view.resize();
      }
   }

   /**
    * 关闭处理。
    *
    * @param context 环境
    */
   public shutdown(context: ModuleContext) {
   }
}

/**
 * 模块集合。
 */
export type ModuleMap = {
   [key: string]: Module
}