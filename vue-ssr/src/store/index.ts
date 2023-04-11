import { createStore } from "vuex";

export const store = createStore({
  state: {
    count: 3,
  },

  mutations: {
    setCount(state, payload) {
      state.count += payload;
    },
  },
  actions: {
    fetchCount({ commit, state }, payload) {
      setTimeout(() => {
        commit("setCount", payload);
      }, 200);
    },
  },
});
