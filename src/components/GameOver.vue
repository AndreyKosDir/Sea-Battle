<template>
    <div class="wrapper">
        <div class="notice">
            <span class="message">{{message}}</span>
            <button @click="restartGame">Играть заново</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GameOver",
        props: ["win"],
        computed: {
            message() {
                return this.win ? "Вы победили" : "Вы проиграли"
            }
        },
        methods: {
            restartGame() {
                this.$emit('restart-game');
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: start;
    }

    .notice {
        margin-top: 300px;
        width: 600px;
        height: 250px;
        border-radius: 10px;
        box-shadow: 0 0 2px 3px blue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
    }

    .message {
        font-size: 35px;
        margin-bottom: 30px;
    }

    button {
        width: 200px;
        height: 50px;
        font-size: 25px;
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