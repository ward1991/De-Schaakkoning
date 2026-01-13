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
        const moves = [];
        const directions = [
            [-1, 0], // Omhoog
            [1, 0],  // Omlaag
            [0, -1], // Links
            [0, 1]   // Rechts
        ];

        for (const [dRow, dCol] of directions) {
            let newRow = row + dRow;
            let newCol = col + dCol;

            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const piece = board.getPiece(newRow, newCol);

                if (!piece) {
                    moves.push({ row: newRow, col: newCol });
                } else {
                    if (piece.color !== this.color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                    break; // Stop bij een stuk
                }

                newRow += dRow;
                newCol += dCol;
            }
        }

        return moves;
    }
}
