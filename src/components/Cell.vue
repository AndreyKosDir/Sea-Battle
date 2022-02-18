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
        props: ["line", "column", "player", "cellInfo", "humanTurn", "aiShoots"],
        data() {
            return {
                shoot: this.cellInfo.shoot,
                isShip: this.cellInfo.ship,
                style: ''
            }
        },

        methods: {
            fire() {
                if (this.player === 'human' || this.cellInfo.shoot || !this.humanTurn) {
                    return;
                }

                this.shoot = true;
                this.updateStyle();

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
            },

            updateStyle() {
                this.style = this.getStyle();
            },
        },

        watch: {
            aiShoots() {
                if (this.isShip && this.cellInfo.shoot) {
                    this.style = 'ship-shoot';
                    return;
                }

                if (this.cellInfo.shoot) {
                    this.style = 'off-the-mark';
                }
            },
        },

        beforeMount() {
            this.updateStyle();
        }
    }
</script>

<style scoped>
    .human .battle-cell {
        width: 50px;
        height: 50px;
        box-shadow: 0 0 0 1px blue inset;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .human .off-the-mark:after {
        position: absolute;
        content: ' ';
        width: 10px;
        height: 10px;
        background-color: blue;
        border-radius: 50%;
    }

    .human .ship-shoot:after, .human .ship-shoot:before {
        position: absolute;
        content: '';
        height: 40px;
        width: 5px;
        background-color: white;
        border-radius: 0;
    }

    .human .ship,  .human .ship-shoot {
        background-color: blue;
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
        background-color: white;
        animation: none;
        border-radius: 0;
    }

    .ship-shoot:before, .computer .ship-shoot:hover:before {
        transform: rotate(45deg);
    }

    .ship-shoot:after, .computer .ship-shoot:hover:after {
        transform: rotate(135deg);
    }

    .computer .ship-shoot {
        background-color: red;
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