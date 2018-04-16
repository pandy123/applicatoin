/**
 * 文档事件枚举。
 */
export class DocumentEventEnum {
   /** 创建 */
   public static Create: string = 'document.create';
   /** 另存为 */
   public static SaveAs: string = 'document.saveas';
   /** 编辑 */
   public static Edit: string = 'document.edit';
   /** 打开 */
   public static Open: string = 'document.open';
   /** 保存 */
   public static Save: string = 'document.save';
   /** 加载 */
   public static Load: string = 'document.load';
   /** 加载中 */
   public static Loading: string = 'document.loading';
   /** 加载完成 */
   public static Loaded: string = 'document.loaded';
   /** 关闭 */
   public static Close: string = 'document.close';
   /** 刷新 */
   public static Refresh: string = 'document.refresh';
}
