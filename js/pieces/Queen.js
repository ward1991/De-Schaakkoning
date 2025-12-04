/**
 * Queen klasse - De Koningin/Dame
 */

import { Piece } from './Piece.js';

export class Queen extends Piece {
    constructor(color) {
        super(color);
        this.type = 'queen';
    }

    getSymbol() {
        return this.color === 'white' ? '♕' : '♛';
    }

    getPossibleMoves(row, col, board) {
        // TODO: Implementeer dame bewegingen (combinatie van toren + loper)
        return [];
    }
}
