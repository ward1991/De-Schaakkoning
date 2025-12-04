/**
 * Rook klasse - De Toren
 */

import { Piece } from './Piece.js';

export class Rook extends Piece {
    constructor(color) {
        super(color);
        this.type = 'rook';
    }

    getSymbol() {
        return this.color === 'white' ? '♖' : '♜';
    }

    getPossibleMoves(row, col, board) {
        // TODO: Implementeer toren bewegingen (horizontaal en verticaal)
        return [];
    }
}
