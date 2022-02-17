import Fleet from "./Fleet";

export default class BattleField {

    constructor() {
        this.rows = ['A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
        this.field = this.createBattleField(this.rows);
        this.emptyCells = this.createEmptyCells();
        this.fleet = new Fleet().getFleet();
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
                    ship: false
                }

                line.push(cellInfo)
            })

            field.push(line);
        }

        return field;
    }

    /**
     * Создать кординаты пустых ячеек на поле.
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


    


}
