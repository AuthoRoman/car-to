let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open("carsDB");

    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains("carsInWaitings")) {
        console.log("Creating cars queue");
        db.createObjectStore("carsInWaitings", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("carsInService")) {
        console.log("Creating  CarsInService");
        db.createObjectStore("carsInService", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("carsInFinish")) {
        console.log("Creating  carsInFinish");
        db.createObjectStore("carsInFinish", { keyPath: "id" });
      }
    };
    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log("request.onsuccess - initDB", version);
      resolve(true);
    };
    request.onerror = (error) => {
      console.log("error");
      resolve(false);
    };
  });
};


export const addData = <T>(storeName:string, data: T):Promise <T|string|null> =>{
    return new Promise((resolve) => {
        request = indexedDB.open('carsDB', version);
        request.onsuccess = () =>{
            console.log('request.onsuccess - addData', data);
            db = request.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.add(data)
            resolve(data)
        }

        request.onerror = () =>{
            const error = request.error?.message
            if(error){
                resolve(error)
            }else{
                resolve('Error with dataBase')
            }
        }
    })
}
