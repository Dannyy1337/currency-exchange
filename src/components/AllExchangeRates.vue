<template>
  <div>
    <input v-model.number="amount" placeholder="Enter Amount" />
    <p>from:</p>
    <select v-model="convertFrom">
      <option v-for="(value, key) in currencies" :key="`from${key}`">
        {{ key }}:{{ value }}
      </option>
    </select>
    <p>to:</p>
    <select v-model="convertTo">
      <option v-for="(value, key) in currencies" :key="`to${key}`">
        {{ key }}:{{ value }}
      </option>
    </select>
    <span>
      {{ amount }} {{ convertFrom }} : {{ finalAmount }} {{ convertTo }}</span
    ><br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { currencies } from "../../currencies.js";

export default {
  data() {
    return {
      amount: 1,
      convertFrom: `UAH:${currencies["UAH"]}`,
      convertTo: `USD:${currencies["USD"]}`,
      currencies: currencies,
    };
  },
  computed: {
    ...mapGetters(["exchangeRatesBasic"]),
    finalAmount() {
      if (this.amount && this.exchangeRatesBasic) {
        return this.amount * this.exchangeRatesBasic[this.convertToCCYCode];
      } else {
        return "Please fill amount!";
      }
    },
    convertToCCYCode() {
      return this.convertTo ? this.convertTo.split(":")[0] : "";
    },
  },
  watch: {
    convertFrom(currentValue, oldValue) {
      if (oldValue !== currentValue) {
        let baseCurrency = currentValue.split(":")[0];
        this.getExchangeRatesBasic(baseCurrency);
      }
    },
  },

  methods: {
    ...mapActions(["getExchangeRatesBasic"]),
  },
  mounted() {
    this.getExchangeRatesBasic("UAH");
  },
};
</script>