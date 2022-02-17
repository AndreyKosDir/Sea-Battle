<template>
    <div>
        <Cell
                v-for="(el, i) of cells"
                :key="row + '' + i"
                :line="i"
                :column="row"
                :cellInfo="el"
                :player="player"
                @shootInShip="shoot"
        />
    </div>
</template>

<script>
    import Cell from "./Cell";
    export default {
        name: "CellLine",
        components: {Cell},
        props: ["player", "cells", "row"],
        methods: {
            shoot(inTheMark) {
                this.$emit('shoot', inTheMark);
            }
        }
    }
</script>

<style scoped>

</style>