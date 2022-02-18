import Fleet from "./Fleet";
import {Helpers} from "./Helpers";

export default class BattleField {

    constructor() {
        this.size = {width: 10, height: 10};
        this.field = this.createBattleField(this.size);
        this.fleet = new Fleet().getFleet();
        this.positionTheFleet(this.fleet);
    }

    /**
     * Создать поле боя.
     * @param size Размеры поля.
     * @returns {[]}
     */
    createBattleField(size) {
        const field = [];

        for (let column = 0; column < size.width; column++) {
            const row = [];

            for (let line = 0; line < size.height; line++) {
                const cellInfo = {
                    shoot: false,
                    ship: false,
                    shipAround: false
                }

                row.push(cellInfo)
            }

            field.push(row);
        }

        return field;
    }

    /**
     * Расставить флот.
     * @param fleet Флот.
     */
    positionTheFleet(fleet) {

        for (const ship of fleet) {
            let shipCellsCoord = [];
            let findPlace = true;

            // Поиск места для поставновки корабля.
            while (findPlace) {
                let startNextIteration = !this.positionTheShip(ship, shipCellsCoord);

                if (startNextIteration) {
                    shipCellsCoord = [];
                    continue;
                }

                findPlace = false;
            }

            // Присваивание клеткам где будет стоять корабль ship = true.
            this.changeCellShipState(shipCellsCoord);

            // Присваивание окружающим клеткам shipAround = true;
            this.changeCellStateAroundShip(shipCellsCoord);
        }

    }

    /**
     * Расположить корабль.
     * @param ship Корабль.
     * @param shipCellsCoord Кординаты клеток корабля.
     * @returns {boolean}
     */
    positionTheShip(ship, shipCellsCoord) {
        let maxHor = 9;
        let maxVer = 9;
        let param;

        if (ship.direction === 0) {
            param = 'y';
            maxVer = 10 - ship.type;
        } else {
            param = 'x';
            maxHor = 10 - ship.type;
        }

        let x = Helpers.getRandomNumber(0, maxHor);
        let y = Helpers.getRandomNumber(0, maxVer);

        return this.validPlaceToShip(ship.type, {x, y}, param, shipCellsCoord);
    }

    /**
     * Допустимое клектка для установки корабля.
     * @returns {boolean|boolean}
     */
    validCell(x, y) {
        return !this.field[y][x].ship && !this.field[y][x].shipAround;
    }

    /**
     * Можно ли разместить корабль начиная с указанных координат.
     * @param shipLength Количество палуб корабля.
     * @param {x, y} - Кординаты начала корабля.
     * @param param Координата которая будет увеличиваться.
     * @param shipCellsCoord Координаты клеток корабля.
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

    /**
     * Изменить статус клеток, на которых может встать корабль.
     * @param shipCellsCoord Координаты палуб корабля.
     */
    changeCellShipState(shipCellsCoord) {
        for (const cell of shipCellsCoord) {
            const [y, x] = cell;
            this.field[y][x].ship = true;
        }
    }

    /**
     * Изменить статус клеток расположенных вокруг корабля.
     * @param shipCellsCoord Координаты палуб корабля.
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

