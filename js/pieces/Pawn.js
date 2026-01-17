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

        // Check of newRow binnen het bord is voordat we verder gaan! - bugfix
        if (newRow >= 0 && newRow < 8) {
            // Een vakje vooruit (alleen als leeg)
            if (!board.getPiece(newRow, col)) {
                moves.push({ row: newRow, col });

                // Twee vakjes vooruit (alleen eerste zet)
                if (!this.hasMoved) {
                    const twoStepsRow = row + (direction * 2);
                    if (twoStepsRow >= 0 && twoStepsRow < 8 && !board.getPiece(twoStepsRow, col)) {
                        moves.push({ row: twoStepsRow, col });
                    }
                }
            }

            // Diagonaal slaan (links) - alleen als newRow geldig is!
            if (col > 0) {
                const piece = board.getPiece(newRow, col - 1);
                if (piece && piece.color !== this.color) {
                    moves.push({ row: newRow, col: col - 1 });
                }
            }

            // Diagonaal slaan (rechts) - alleen als newRow geldig is!
            if (col < 7) {
                const piece = board.getPiece(newRow, col + 1);
                if (piece && piece.color !== this.color) {
                    moves.push({ row: newRow, col: col + 1 });
                }
            }
        }

        return moves;
    }
}
