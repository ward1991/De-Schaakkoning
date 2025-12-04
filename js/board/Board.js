/**
 * Board klasse - Beheert het schaakbord
 * Verantwoordelijk voor: bord status, stukken posities
 */

import { King, Queen, Rook, Bishop, Knight, Pawn } from '../pieces/index.js';

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
        // Zwarte stukken (rij 0 en 1)
        this.squares[0][0] = new Rook('black');
        this.squares[0][1] = new Knight('black');
        this.squares[0][2] = new Bishop('black');
        this.squares[0][3] = new Queen('black');
        this.squares[0][4] = new King('black');
        this.squares[0][5] = new Bishop('black');
        this.squares[0][6] = new Knight('black');
        this.squares[0][7] = new Rook('black');
        for (let col = 0; col < 8; col++) {
            this.squares[1][col] = new Pawn('black');
        }

        // Witte stukken (rij 6 en 7)
        this.squares[7][0] = new Rook('white');
        this.squares[7][1] = new Knight('white');
        this.squares[7][2] = new Bishop('white');
        this.squares[7][3] = new Queen('white');
        this.squares[7][4] = new King('white');
        this.squares[7][5] = new Bishop('white');
        this.squares[7][6] = new Knight('white');
        this.squares[7][7] = new Rook('white');
        for (let col = 0; col < 8; col++) {
            this.squares[6][col] = new Pawn('white');
        }
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
