import {Helpers} from "./Helpers";

export default class AI {

    constructor() {
        this.cellsForShoot = this.createCellsForShoot();
    }

    /**
     * Создать массив с координатами ячеек по которым будет производиться выстрел.
     * @returns {[]}
     */
    createCellsForShoot() {
        const emptyCells = [];

        for (let column = 0; column < 10; column++) {

            for (let line = 0; line < 10; line++) {
                emptyCells.push({column, line});
            }
        }

        return emptyCells;
    }

    fire() {
        const index = Helpers.getRandomNumber(0, this.cellsForShoot.length - 1);
        return this.cellsForShoot.splice(index, 1);

    }
}