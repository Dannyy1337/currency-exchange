<template>
  <div class="wrapper">
    <h1>All Exchange Rates</h1>
    <ul class="all-rates">
      <li
        v-for="value in resultArray"
        :key="`to${value[0]}`"
        class="all-rates-item"
      >
        <p>
          <b>{{ value[0] }}</b>: {{ value[1] }}
        </p>
        <button @click="handleFavorite(value[0])">
          <span v-show="!isFavorite(value[0])" class="material-icons">
            star_border
          </span>
          <span v-show="isFavorite(value[0])" class="material-icons">
            star
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      changeIconBorder: false,
      changeIconFill: true,
    };
  },
  computed: {
    /* eslint-disable */
    resultArray() {
      if (this.exchangeRatesBasic) {
        return Object.entries(this.exchangeRatesBasic).sort((a, b) => {
          if (this.isFavorite(a[0]) && !this.isFavorite(b[0])) {
            return -1;
          } else if (!this.isFavorite(a[0]) && this.isFavorite(b[0])) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        return [];
      }
    },
    ...mapGetters(["exchangeRatesBasic"]),
    ...mapState(["favorites"]),
  },
  methods: {
    ...mapActions(["getExchangeRatesBasic"]),
    ...mapMutations(["pushToFavorites", "removeFromFavorites"]),
    handleFavorite(key) {
      if (this.isFavorite(key)) {
        this.removeFromFavorites(key);
      } else {
        this.pushToFavorites(key);
      }
    },
    isFavorite(key) {
      return this.favorites.includes(key);
    },
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
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid orange;
    color: rgba(255, 197, 88, 0.8);
    text-shadow: 1px 1px black;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 1px 1px black;
    display: flex;
    align-items: flex-start;
    & button {
      border: none;
      background: none;
      margin-right: -8px;
      & span {
        font-size: 16px !important;
        color: yellow;
      }
    }
    &:hover {
      background: rgba(141, 141, 141, 0.6);
      border: 2px solid rgb(255, 115, 0);
      transition: 0.2s ease;
    }
  }
}
</style>