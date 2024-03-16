import { openDB, deleteDB } from "idb";

window.deleteDB = deleteDB;
export let db;

export const initDb = async () => {
  db = await openDB("ultralane", 6, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("elements")) {
        let store = db.createObjectStore("elements", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.add({
          value:
            "0x0ecc1f56d6a29051a511ea4b08361649d190b7f7525a9d4ed36b9041e127207a",
        });
      }
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
    },
  });
  window.db = db;
};

window.resetStorage = async () => {
  deleteDB("ultralane");
  localStorage.clear();
  window.location.reload();
};
