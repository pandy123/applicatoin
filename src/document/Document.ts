import { DocumentEvent } from './DocumentEvent';
import { DocumentEventEnum } from './DocumentEventEnum';

/**
 * 文档。
 */
export class Document {
   /** 名称 */
   public name: string;
   /** 标签 */
   public label: string;

   constructor() {
      this.name = null as any;
      this.label = null as any;
   }

   /**
    * 创建文档处理。
    */
   public create() {

   }

   /**
    * 打开文档处理。
    */
   public open() {

   }

   /**
    * 保存文档处理。
    */
   public save() {

   }

   /**
    * 刷新文档处理。
    */
   public refresh() {

   }

   /**
    * 关闭文档处理。
    */
   public close() {

   }

   /**
    * 重置处理。
    */
   public reset() {
   }
}

/**
 * 文档表。
 */
export type DocumentMap = {
   [key: string]: Document;
}
