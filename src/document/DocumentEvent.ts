
import { Document } from './Document';

/**
 * 文档事件。
 */
export class DocumentEvent {
   /** 文档对象 */
   public document: Document;
   /** 根节点 */
   public root: any;
   /** 内容节点 */
   public content: any;

   constructor() {
      this.document = null as any;
      this.root = null as any;
      this.content = null as any;
   }

   /**
    * 释放处理。
    */
   public free() {
      this.document = null as any;
      this.root = null as any;
      this.content = null as any;
   }
}
