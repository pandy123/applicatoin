import { Module } from '../module/Module';
import { ViewContext } from './ViewContext';
import { Application } from '../appliation/Application';

/**
 * 视图。
 */
export class View {
   /** 应用 */
   public application: Application;
   /** 模块 */
   public module: Module;
   /** 名称 */
   public name: string;
   /** 设置状态 */
   public statusSetup: boolean;
   /** 激活状态 */
   public statusActive: boolean;
   /** 可见状态 */
   public statusVisible: boolean;
   /** 尺寸脏 */
   public dirtyResize: boolean;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.name = 'view';
      this.statusSetup = false;
      this.statusActive = false;
      this.statusVisible = false;
      this.application = null as any;
      this.module = null as any;
      this.dirtyResize = false;
   }

   /** 
    * 配置处理。
    */
   public onSetup() {
   }

   /**
    * 配置处理。
    */
   public setup(): void {
      if (!this.statusSetup) {
         this.onSetup();
         this.statusSetup = true;
      }
   }

   /**
    * 激活处理。
    */
   public onActive() {
   }

   /**
    * 设置可见性。
    *
    * @param visible 可见性
    */
   public setVisible(visible: boolean) {
   }

   /**
    * 激活处理。
    */
   public active() {
      if (!this.statusActive) {
         this.onActive();
         this.statusActive = true;
      }
   }

   /**
    * 显示处理。
    */
   public show() {
      if (!this.statusVisible) {
         this.setVisible(true);
         this.statusVisible = true;
      }
   }

   /**
    * 改变大小事件。
    */
   public onResize() {
   }

   /**
    * 改变窗口大小处理。
    *
    * @param size 尺寸
    */
   public resize() {
      this.dirtyResize = true;
   }

   /**
    * 更新处理。
    */
   public onUpdate() {
   }

   /**
    * 更新处理。
    */
   public update() {
      this.onUpdate();
   }

   /**
    * 逻辑处理。
    */
   public onProcess() {
   }

   /**
    * 逻辑前处理。
    */
   public processBefore(context: ViewContext) {
      // 尺寸脏处理
      if (this.dirtyResize) {
         this.onResize();
         this.dirtyResize = false;
      }
   }

   /**
    * 逻辑处理。
    */
   public process(context: ViewContext) {
      if (this.statusActive) {
         this.onProcess();
      }
   }

   /**
    * 逻辑后处理。
    */
   public processAfter(context: ViewContext) {
   }

   /**
    * 取消激活处理。
    */
   public onDeactive() {
   }

   /**
    * 隐藏处理。
    */
   public hide() {
      if (this.statusVisible) {
         this.setVisible(false)
         this.statusVisible = false;
      }
   }

   /**
    * 取消激活处理。
    */
   public deactive() {
      if (this.statusActive) {
         this.onDeactive();
         this.statusActive = false;
      }
   }
}

/**
 * 视图集合。
 */
export type ViewMap = {
   [key: string]: View
}
