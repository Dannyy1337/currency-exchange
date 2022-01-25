<template>
  <div>
    <h1>home</h1>
    <ul>
      <li v-for="(rate, index) in exchangeRatesBasic" :key="index">
        <p>currency: {{ rate.ccy }}</p>
        <p>base currency: {{ rate.base_ccy }}</p>
        <p>buy: {{ rate.buy }}</p>
        <p>sale: {{ rate.sale }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["exchangeRatesBasic"]),
  },
  methods: {
    ...mapActions(["getExchangeRatesBasic"]),
  },
  mounted() {
    this.getExchangeRatesBasic();
  },
};
</script>