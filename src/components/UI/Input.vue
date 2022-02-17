<template>
    <form @submit.prevent="onSubmit" class="form">
        <input type="text" placeholder="Введите имя..." v-model="playerName">
        <button>Принять</button>
    </form>
</template>

<script>
    export default {
        name: "Input",
        data() {
            return {
                playerName: ''
            }
        },
        methods: {
            onSubmit() {
                if (this.playerName.length === 0) {
                    return;
                }

                this.$emit('start-game', this.playerName);
            }
        },
        watch: {
            playerName() {
                if (this.playerName.length > 25) {
                    this.playerName = this.playerName.slice(0, 25);
                }
            }
        }
    }
</script>

<style scoped>
    .form {
        width: 520px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    input {
        width: 350px;
        height: 35px;
        padding-left: 5px;
        font-size: 20px;
        border: none;
        outline: none;
        border-radius: 5px;
        box-shadow: 0 0 2px black;
    }

    input:focus {
        background-color: rgba(30, 144, 255, 0.3);
    }

    button {
        width: 100px;
        height: 35px;
        font-size: 20px;
        border-radius: 5px;
        border: 0;
        box-shadow: 0 0 1px 2px blue;
        cursor: pointer;
        background-color: rgba(30, 144, 255, 0.3);
    }

    button:hover {
        background-color: dodgerblue;
        color: white;
        transition: color 0.5s, background-color 0.5s;
    }
</style>