<template>
  <div>
    <p>{{ rate }}</p>
    <input type="number" v-model.number="amount" placeholder="Enter Amount" />
    <p>from:</p>
    <select v-model="convertFrom">
      <option v-for="(rate, index) in exchangeRates" :key="index">
        {{ rate.base_ccy }}
      </option>
    </select>
    <p>to:</p>
    <select v-model="convertTo">
      <option v-for="(rate, index) in exchangeRates" :key="index">
        {{ rate.ccy }}
      </option>
    </select>
    <span>
      {{ amount }} {{ convertFrom }} : {{ finalAmount }} {{ convertTo }}</span
    ><br />
    {{ exchangeRates }}
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
    ...mapGetters(["exchangeRates"]),
    finalAmount() {
      let to = this.convertTo;
      let from = this.convertFrom;
      let course = this.exchangeRates;
      let final;
      switch (from) {
        case "UAH":
          if (to == "EUR") {
            final = this.amount * course[0].buy;
          }
          if (to == "RUR") {
            final = this.amount * course[1].buy;
          }
          if (to == "USD") {
            final = this.amount * course[2].buy;
          }
          if (to == "BTC") {
            final = this.amount * course[3].buy;
          }
          break;
      }
      return final;
    },
  },
  methods: {
    ...mapActions(["getExchangeRates"]),
  },
  mounted() {
    this.getExchangeRates();
  },
};
</script>