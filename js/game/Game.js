/**
 * Game klasse - Beheert de spellogica
 * Verantwoordelijk voor: spelstatus, beurten, win/verlies condities
 */

import { SoundManager } from '../utils/SoundManager.js';

export class Game {
    constructor(gameMode = 'pvp', difficulty = null) {
        this.gameMode = gameMode; // 'pvp' of 'ai'
        this.difficulty = difficulty; // 'easy', 'medium', 'hard' (voor AI)
        this.currentPlayer = 'white';
        this.gameState = 'playing'; // 'playing', 'check', 'checkmate', 'stalemate', 'draw'
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.soundManager = new SoundManager();
        
        console.log(`Game mode: ${this.gameMode}${this.difficulty ? ` (${this.difficulty})` : ''}`);
    }

    /**
     * Start een nieuw spel
     */
    newGame() {
        // TODO: Reset het bord en alle variabelen
    }

    /**
     * Wissel van speler
     */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }

    /**
     * Voeg een zet toe aan de geschiedenis
     */
    addMove(move) {
        this.moveHistory.push(move);
    }

    /**
     * Voer een zet uit op het bord (met geluid)
     */
    makeMove(board, fromRow, fromCol, toRow, toCol) {
        const piece = board.movePiece(fromRow, fromCol, toRow, toCol);
        this.soundManager.playMove();
        return piece;
    }

    /**
     * Controleer of een kleur schaak staat
     */
    isInCheck(color, board) {
        // Vind de koning van de gegeven kleur
        let kingPos = null;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece && piece.type === 'king' && piece.color === color) {
                    kingPos = { row, col };
                    break;
                }
            }
            if (kingPos) break;
        }

        if (!kingPos) return false;

        // Controleer of een tegenstander de koning kan aanvallen
        return this.isSquareUnderAttack(kingPos.row, kingPos.col, color, board);
    }

    /**
     * Controleer of een vakje onder aanval staat door de tegenstander
     */
    isSquareUnderAttack(row, col, defenderColor, board) {
        const attackerColor = defenderColor === 'white' ? 'black' : 'white';

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board.getPiece(r, c);
                if (piece && piece.color === attackerColor) {
                    const moves = piece.getPossibleMoves(r, c, board);
                    if (moves.some(move => move.row === row && move.col === col)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Controleer of een kleur schaakmat staat
     */
    isCheckmate(color, board) {
        // Eerst controleren of de speler schaak staat
        if (!this.isInCheck(color, board)) {
            return false;
        }

        // Controleer of er een geldige zet is die schaak opheft
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece && piece.color === color) {
                    const moves = piece.getPossibleMoves(row, col, board);
                    for (const move of moves) {
                        // Voor koning: controleer of doelvakje veilig is
                        if (piece.type === 'king') {
                            const tempOriginalPiece = board.getPiece(move.row, move.col);
                            board.setPiece(move.row, move.col, piece);
                            board.setPiece(row, col, null);

                            const underAttack = this.isSquareUnderAttack(move.row, move.col, color, board);

                            board.setPiece(row, col, piece);
                            board.setPiece(move.row, move.col, tempOriginalPiece);

                            if (underAttack) {
                                continue; // Skip deze zet, niet veilig
                            }
                        }

                        // Simuleer de zet
                        const originalPiece = board.getPiece(move.row, move.col);
                        board.setPiece(move.row, move.col, piece);
                        board.setPiece(row, col, null);

                        const stillInCheck = this.isInCheck(color, board);

                        // Herstel de zet
                        board.setPiece(row, col, piece);
                        board.setPiece(move.row, move.col, originalPiece);

                        if (!stillInCheck) {
                            console.log(`Niet schaakmat: ${piece.type} kan van ${row},${col} naar ${move.row},${move.col}`);
                            return false; // Er is een zet die schaak opheft
                        }
                    }
                }
            }
        }

        console.log(`SCHAAKMAT! ${color} heeft geen geldige zetten meer`);
        return true; // Geen zet kan schaak opheffen
    }

    /**
     * Controleer of het spel voorbij is
     */
    checkGameEnd() {
        return this.gameState === 'checkmate' || this.gameState === 'stalemate';
    }
}
