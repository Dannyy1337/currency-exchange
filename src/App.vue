<template>
  <div id="app">
    <div id="header">
      <router-link class="route" to="/">Home</router-link>
      <router-link class="route" to="/rates">All Exchange Rates</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <div id="footer">Footer</div>
  </div>
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-width: 100%;
  min-height: 97.8vh;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;

  & #header {
    display: flex;
    justify-content: space-around;
    background: rgba(252, 164, 0, 0.9);
    min-width: 100%;
    min-height: 50px;
    position: fixed;
    align-items: center;
    top: 0;
    & .route {
      text-decoration: none;
      font-weight: bold;
      font-size: 20px;
      color: white;
      &:hover {
        color: rgb(223, 223, 223);
        border-bottom: 2px solid white;
        transition: 0.2s ease;
      }
      &:active {
        color: orange;
      }
      &:focus {
        text-shadow: 1px 1px black;
      }
    }
  }
  & #footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(252, 164, 0, 0.9);
    min-width: 100%;
    min-height: 50px;
    position: fixed;
    top: 93%;
    font-weight: bold;
    font-size: 20px;
    color: white;
  }
}

// animation

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
