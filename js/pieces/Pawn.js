/**
 * Pawn klasse - De Pion
 */

import { Piece } from './Piece.js';

export class Pawn extends Piece {
    constructor(color) {
        super(color);
        this.type = 'pawn';
    }

    getSymbol() {
        return this.color === 'white' ? '♙' : '♟';
    }

    getPossibleMoves(row, col, board) {
        // TODO: Implementeer pion bewegingen (vooruit, slaan diagonaal, en passant, promotie)
        return [];
    }
}
