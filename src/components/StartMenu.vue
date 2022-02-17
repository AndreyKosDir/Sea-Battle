<template>
    <div class="startMenu">
        <span>Введите ваше имя</span>
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
        margin-top: 200px;
        border-radius: 10px;
        box-shadow: 0 0 2px 3px blue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    span {
        font-size: 35px;
        margin-bottom: 30px;
    }

</style>