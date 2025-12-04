/**
 * Bishop klasse - De Loper
 */

import { Piece } from './Piece.js';

export class Bishop extends Piece {
    constructor(color) {
        super(color);
        this.type = 'bishop';
    }

    getSymbol() {
        return this.color === 'white' ? '♗' : '♝';
    }

    getPossibleMoves(row, col, board) {
        // TODO: Implementeer loper bewegingen (diagonaal)
        return [];
    }
}
