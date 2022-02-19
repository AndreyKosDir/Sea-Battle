<template>
    <div class="cell-line">
        <Cell
                v-for="(cell, column) of cellsArr"
                :key="column"
                :column="column"
                :line="line"
                :cell="cell"
                :player="player"
                :humanTurn="humanTurn"
                @shoot="shoot"
        />
    </div>
</template>

<script>
    import Cell from "./Cell";
    export default {
        name: "CellLine",
        components: {Cell},
        props: ["player", "cellsArr", "line", "humanTurn"],
        methods: {
            shoot(cellCoords) {
                this.$emit('shoot', cellCoords);
            }
        },
    }
</script>

<style scoped>
    .cell-line {
        display: flex;
    }
</style>