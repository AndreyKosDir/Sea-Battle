<template>
    <div id="app">
        <StartMenu v-if="hideGame" @start-game="startGame"/>
        <div class="game" v-show="!hideGame">
            <h2 class="title">Морской бой</h2>
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
            <h2>Ходит {{playerName}}</h2>
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
                hideGame: false,
                playerName: 'asd',
                computerName: 'T-1000',
                playerField: new BattleField().field,
                computerField: new BattleField().field,
                playerScore: 0,
                computerScore: 0,
                winner: ''
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
            endGame() {
                console.log('Победитель:   ' + this.winner)
            }
        },
        watch: {
            playerScore() {
                if (this.playerScore === 20) {
                    this.winner = this.playerName;
                    this.endGame();
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
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .title {
        margin-bottom: 20px;
    }

    .players {
        width: 1150px;
        height: 600px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
