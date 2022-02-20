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
    },

    /**
     * Перемешать массив.
     * @param array Массив.
     * @returns {[]}
     */
    shuffleArray(array) {
        const newArray = [...array];

        const shuffleArray = [];

        while (newArray.length > 0) {
            let index = Helpers.getRandomNumber(0, newArray.length - 1);
            shuffleArray.push(newArray[index]);
            newArray.splice(index, 1);
        }

        return shuffleArray;
    }
}