import {Helpers} from "./Helpers";

export default class AI {


    firstShootAtShip = null;
    lastGoodShot = null;

    direction = null;

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
            let x = Helpers.getRandomNumber(0, 9);
            let y = Helpers.getRandomNumber(0, 9);

            if (this.lastGoodShot !== null && this.field[this.lastGoodShot.coords.y][this.lastGoodShot.coords.x].ship.destroyed) {
                this.firstShootAtShip = null;
                this.lastGoodShot = null;
                this.direction = null;
            }


            if (this.lastGoodShot) {
                let goodShootCoords = this.doGoodShot();

                if (goodShootCoords) {
                    x = goodShootCoords.x;
                    y = goodShootCoords.y;
                }
            }

            const cell = this.field[y][x];

            if (!cell.shoot) {
                tryShootCell = false;
                cell.shoot = true;

                if (cell.ship) {

                    this.setLastGoodShot({y, x})

                    if (this.lastGoodShot) {
                        if (this.firstShootAtShip !== this.lastGoodShot.coords) {
                            this.direction = this.firstShootAtShip.x === this.lastGoodShot.coords.x ? 0 : 1;
                            this.setLastGoodShot({y, x})
                        }
                    }



                    return cell.ship.id;
                }

                return null;
            }
        }


    }


    doGoodShot() {
        let y;
        let x;

        let searchAGoodShot = true;

        while (searchAGoodShot) {

            let aroundCells = this.lastGoodShot.around;

            for (let index = 0; index < this.lastGoodShot.around.length; index++) {

                let cell = aroundCells[index];

                if (cell.y >= 0 && cell.y <= 9 && cell.x >= 0 && cell.x <= 9) {
                    y = cell.y;
                    x = cell.x;
                    aroundCells.splice(index, 1);
                    return {y, x}
                }
            }

            this.setLastGoodShot({y: this.firstShootAtShip.y, x: this.firstShootAtShip.x})
        }
    }


    setLastGoodShot(coords) {

        let {x, y} = coords;
        let around;

        if (this.direction === null) {
            around = [{y: y + 1, x}, {y: y - 1, x}, {y, x: x + 1}, {y, x: x - 1}];
        } else if(this.direction === 0) {
            around = [{y: y + 1, x}, {y: y - 1, x}];
        } else {
            around = [{y, x: x + 1}, {y, x: x - 1}];
        }


        this.lastGoodShot = {
            coords,
            around,
        }

        if (!this.firstShootAtShip) {
            this.firstShootAtShip = this.lastGoodShot.coords;
        }
    }
}