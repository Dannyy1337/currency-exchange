import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    exchangeRates: []
  },
  mutations: {
   setExchangeRatesToState: (state, exchangeRates) => {
      state.exchangeRates = exchangeRates
    }
  },
  actions: {
    async getExchangeRates({ commit }) {
      await axios
        .get(
          `https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`
        )
        .then((exchangeRates) => {

          commit('setExchangeRatesToState', exchangeRates.data)
          return exchangeRates;
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    exchangeRates(state) {
      return state.exchangeRates;
    }
  },
  modules: {
  }
})
