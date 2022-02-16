<template>
    <div @click="print"></div>
</template>

<script>
    export default {
        name: "Cell",
        props: ["line", "row", "player"],
        methods: {
            print() {
                if (this.player === 'human') {
                    return;
                }

                console.log([this.line, this.row]);
            }
        }
    }
</script>

<style scoped>
    .human .battle-cell {
        width: 50px;
        height: 50px;
        box-shadow: 0 0 0 1px blue inset;
    }

    .computer .battle-cell {
        width: 50px;
        height: 50px;
        box-shadow: 0 0 0 1px red inset;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .computer .battle-cell:hover:after {
        position: absolute;
        content: ' ';
        width: 16px;
        height: 16px;
        background-color: red;
        border-radius: 50%;
        animation: target 3s infinite;
    }

    .computer .battle-cell:hover:before {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: pulse 3s infinite;
    }

    @keyframes target {
        0% {
            transform: scale(1.0, 1.0);
        }
        50% {
            transform: scale(0.5, 0.5);
        }
        100% {
            transform: scale(1.0, 1.0);
        }
    }

    @keyframes pulse {
        30% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4)
        }
        80% {
            box-shadow: 0 0 0 30px rgba(255, 0, 0, 0)
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0)
        }
    }


</style>