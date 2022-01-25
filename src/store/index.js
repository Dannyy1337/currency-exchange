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
    async getExchangeRatesBasic({ commit }) {
      await axios
        .get(
          `https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5`
        )
        .then((exchangeRates) => {

          commit('setExchangeRatesToState', exchangeRates.data)
          return exchangeRates;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // async getExchangeRatesMore({ commit }) {
    //   await axios
    //     .get(
    //       `https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=4`
    //     )
    //     .then((exchangeRates) => {

    //       commit('setExchangeRatesToState', exchangeRates.data)
    //       return exchangeRates;
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }
  },
  getters: {
    exchangeRatesBasic(state) {
      return state.exchangeRates;
    }
  },
  modules: {
  }
})
