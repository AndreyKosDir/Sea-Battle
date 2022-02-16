<template>
    <div class="player">
        <h2>Player</h2>
        <div class="game-field">
            <div class="alpha">
                <div>A</div>
                <div>Б</div>
                <div>В</div>
                <div>Г</div>
                <div>Д</div>
                <div>Е</div>
                <div>Ж</div>
                <div>З</div>
                <div>И</div>
                <div>К</div>
            </div>
            <div class="numbers">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
            </div>
            <div class="battle-field">
                <div class="battle-line" v-for="(line, i) of board" v-bind:key="i">
                    <div class="battle-cell" v-for="(el, i) of line" v-bind:key="i"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Player",
        props: ["board"]
    }
</script>

<style scoped>
    .player, .computer {
        width: 550px;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

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
        font-size: 25px;
        line-height: 50px;
    }

    .battle-field {
        grid-area: game;
        width: 500px;
        height: 500px;
        display: flex;
        box-shadow: 0 0 0 1px blue;
        flex-direction: row;
    }

    .battle-cell {
        width: 50px;
        height: 50px;
        box-shadow: 0 0 0 1px blue inset;
        cursor: pointer;
    }

    .battle-cell:hover {
        background-color: red;
    }

</style>