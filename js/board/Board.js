/**
 * Board klasse - Beheert het schaakbord
 * Verantwoordelijk voor: bord status, stukken posities
 */

export class Board {
    constructor() {
        this.squares = this.createEmptyBoard();
        this.selectedPiece = null;
        this.selectedPosition = null;
    }

    /**
     * Maak een leeg 8x8 bord
     */
    createEmptyBoard() {
        return Array(8).fill(null).map(() => Array(8).fill(null));
    }

    /**
     * Zet het bord op met alle stukken in startpositie
     */
    setupInitialPosition() {
        // TODO: Plaats alle stukken op hun startpositie
    }

    /**
     * Krijg het stuk op een bepaalde positie
     */
    getPiece(row, col) {
        return this.squares[row][col];
    }

    /**
     * Plaats een stuk op een positie
     */
    setPiece(row, col, piece) {
        this.squares[row][col] = piece;
    }

    /**
     * Verplaats een stuk
     */
    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.getPiece(fromRow, fromCol);
        this.setPiece(toRow, toCol, piece);
        this.setPiece(fromRow, fromCol, null);
        return piece;
    }

    /**
     * Reset het bord naar startpositie
     */
    reset() {
        this.squares = this.createEmptyBoard();
        this.setupInitialPosition();
    }
}
