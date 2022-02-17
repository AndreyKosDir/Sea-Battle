export const Helpers = {
    /**
     * Получить случайное число в заданном интервале включительно.
     * @param min Минимальное значение.
     * @param max Максимальное значение.
     * @returns {number}.
     */
    getRandomNumber: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}