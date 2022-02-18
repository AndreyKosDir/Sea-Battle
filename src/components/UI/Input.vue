<template>
    <form @submit.prevent="onSubmit" class="form">
        <input type="text" placeholder="Введите имя..." v-model="name">
        <button>Принять</button>
    </form>
</template>

<script>
    export default {
        name: "Input",
        data() {
            return {
                name: '',
                count: 0
            }
        },
        methods: {
            onSubmit() {
                if (this.name.length === 0) {
                    return;
                }

                if (this.count === 0) {
                    this.$emit('send-name', this.name, 'playerName');
                    this.name = '';
                    this.count++;
                } else {
                    this.$emit('send-name', this.name, 'computerName');
                    this.$emit('start-game');
                }

            }
        },
        watch: {
            playerName() {
                if (this.name.length > 25) {
                    this.name = this.name.slice(0, 25);
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