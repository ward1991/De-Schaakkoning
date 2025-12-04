/**
 * Knight klasse - Het Paard
 */

import { Piece } from './Piece.js';

export class Knight extends Piece {
    constructor(color) {
        super(color);
        this.type = 'knight';
    }

    getSymbol() {
        return this.color === 'white' ? '♘' : '♞';
    }

    getPossibleMoves(row, col, board) {
        // TODO: Implementeer paard bewegingen (L-vorm)
        return [];
    }
}
