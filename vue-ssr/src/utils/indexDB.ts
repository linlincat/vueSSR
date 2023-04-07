// 接受两个参数,第一个是数据库名称,第二个参数版本号,默认为1

export default class DB {
  private dbName: string; // 数据库名称
  private db: any; // 数据库对象
  constructor(dbName: string) {
    this.dbName = dbName;
  }
  // 打开数据库
  openStore(storeName: any, keyPath: any, indexs?: Array<string>) {
    // window.indexedDB.open("", 1); 返回一个IDBOpenDBRequest对象
    const request = window.indexedDB.open(this.dbName);
    return new Promise((resolve, reject) => {
      // 数据库打开成功
      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve(true);
      };
      // 数据库打开失败
      request.onerror = (event) => {
        reject(event);
      };
      // 数据库升级成功
      request.onupgradeneeded = (event) => {
        const { result }: any = event.target;
        // autoIncrement-是否自动递增 keypath-健值  result.createObjectStore
        const store = result.createObjectStore(storeName, {
          autoIncrement: true,
          keyPath,
        });
        if (indexs && indexs.length > 0) {
          indexs.map((v) => {
            // 1.索引的名称 2.索引的对象 3.unique-是否唯一[如何设置唯一,索引不能重复便不能添加多个]
            store.createIndex(v, v, { unique: false });
          });
        }
        // 添加事务的回调
        store.transaction.oncomplete = (event: any) => {
          // 判断是否升级成功
        };
      };
    });
  }

  // 新增数据库数据 传id了就修改否则就新增
  updateItem(storeName: string, data: any) {
    // 1.数据库的名字 2.读写模式
    // 创建一个数据库并插入
    const store = this.db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);
    // put 修改 add 新增[包含主键的 这里对应的是 id]
    const request = store.put({ ...data, updateTime: new Date().getTime() });
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        resolve(event);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }
  // 删除数据
  deleteItem(storeName: string, key: number | string) {
    const store = this.db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);
    const request = store.delete(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        resolve(event);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }
  // 查询数据
  getList(storeName: string) {
    const store = this.db.transaction(storeName).objectStore(storeName);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }
  // 查询某一条数据
  getItem(storeName: string, key: number | string) {
    const store = this.db.transaction(storeName).objectStore(storeName);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }
}
