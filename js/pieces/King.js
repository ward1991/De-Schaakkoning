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
        const moves = [];
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const piece = board.getPiece(newRow, newCol);
                if (!piece || piece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        // TODO: Rokade implementeren

        return moves;
    }
}
