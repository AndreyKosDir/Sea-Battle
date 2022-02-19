<template>
    <div id="app">
        <StartMenu v-if="hideGame" @start-game="startGame" @assign-name="assignName"/>
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
                        :player="'computer'"
                        :name="computerName"
                        :humanTurn="humanTurn"
                        @player-shoots="playerShoots"
                />
            </div>
            <span class="playerTurn">Ходит {{humanTurn ? playerName : computerName}}</span>

        </div>
        <GameOver v-if="gameOver" :win="win" @restart-game="restartGame"/>
    </div>
</template>

<script>
    import Player from "./components/Player";
    import StartMenu from "./components/StartMenu";
    import BattleField from "./BattleField";
    import GameOver from "./components/GameOver";
    import AI from "./AI";
    import {Helpers} from "./Helpers"

    export default {
        name: 'App',
        components: {GameOver, StartMenu, Player},
        data() {
            return {
                player: new BattleField(),
                computer: new BattleField(),
                hideGame: false,
                AI: new AI(),
                humanTurn: true,
                playerName: 'Иосиф Брик',
                computerName: 'T-1000',
                playerScore: 0,
                computerScore: 0,
                gameOver: false,
                win: false,
            }
        },
        methods: {
            startGame() {
                this.hideGame = false;

            },

            assignName(name, recipient) {
                this[recipient] = name;
            },

            playerShoots(cellCoords) {
                const {x, y} = cellCoords;
                const cell = this.computerField[y][x];
                cell.shoot = true;

                if (cell.ship) {
                    this.playerScore += 1;
                    this.humanTurn = true;
                } else {
                    this.humanTurn = false;
                    this.computerShoots();
                }

            },

            computerShoots() {
                setTimeout(() => {
                    if (this.gameOver) {
                        return
                    }

                    const {column, line} = this.AI.fire()[0];
                    const cell = this.playerField[column][line];
                    cell.shoot = true;

                    if (cell.ship) {
                        this.computerScore += 1;
                        this.computerShoots();
                    } else {
                        this.humanTurn = true;
                    }
                }, Helpers.getRandomNumber(500, 1200))
            },

            endGame() {
                if (this.playerScore > this.computerScore) {
                    this.win = true;
                }

                this.gameOver = true;
            },

            restartGame() {
                this.win = false;
                this.gameOver = false;
                this.playerScore = 0;
                this.computerScore = 0;
                this.humanTurn = true;
                this.player = new BattleField();
                this.computer = new BattleField();
                this.AI = new AI();
            },
        },

        watch: {
            playerScore() {
                if (this.playerScore === 20) {
                    this.endGame();
                }
            },
            computerScore() {
                if (this.computerScore === 20) {
                    this.endGame()
                }
            }
        },

        computed: {
            playerField() {
                return this.player.field;
            },
            computerField() {
                return this.computer.field;
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