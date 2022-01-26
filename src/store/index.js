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
    async getExchangeRatesBasic({ commit }, baseCurrency) {
      await axios
        .get(
          `https://freecurrencyapi.net/api/v2/latest?apikey=20eefe40-7e20-11ec-9c27-29364e5c874d&base_currency=${baseCurrency}`
        )
        .then((exchangeRates) => {
          commit('setExchangeRatesToState', exchangeRates.data.data)
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
