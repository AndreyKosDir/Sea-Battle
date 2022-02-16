<template>
  <div id="app">
    <div class="game">
      <h2>Морской бой</h2>
      <div class="players">
        <Player :board="playerField"/>
        <div class="computer"></div>
      </div>
      <h2>Ходит игрок</h2>
    </div>
  </div>
</template>

<script>

import {field} from "./Field";
import Player from "./components/Player";

export default {
  name: 'App',
  components: {Player},
  data() {
    return {
      playerField: field
    }
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .game {
    width: 1200px;
    height: 700px;
    border: 1px black solid;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .players {
    width: 1150px;
    height: 600px;
    border: 1px green solid;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }


</style>
