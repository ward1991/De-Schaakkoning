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
        const moves = [];
        const direction = this.color === 'white' ? -1 : 1; // Wit gaat omhoog, zwart omlaag

        // Een vakje vooruit
        const newRow = row + direction;
        if (newRow >= 0 && newRow < 8 && !board.getPiece(newRow, col)) {
            moves.push({ row: newRow, col });

            // Twee vakjes vooruit (alleen eerste zet)
            if (!this.hasMoved) {
                const twoStepsRow = row + (direction * 2);
                if (!board.getPiece(twoStepsRow, col)) {
                    moves.push({ row: twoStepsRow, col });
                }
            }
        }

        // Diagonaal slaan (links)
        if (col > 0) {
            const piece = board.getPiece(newRow, col - 1);
            if (piece && piece.color !== this.color) {
                moves.push({ row: newRow, col: col - 1 });
            }
        }

        // Diagonaal slaan (rechts)
        if (col < 7) {
            const piece = board.getPiece(newRow, col + 1);
            if (piece && piece.color !== this.color) {
                moves.push({ row: newRow, col: col + 1 });
            }
        }

        return moves;
    }
}
