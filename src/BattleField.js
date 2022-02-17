import Fleet from "./Fleet";
import {Helpers} from "./Helpers";

export default class BattleField {

    constructor() {
        this.rows = ['A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
        this.field = this.createBattleField(this.rows);
        this.emptyCells = this.createEmptyCells();
        this.fleet = new Fleet().getFleet();
        this.putShips(this.fleet);
        // this.putShips([{type: 4, direction: 1}]);
    }

    /**
     * Создать поле боя.
     * @param rows
     * @returns {[]}
     */
    createBattleField(rows) {
        const field = [];

        for (let i = 0; i < rows.length; i++) {
            const line = [];

            rows.forEach(() => {
                const cellInfo = {
                    shoot: false,
                    ship: false,
                    shipAround: false
                }

                line.push(cellInfo)
            })

            field.push(line);
        }

        return field;
    }

    /**
     * Создать кординаты пустых ячеек поля.
     * @returns {[]}
     */
    createEmptyCells() {
        const emptyCells = [];

        for (let x = 0; x < 10; x++) {

            for (let y = 0; y < 10; y++) {
                emptyCells.push([x, y]);
            }
        }

        return emptyCells;
    }

    putShips(fleet) {

        for (const ship of fleet) {

            /**
             * поставить 4х палубный корабль.
             */
            if (ship.type === 4) {
                let tryToPut = true;

                while (tryToPut) {

                    const shipCellsCoord = [];
                    let startNextIteration = !this.putShip(ship, shipCellsCoord);

                    // Если какая-то из палуб корабля заходит на поле, которое занято кораблем или рядом с кораблем.
                    if (startNextIteration) {
                        continue;
                    }

                    // Массив с клетками где стоит корабль сформирован и все клетки подходят.
                    // Присваивание клеткам где будет стоять корабль .ship = true.
                    this.changeCellShipState(shipCellsCoord);

                    // Присваивание окружающим клеткам shipAround = true;
                    this.changeCellStateAroundShip(shipCellsCoord);
                    tryToPut = false;
                }

                continue;
            }

            return;

            // /**
            //  * Поставить 3х палубный корабль.
            //  */
            // if (ship.type === 3) {
            //
            // }
            //
            // /**
            //  * Поставить 2х палубный корабль.
            //  */
            // if (ship.type === 2) {
            //
            // }



        }
    }

    validCell(x, y) {
        return !this.field[y][x].ship && !this.field[y][x].shipAround;
    }

    /**
     * Можно ли разместить корабль начиная с указанных координат.
     * @param shipLength Количество палуб корабля.
     * @param x
     * @param y
     * @param param Координата которая будет увеличиваться.
     * @param shipCellsCoord Массив с координатами ячеек корабля.
     * @returns {boolean}
     */
    validPlaceToShip(shipLength, {x, y}, param, shipCellsCoord) {
        for (let i = 0; i < shipLength; i++) {

            if (!this.validCell(x, y)) {
                return false;
            }

            shipCellsCoord.push([y, x]);

            if (param === 'y') {
                y += 1;
            } else {
                x += 1;
            }
        }

        return true;
    }

    putShip(ship, shipCellsCoord) {
        let maxHor = 9;
        let maxVer = 9;
        let param;

        if (ship.direction === 0) {
            param = 'y';
            maxVer = 6;

        } else {
            maxHor = 6
            param = 'x';
        }

        let x = Helpers.getRandomNumber(0, maxHor);
        let y = Helpers.getRandomNumber(0, maxVer);
        // let x = Helpers.getRandomNumber(0, 9);
        // let y = Helpers.getRandomNumber(0, 6);

        // Если первая палуба корабля не встает то функция возвращает false.
        // if (!this.validCell(x, y)) {
        //     return false;
        // }
        //
        // shipCellsCoord.push([y, x]);

        // Если какая то из палуб корабля не встает то функция возвращает false.
        if (!this.validPlaceToShip(ship.type, {x, y}, param, shipCellsCoord)) {
            return false;
        }

        return true;
    }

    /**
     * Изменить статус клеток, на которых может встать корабль.
     * @param shipCellsCoord
     */
    changeCellShipState(shipCellsCoord) {
        for (const cell of shipCellsCoord) {
            const [y, x] = cell;
            this.field[y][x].ship = true;
        }
    }

    /**
     * Изменить статус клеток расположенных вокруг корабля.
     * @param shipCellsCoord
     */
    changeCellStateAroundShip(shipCellsCoord) {
        for (const cell of shipCellsCoord) {
            const [y, x] = cell;

            for (let i = y - 1; i <= y + 1; i++) {
                if (this.field[i] === undefined) {
                    continue;
                }

                for (let j = x - 1; j <= x + 1; j++ ) {

                    if (this.field[i][j] === undefined || this.field[i][j].ship) {
                        continue;
                    }

                    this.field[i][j].shipAround = true;
                }
            }
        }
    }
}

