<template>
    <div
            class="battle-cell"
            :class="style"
            @click="fire"
    >
    </div>
</template>

<script>
    export default {
        name: "Cell",
        props: ["line", "column", "player", "cellInfo"],
        data() {
            return {
                shoot: this.cellInfo.shoot,
                isShip: this.cellInfo.ship,
            }
        },

        methods: {
            fire() {
                if (this.player === 'human' || this.cellInfo.shoot) {
                    return;
                }

                this.shoot = true;

                if (this.isShip) {
                    this.$emit('shootInShip', true);
                } else {
                    this.$emit('shootInShip', false);
                }
            },

            getStyle() {

                if (this.isShip && this.shoot) {
                    return 'ship-shoot';
                }

                if (this.shoot) {
                    return 'off-the-mark'
                }

                if (this.isShip) {
                    return 'ship'
                }

                return 'battle-cell';
            }
        },
        computed: {
            style() {
                return this.getStyle();
            }
        }
    }
</script>

<style scoped>

    .human .ship {
        background-color: blue;
    }

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

    .computer .ship-shoot, .computer .off-the-mark {
        cursor: default;
    }

    .computer .ship-shoot:before,
    .computer .ship-shoot:hover:before,
    .computer .ship-shoot:after,
    .computer .ship-shoot:hover:after
    {
        position: absolute;
        content: '';
        height: 40px;
        width: 5px;
        background-color: red;
        animation: none;
        border-radius: 0;
    }

    .ship-shoot:before, .ship-shoot:hover:before {
        transform: rotate(45deg);
    }

    .ship-shoot:after, .ship-shoot:hover:after {
        transform: rotate(135deg);
    }

    .computer .ship {
        background-color: green;
    }

    .computer .off-the-mark:before,
    .computer .off-the-mark:hover:before,
    .computer .off-the-mark:after,
    .computer .off-the-mark:hover:after
    {
        position: absolute;
        content: '';
        height: 10px;
        width: 10px;
        background-color: red;
        animation: none;
        border-radius: 50%;
    }
</style>