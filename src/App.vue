<template>
    <div id="app">
        <StartMenu v-if="hideGame" @start-game="startGame"/>
        <div class="game" v-if="!hideGame">
            <span class="title">Морской бой</span>
            <div class="players">
                <Player
                        :board="playerField"
                        :player="'human'"
                        :name="playerName"
                />
                <Player
                        :board="computerField"
                        :player="'computer'" :name="computerName"
                        @player-shoots="playerShoots"
                />
            </div>
            <span class="playerTurn">Ходит {{playerName}}</span>
        </div>

    </div>
</template>

<script>

    import Player from "./components/Player";
    import StartMenu from "./components/StartMenu";
    import BattleField from "./BattleField";

    export default {
        name: 'App',
        components: {StartMenu, Player},
        data() {
            return {
                hideGame: true,
                playerName: '',
                computerName: 'T-1000',
                playerField: new BattleField().field,
                computerField: new BattleField().field,
                playerScore: 0,
                computerScore: 0,
                gameOver: false
            }
        },
        methods: {
            startGame(playerName) {
                this.playerName = playerName;
                this.hideGame = false;
            },

            playerShoots(inTheMark) {
                if (inTheMark) {
                    this.playerScore += 1;
                }

            },
            endGame(winner) {
                if (this.playerScore > this.computerScore) {

                    this.gameOver = true;
                }
            }
        },
        watch: {
            playerScore() {
                if (this.playerScore === 20) {
                    this.winner = this.playerName;
                    this.endGame();
                }
            },
            computerScore() {
                if (this.computerScore === 20) {
                    this.endGame()
                }
            }
        }
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
        display: flex;
        justify-content: center;
        align-items: start;
        font-family: Arial Narrow, serif;
    }

    .game {
        width: 1200px;
        height: 780px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }

    .title {
        margin: 20px 0 30px 0;
        font-size: 45px;
        font-weight: bold;
        color: blue;
        text-shadow: 2px 1px black;
    }

    .playerTurn {
        margin: 25px;
        font-size: 30px;
    }

    .players {
        width: 1150px;
        height: 600px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
