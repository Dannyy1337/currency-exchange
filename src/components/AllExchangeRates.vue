<template>
  <div class="wrapper">
    <h1>All Exchange Rates</h1>
    <ul class="all-rates">
      <li
        v-for="(value, key) in exchangeRatesBasic"
        :key="`to${key}`"
        class="all-rates-item"
      >
        <p>
          <b>{{ key }}</b> {{ value }}
        </p>
        <!-- <button
          @click="
            changeIconBorder = !changeIconBorder;
            changeIconFill = !changeIconFill;
          "
        >
          <span v-if="changeIconBorder" class="material-icons">
            star_border
          </span>
          <span v-if="changeIconFill" class="material-icons"> star </span>
        </button> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      // changeIconBorder: false,
      // changeIconFill: true,
    };
  },
  computed: {
    ...mapGetters(["exchangeRatesBasic"]),
  },
  methods: {
    ...mapActions(["getExchangeRatesBasic"]),
  },
  mounted() {
    this.getExchangeRatesBasic("UAH");
  },
};
</script>

<style lang='scss'>
.wrapper {
  margin-top: 50px;
  & h1 {
    color: rgba(252, 164, 0, 0.8);
    text-shadow: 1px 1px white;
  }
}
.all-rates {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-bottom: 50px;
  &-item {
    margin: 10px;
    background: rgba(255, 255, 255, 0.418);
    border: 2px solid orange;
    color: rgba(255, 197, 88, 0.8);
    text-shadow: 1.5px 1.5px black;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 1px 1px black;
    &:hover {
      background: rgba(141, 141, 141, 0.6);
      border: 2px solid rgb(255, 115, 0);
      transition: 0.2s ease;
    }
  }
}
</style>