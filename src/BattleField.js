import Ships from "./ships";
import {Helpers} from "./Helpers";

export default class BattleField {

    constructor() {
        this.fleet = {};
        this.size = {width: 10, height: 10};
        this.field = this.createBattleField(this.size);
        this.ships = new Ships().getShips();
        this.positionTheShips(this.ships);
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
                    ship: null,
                    shipAround: false
                }

                row.push(cellInfo)
            }

            field.push(row);
        }

        return field;
    }

    /**
     * Расставить корабли.
     * @param ships Корабли.
     */
    positionTheShips(ships) {

        for (let index = 0; index < ships.length; index++) {

            const shipId = `ship#${index + 1}`;

            let shipDecksCoords = [];
            let findPlace = true;

            // Поиск места для поставновки корабля.
            while (findPlace) {
                let startNextIteration = !this.positionTheShip(ships[index], shipDecksCoords);

                if (startNextIteration) {
                    shipDecksCoords = [];
                    continue;
                }

                findPlace = false;
            }

            // Присваивание клеткам где будет стоять корабль ship = true.
            this.changeCellShipState(shipDecksCoords, shipId);

            this.addShipToFleet(shipId, shipDecksCoords);

            // Присваивание окружающим клеткам shipAround = true;
            this.changeCellStateAroundShip(shipDecksCoords, shipId);
        }

    }

    /**
     * Добавить корабль во флот.
     * @param shipId
     * @param shipDecksCoords
     */
    addShipToFleet(shipId, shipDecksCoords) {
        this.fleet[shipId] = {
            decks: shipDecksCoords,
            cellsAroundShip: []
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
     * @param shipDecksCoords Координаты палуб корабля.
     * @param shipId ID корабля.
     */
    changeCellShipState(shipDecksCoords, shipId) {

        for (const cell of shipDecksCoords) {
            const [y, x] = cell;
            this.field[y][x].ship = {
                id: shipId,
                destroyed: false
            };
        }
    }

    /**
     * Изменить статус клеток расположенных вокруг корабля.
     * @param shipDecksCoords Координаты палуб корабля.
     * @param shipId ID корабля.
     */
    changeCellStateAroundShip(shipDecksCoords, shipId) {
        for (const cell of shipDecksCoords) {
            const [y, x] = cell;

            for (let i = y - 1; i <= y + 1; i++) {
                if (this.field[i] === undefined) {
                    continue;
                }

                for (let j = x - 1; j <= x + 1; j++ ) {

                    if (this.field[i][j] === undefined || this.field[i][j].ship) {
                        continue;
                    }

                    this.fleet[shipId].cellsAroundShip.push([i, j]);

                    this.field[i][j].shipAround = true;
                }
            }
        }
    }


    shootAtTheShip(shipId) {

        //Обход флота, для проверки уничтожен ли корабль.
        let shipIsDestroyed = true;

        for (const shipDeckCoords of this.fleet[shipId].decks) {
            const [y, x] = shipDeckCoords;

            if (!this.field[y][x].shoot) {
                shipIsDestroyed = false;
                break;
            }
        }

        if (shipIsDestroyed) {
            for (const shipDeckCoords of this.fleet[shipId].decks) {
                const [y, x] = shipDeckCoords;
                this.field[y][x].ship.destroyed = true;
            }

            for (const cellAroundShipCoords of this.fleet[shipId].cellsAroundShip) {
                const [y, x] = cellAroundShipCoords;
                this.field[y][x].shoot = true;
            }
        }
    }
}

