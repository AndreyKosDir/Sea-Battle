<template>
    <div>
        <Cell
                v-for="(el, i) of cells"
                :key="row + '' + i"
                :line="i"
                :row="row"
                :cellInfo="el"
                :player="player"
        />
    </div>
</template>

<script>
    import Cell from "./Cell";
    export default {
        name: "CellLine",
        components: {Cell},
        props: ["player", "cells", "row"]
    }
</script>

<style scoped>

</style>