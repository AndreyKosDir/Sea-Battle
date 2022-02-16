<template>
    <div :class="player">
        <span class="playerName">{{name}}</span>
        <div class="game-field">
            <div class="alpha">
                <div v-for="line of lines" :key="line">{{line}}</div>
            </div>
            <div class="numbers">
                <div v-for="(line, row) of lines" :key="row">{{row + 1}}</div>
            </div>
            <div class="battle-field">
                <CellLine
                        :player="player"
                        v-for="(line, row) of board"
                        :cells="line"
                        :row="row"
                        :key="row"
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
        props: ["board", "player", "name"],
        data() {
            return {
                lines: ['A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К']
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
        font-size: 25px;
        margin-bottom: 20px;
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
    }

    .human .battle-field {
        box-shadow: 0 0 0 1px blue;
    }

    .computer .battle-field {
        box-shadow: 0 0 0 1px red;
    }
</style>