export const state = () => ({
  products: [],
  wrongMessage: "",
  isModalMessage: false,
});
export const getters = {
  products: (state) => state.products,
  wrongMessage: (state) => state.wrongMessage,
  isModalMessage: (state) => state.isModalMessage,
};
export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  deleteProducts(state, payload) {
    state.products.splice(state.products.indexOf(payload), 1);
  },
  deleteProductsGroup(state, payload) {
    state.products = state.products.filter(function (prod) {
      return !payload.includes(prod);
    });
  },
  setWrongMessage(state, message = "") {
    state.wrongMessage = message;
    state.isModalMessage = true;
  },
  clearWrongMessage(state) {
    state.wrongMessage = "";
    state.isModalMessage = false;
  },
};
export const actions = {
  async getFetchProducts({ commit }) {
    try {
      await wait();
      if (rejectByChance()) {
        const products = await this.$axios.$get("/products.json");
        commit("setProducts", products);
      } else {
        throw new Error("Server error");
      }
    } catch (e) {
      commit("setWrongMessage", e.message);
    }
  },
  async deleteFetchProducts({ commit }, payload) {
    try {
      await wait();
      if (rejectByChance()) {
        if (toString.call(payload) === "[object Array]") {
          commit("deleteProductsGroup", payload);
          commit("setWrongMessage");
        } else {
          commit("deleteProducts", payload);
          commit("setWrongMessage");
        }
      } else {
        throw new Error("Server error");
      }
    } catch (e) {
      commit("setWrongMessage", e.message);
    }
  },
};
//The probability of getting a server error.
//probability = 0.9 max error, probability = 0.01 min error
const probability = 0.01;
const rejectByChance = () => {
  return Math.random() >= probability;
};
const delay = parseInt(Math.random() * 1000);
const wait = () => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
