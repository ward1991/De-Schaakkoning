/**
 * Hulpfuncties voor De Schaakkoning
 */

/**
 * Converteer rij/kolom naar schaaknotatie (bijv. 0,0 -> 'a8')
 */
export function toChessNotation(row, col) {
    const files = 'abcdefgh';
    const rank = 8 - row;
    return files[col] + rank;
}

/**
 * Converteer schaaknotatie naar rij/kolom (bijv. 'e4' -> {row: 4, col: 4})
 */
export function fromChessNotation(notation) {
    const files = 'abcdefgh';
    const col = files.indexOf(notation[0]);
    const row = 8 - parseInt(notation[1]);
    return { row, col };
}

/**
 * Controleer of een positie binnen het bord valt
 */
export function isValidPosition(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

/**
 * Deep clone van een object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
