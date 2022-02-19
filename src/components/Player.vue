<template>
    <div :class="player">
        <span class="playerName">{{name}}</span>
        <div class="game-field">
            <div class="alpha">
                <div v-for="columnName of columnsName" :key="columnName">{{columnName}}</div>
            </div>
            <div class="numbers">
                <div v-for="(columnName, index) of columnsName" :key="index">{{index + 1}}</div>
            </div>
            <div class="battle-field">
                <CellLine
                        :player="player"
                        v-for="(cellsArr, line) of board"
                        :cellsArr="cellsArr"
                        :line="line"
                        :key="line + cellLineKey"
                        :humanTurn="humanTurn"
                        @shoot="shoot"
                >
                </CellLine>
            </div>
        </div>
    </div>
</template>

<script>
    import CellLine from "./CellLine";

    export default {
        name: "Player",
        components: {CellLine},
        props: ["board", "player", "name", "humanTurn"],
        data() {
            return {
                columnsName: ['A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'],
                cellLineKey: Date.now()
            };
        },
        methods: {
            shoot(cellCoords) {
                this.$emit('player-shoots', cellCoords);
            },
            forceRerender() {
                this.cellLineKey = Date.now();
            }
        },
        watch: {
            board() {
                this.forceRerender();
            }
        }
    }
</script>

<style scoped>
    .human, .computer {
        width: 550px;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .playerName {
        margin-left: 50px;
        font-size: 25px;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .game-field {
        width: 550px;
        height: 550px;
        display: grid;
        grid-template:
                "alpha  alpha"
                "numbers game";
    }

    .alpha {
        grid-area: alpha;
        height: 50px;
        width: 500px;
        margin-left: 50px;
        display: flex;
    }

    .numbers {
        grid-area: numbers;
        width: 50px;
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    .alpha div, .numbers div {
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 20px;
        line-height: 50px;
    }

    .battle-field {
        grid-area: game;
        width: 500px;
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    .human .battle-field {
        box-shadow: 0 0 0 1px blue;
    }

    .computer .battle-field {
        box-shadow: 0 0 0 1px red;
    }
</style>