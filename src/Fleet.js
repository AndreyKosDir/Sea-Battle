import {Helpers} from "./Helpers";

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
                const direction = Helpers.getRandomNumber(0, 1);

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
     * Получить флот.
     * @returns {*[]}
     */
    getFleet() {
        return this.fleet;
    }
}