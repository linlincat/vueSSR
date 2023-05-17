import { createStore, Store, useStore as cusStore } from "vuex";
import { saveLangeuage } from "@/api/index";
import { InjectionKey } from "vue";
import axios from "axios";

export interface AllStateTypes {
  count: number;
  locale: any;
  userStatus: number;
  listData: any[];
  pageNo: number;
  pageSize: number;
  total: number;
}

export const key: InjectionKey<Store<AllStateTypes>> = Symbol();
export function useStore() {
  return cusStore(key);
}
export function createSSRStore() {
  return createStore<AllStateTypes>({
    state: {
      count: 1,
      locale: null,
      userStatus: 0,
      listData: [],
      pageNo: 1,
      pageSize: 6,
      total:0
    },

    mutations: {
      setCount(state, payload) {
        state.count += payload;
      },
      setLanguage(state, payload) {
        state.locale = payload;
        return state.locale;
      },
      setListData(state, payload) {
        state.listData = payload;
        return state.listData;
      },
      setUserStatus(state, payload) {
        state.userStatus = payload;
        return state.userStatus;
      },
    },
    actions: {
      fetchCount({ commit }, payload) {
        setTimeout(() => {
          commit("setCount", payload);
        }, 1000);
      },
      toSaveLangeuage({ commit }, lang: any) {
        saveLangeuage(lang.name).then((res) => {
          const { success } = res;
          commit("setLanguage", lang);
          success
            ? console.log("保存国际化语言成功")
            : console.log("保存国际化语言失败");
        });
      },
      getListData({ commit }) {
        // 不能发送本地请求
        return new Promise((resolve) => {
          axios.get("https://www.imooc.com/search/hotwords").then((res) => {
            const { result, data } = res.data;
            if (!result) {
              commit("setListData", data);
              resolve(true);
            }
            console.log(res.data, "=======shuju======");
          });
        });
      },
    },
  });
}
