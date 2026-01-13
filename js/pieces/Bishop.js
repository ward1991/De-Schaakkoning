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
        const moves = [];
        const directions = [
            [-1, -1], // Linksboven
            [-1, 1],  // Rechtsboven
            [1, -1],  // Linksonder
            [1, 1]    // Rechtsonder
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
                    break;
                }

                newRow += dRow;
                newCol += dCol;
            }
        }

        return moves;
    }
}
