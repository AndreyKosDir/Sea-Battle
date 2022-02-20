import {Helpers} from "./Helpers";

export default class AI {

    constructor(field) {
        this.field = field;
        // this.cellsForShoot = this.createCellsForShoot();
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

    /**
     * Выстрелить в клетку.
     * @returns {null|*}
     */
    fire() {

        let tryShootCell = true;

        while (tryShootCell) {
            const x = Helpers.getRandomNumber(0, 9);
            const y = Helpers.getRandomNumber(0, 9);

            const cell = this.field[y][x];

            if (!cell.shoot) {
                tryShootCell = false;
                cell.shoot = true;

                if (cell.ship) {

                    return cell.ship.id;
                }

                return null;
            }
        }


    }
}