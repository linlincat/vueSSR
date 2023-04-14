import IndexDB from "@/utils/indexDB";
import languageObjectStore from "./objectStores/language";
import userObjectStore from "./objectStores/user";

export const indexDB = new IndexDB("ssrdb");

export default {
  indexDB,
  languageObjectStore,
  userObjectStore,
};
