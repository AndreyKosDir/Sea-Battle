import {Helpers} from "./Helpers";

export default class AI {
    firstShootAtShip = null;
    lastShootAtShip = null;

    // Расположение корабля y - вертикальное, x - горизонтальное.
    direction = null;

    constructor(field) {
        this.field = field;
    }

    /**
     * Выстрелить.
     * @returns {null|*}
     */
    fire() {
        let tryShootCell = true;

        while (tryShootCell) {
            let x = Helpers.getRandomNumber(0, 9);
            let y = Helpers.getRandomNumber(0, 9);

            if (this.shipDestroyed()) {
                this.firstShootAtShip = null;
                this.lastShootAtShip = null;
                this.direction = null;
            }

            if (this.lastShootAtShip) {
                let shootAroundShip = this.fireAroundShip();

                if (shootAroundShip) {
                    x = shootAroundShip.x;
                    y = shootAroundShip.y;
                }
            }

            const cell = this.field[y][x];

            if (!cell.shoot) {
                tryShootCell = false;
                cell.shoot = true;

                if (cell.ship) {
                    this.setLastShotAtShip({y, x})

                    if (this.lastShootAtShip) {
                        if (this.firstShootAtShip !== this.lastShootAtShip.coords) {
                            // Определяется направление расположения корабля на основе двух попаданий.
                            this.direction = this.firstShootAtShip.x === this.lastShootAtShip.coords.x ? 'y' : 'x';
                            this.setLastShotAtShip({y, x})
                        }
                    }

                    return cell.ship.id;
                }

                return null;
            }
        }
    }

    /**
     * Выстрелить рядом с кораблём.
     * @returns {{x: *, y: *}}
     */
    fireAroundShip() {
        let y, x;
        let searchCellToShoot = true;

        while (searchCellToShoot) {

            let aroundCells = this.lastShootAtShip.around;

            for (let index = 0; index < aroundCells.length; index++) {
                let cell = aroundCells[index];

                if (cell.y >= 0 && cell.y <= 9 && cell.x >= 0 && cell.x <= 9) {
                    y = cell.y;
                    x = cell.x;
                    aroundCells.splice(index, 1);
                    return {y, x}
                }
            }

            this.setLastShotAtShip({y: this.firstShootAtShip.y, x: this.firstShootAtShip.x})
        }
    }

    /**
     * Зарегистрировать данные последнего удачного выстрела.
     * @param coords Координаты выстрела.
     */
    setLastShotAtShip(coords) {
        let {x, y} = coords;
        let around;

        // Формируется список координат в зависсимости от расположения корабля.
        if (this.direction === null) {
            around = Helpers.shuffleArray([{y: y + 1, x}, {y: y - 1, x}, {y, x: x + 1}, {y, x: x - 1}]);
        } else if(this.direction === 'y') {
            around = Helpers.shuffleArray([{y: y + 1, x}, {y: y - 1, x}]);
        } else {
            around = Helpers.shuffleArray([{y, x: x + 1}, {y, x: x - 1}]);
        }

        this.lastShootAtShip = {
            coords,
            around,
        }

        if (!this.firstShootAtShip) {
            this.firstShootAtShip = this.lastShootAtShip.coords;
        }
    }

    /**
     * Был ли уничтожен корабль последним удачным выстрелом.
     * @returns {boolean}
     */
    shipDestroyed() {
        let lastShipShoot = this.lastShootAtShip;

        if (lastShipShoot) {
            let {x, y} = lastShipShoot.coords;

            return this.field[y][x].ship.destroyed;
        }

        return false;
    }
}