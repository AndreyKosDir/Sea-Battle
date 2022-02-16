const letters = ['A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

function createCells() {
    let result = [];

    for (let i = 0; i < letters.length; i++) {
        const line = [];

        for (const letter of letters) {
            const cellInfo = {
                shoot: false,
                ship: false
            }

            const cell = {
                [`${letter}${i + 1}`]: cellInfo
            }

            line.push(cell)
        }

        result.push(line);
    }

    result[0][1] = 2;

    return result;

}

export const field = createCells();
