<template>
    <div class="startMenu">
        <span>{{message}}</span>
        <Input @start-game="startGame" @send-name="sendName"/>
    </div>
</template>

<script>
    import Input from "./UI/Input";
    export default {
        name: "StartMenu",
        components: {Input},
        data() {
            return {
                message: 'Введите ваше имя'
            }
        },
        methods: {
            startGame() {
                this.$emit('start-game')
            },
            sendName(name, recipient) {
                if (recipient === 'playerName') {
                    this.message = 'Введите имя противника';
                }
                this.$emit('assign-name', name, recipient)
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