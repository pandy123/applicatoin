/**
 * 平台。
 */
export class Platform {
   /** 应用 */
   protected static _application: any;

   /**
    * 获得应用。
    */
   public static initialize(clazz: Function) {
      var application = this._application = new (clazz as any)();
      return application;
   }

   /**
    * 获得应用。
    */
   public static get application(): any {
      return this._application;
   }

   /**
    * 获得当前激活视窗。
    */
   public static findView(code: string) {
      var view = null;
      var application = Platform.application;
      if (application) {
         view = application.getView(code);
      }
      return view;
   }

   /**
    * 获得当前激活视窗的文档。
    */
   public static findDocument(code: string) {
      var document = null;
      var application = Platform.application;
      if (application) {
         document = application.getDocument(code);
      }
      return document;
   }
}
