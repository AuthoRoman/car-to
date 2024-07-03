import { TypeBases } from "../../state/types";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open("carsDB");

    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains(TypeBases.CARS_IN_WAITING)) {
        console.log("Creating cars queue");
        db.createObjectStore(TypeBases.CARS_IN_WAITING, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(TypeBases.CARS_IN_SERVICE)) {
        console.log("Creating  CarsInService");
        db.createObjectStore(TypeBases.CARS_IN_SERVICE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(TypeBases.CARS_IN_FINISH)) {
        console.log("Creating  carsInFinish");
        db.createObjectStore(TypeBases.CARS_IN_FINISH, { keyPath: "id" });
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

export const addData = <T>(
  storeName: string,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open("carsDB", version);
    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Error with dataBase");
      }
    };
  });
};

export const getStoreData = <T>(storeName: string): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open("carsDB");

    request.onsuccess = () => {
      console.log("request get success");
    
    db = request.result;
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const res = store.getAll();
    res.onsuccess = () => {
      resolve(res.result);
    };
    };
  });
};


export const deleteData = (storeName:string, key:number): Promise<boolean> =>{
    return new Promise((resolve) => {
        request = indexedDB.open('carsDB', version)

        request.onsuccess = () => {
            console.log('request delete - good',key)
            db = request.result
            const tx = db.transaction(storeName, 'readwrite')
            const store = tx.objectStore(storeName)
            const res = store.delete(key)


            res.onsuccess = ()=>{
                resolve(true)
            }
            res.onerror = ()=>{
                resolve(false)
            }
        }
    })
}

export const editData = <T>(
  storeName: string,
  data: T,
  key:number
): Promise<T | string | null|boolean> =>{
  return new Promise((resolve) => {
      request = indexedDB.open('carsDB', version)

      request.onsuccess = () => {
          console.log('request delete - good',data, key)
          db = request.result
          const tx = db.transaction(storeName, 'readwrite')
          const store = tx.objectStore(storeName)
          const res = store.put(data ) //!TODO


          res.onsuccess = ()=>{
              resolve(true)
          }
          res.onerror = ()=>{
              resolve(false)
          }
      }
  })
}