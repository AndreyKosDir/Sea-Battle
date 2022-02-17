<template>
    <div class="startMenu">
        <h1>Введите ваше имя</h1>
        <Input @start-game="startGame"/>
    </div>
</template>

<script>
    import Input from "./UI/Input";
    export default {
        name: "StartMenu",
        components: {Input},
        methods: {
            startGame(playerName) {
                this.$emit('start-game', playerName)
            }
        }
    }
</script>

<style scoped>
    .startMenu {
        width: 600px;
        height: 180px;
        border-radius: 10px;
        box-shadow: 0 0 3px black;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

</style>