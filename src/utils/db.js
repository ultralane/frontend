import { openDB, deleteDB } from "idb";

window.deleteDB = deleteDB;
export let db;

export const initDb = async () => {
  db = await openDB("ultralane", 6, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("notes")) {
        db.createObjectStore("notes", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("transactions")) {
        db.createObjectStore("transactions", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("network")) {
        db.createObjectStore("network", {
          keyPath: "chainId",
          autoIncrement: true,
        });
      }
      if(!db.objectStoreNames.contains("recieve")) {
        db.createObjectStore("receive", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  window.db = db;
};

window.resetStorage = async () => {
  deleteDB("ultralane");
  localStorage.clear();
  window.location.reload();
};
