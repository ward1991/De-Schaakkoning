/**
 * Game klasse - Beheert de spellogica
 * Verantwoordelijk voor: spelstatus, beurten, win/verlies condities
 */

export class Game {
    constructor() {
        this.currentPlayer = 'white';
        this.gameState = 'playing'; // 'playing', 'check', 'checkmate', 'stalemate', 'draw'
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
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
     * Controleer of het spel voorbij is
     */
    checkGameEnd() {
        // TODO: Controleer op schaakmat, pat, etc.
    }
}
