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
        const moves = [];
        const knightMoves = [
            [-2, -1], [-2, 1],
            [-1, -2], [-1, 2],
            [1, -2], [1, 2],
            [2, -1], [2, 1]
        ];

        for (const [dRow, dCol] of knightMoves) {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const piece = board.getPiece(newRow, newCol);
                if (!piece || piece.color !== this.color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }
}
