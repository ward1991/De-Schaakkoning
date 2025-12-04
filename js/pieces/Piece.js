/**
 * Piece basis klasse - Basisklasse voor alle schaakstukken
 * Verantwoordelijk voor: gemeenschappelijke eigenschappen en methodes
 */

export class Piece {
    constructor(color) {
        this.color = color; // 'white' of 'black'
        this.hasMoved = false;
    }

    /**
     * Krijg het Unicode symbool voor dit stuk
     */
    getSymbol() {
        // Wordt overschreven door subklassen
        return '';
    }

    /**
     * Krijg mogelijke zetten (zonder validatie)
     */
    getPossibleMoves(row, col, board) {
        // Wordt overschreven door subklassen
        return [];
    }

    /**
     * Markeer dat dit stuk bewogen heeft
     */
    setMoved() {
        this.hasMoved = true;
    }
}
