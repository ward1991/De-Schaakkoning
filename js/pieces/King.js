/**
 * King klasse - De Koning
 */

import { Piece } from './Piece.js';

export class King extends Piece {
    constructor(color) {
        super(color);
        this.type = 'king';
    }

    getSymbol() {
        return this.color === 'white' ? '♔' : '♚';
    }

    getPossibleMoves(row, col, board) {
        // TODO: Implementeer koning bewegingen (1 vakje alle richtingen + rokade)
        return [];
    }
}
