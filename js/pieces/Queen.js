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
        const moves = [];
        // Combinatie van horizontaal/verticaal (toren) en diagonaal (loper)
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1],  // Toren richtingen
            [-1, -1], [-1, 1], [1, -1], [1, 1] // Loper richtingen
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
