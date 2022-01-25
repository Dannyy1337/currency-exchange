<template>
  <div>
    <input type="number" v-model.number="amount" placeholder="Enter Amount" />
    <p>from:</p>
    <select v-model="convertFrom">
      <option v-for="(rate, index) in exchangeRatesBasic" :key="index">
        {{ rate.base_ccy }}
      </option>
    </select>
    <p>to:</p>
    <select v-model="convertTo">
      <option v-for="(rate, index) in exchangeRatesBasic" :key="index">
        {{ rate.ccy }}
      </option>
    </select>
    <span>
      {{ amount }} {{ convertFrom }} : {{ finalAmount }} {{ convertTo }}</span
    ><br />
    {{ exchangeRatesBasic }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      amount: "",
      convertTo: "",
      convertFrom: "",
    };
  },
  computed: {
    ...mapGetters(["exchangeRatesBasic"]),
    finalAmount() {
        if (this.convertTo) {
          let convertToBuy = this.exchangeRatesBasic.find((item) => item.ccy === this.convertTo);

          return this.amount * convertToBuy.buy;
      } else {
        return '';
      }

     
    },
  },
  methods: {
    ...mapActions(["getExchangeRatesBasic"]),
    // ...mapActions(["getExchangeRatesMore"]),
  },
  mounted() {
    this.getExchangeRatesBasic();
    // this.getExchangeRatesMore();
  },
};
</script>