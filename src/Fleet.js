export default class Fleet {

    constructor() {
        this.config = [
            {type: 4, count: 1},
            {type: 3, count: 2},
            {type: 2, count: 3},
            {type: 1, count: 4},
        ];

        this.fleet = this.createFleet(this.config);
    }

    /**
     * Создать флот кораблей.
     * @param config Конфигурация корабля.
     * @returns {[]}
     */
    createFleet(config) {
        const fleet = [];

        for (const unit of config) {

            for (let i = 0; i < unit.count; i++) {
                // Случайным образом задается расположение корабля
                // 0 - горизонтальное, 1 - вертикальное.
                const direction = this.getRandomNumber(0, 1);

                const ship = {
                    type: unit.type,
                    direction,
                }

                fleet.push(ship);
            }
        }

        return fleet;
    }

    /**
     * Получить случайное число в заданном интервале включительно.
     * @param min Минимальное значение.
     * @param max Максимальное значение.
     * @returns {number}.
     */
    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Получить флот.
     * @returns {*[]}
     */
    getFleet() {
        return this.fleet;
    }
}