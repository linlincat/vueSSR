import { createStore, Store, useStore as cusStore } from "vuex";
import { saveLangeuage } from "@/api/index";
import { InjectionKey } from "vue";

export interface AllStateTypes {
  count: number;
  locale: any;
  userStatus: number
}

export const key: InjectionKey<Store<AllStateTypes>> = Symbol();
export function useStore() {
  return cusStore(key)
}
export const store = createStore<AllStateTypes>({
  state: {
    count: 1,
    locale: null,
    userStatus: 0,
  },

  mutations: {
    setCount(state, payload) {
      state.count += payload;
    },
    setLanguage(state, payload) {
      state.locale = payload;
      return state.locale;
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
  },
});
