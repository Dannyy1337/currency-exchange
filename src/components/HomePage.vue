<template>
  <div class="wrapper">
    <h1>Currency Conversion</h1>
    <div class="container">
      <div class="container-select-area">
        <p>From:</p>
        <select v-model="convertFrom">
          <option v-for="(value, key) in currencies" :key="`from${key}`">
            {{ key }}:{{ value }}
          </option>
        </select>
        <p>To:</p>
        <select v-model="convertTo">
          <option v-for="(value, key) in currencies" :key="`to${key}`">
            {{ key }}:{{ value }}
          </option>
        </select>
      </div>
      <div class="container-amount-area">
        <input v-model.number="amount" placeholder="Enter Amount" />
        <span>
          {{ amount }} {{ convertFrom }} = {{ finalAmount }}
          {{ convertTo }}</span
        >
      </div>
    </div>
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
        return "(Please fill amount!)";
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

<style lang="scss" scoped>
.wrapper {
  margin-top: 50px;
  min-width: 100%;
  min-height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  & .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid orange;
    padding: 0 30px;
    background: rgba(0, 0, 0, 0.2);
    &-select-area {
      display: flex;
      min-height: 200px;
      align-items: center;
      & p {
        color: rgba(252, 164, 0, 0.8);
        text-shadow: 1px 1px white;
        font-size: 20px;
        margin-right: 20px;
        &:nth-child(3) {
          margin-left: 20px;
        }
      }
      & select {
        max-height: 50px;
        border-radius: 10px;
        font-size: 20px;
        background: rgba(255, 255, 255, 0.55);
      }
    }
    &-amount-area{
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      justify-content: space-between;
      min-width: 100%;
      & input {
         max-height: 50px;
        border-radius: 10px;
        font-size: 20px;
        background: rgba(255, 255, 255, 0.55);
        text-align: end;
      }
      & span{
        color: white;
        text-shadow: 1.5px 1px black;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>