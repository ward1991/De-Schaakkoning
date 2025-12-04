/**
 * UI klasse - Beheert de gebruikersinterface
 * Verantwoordelijk voor: event handling, updates, meldingen
 */

export class UI {
    constructor() {
        this.setupEventListeners();
    }

    /**
     * Stel alle event listeners in
     */
    setupEventListeners() {
        // TODO: Event listeners voor klikken, drag & drop, etc.
    }

    /**
     * Update de speler informatie
     */
    updatePlayerInfo(currentPlayer) {
        // TODO: Toon wie aan de beurt is
    }

    /**
     * Update de zet geschiedenis
     */
    updateMoveHistory(moves) {
        // TODO: Toon alle zetten
    }

    /**
     * Toon een melding
     */
    showMessage(message, type = 'info') {
        // TODO: Toon melding aan gebruiker
    }

    /**
     * Toon game over scherm
     */
    showGameOver(winner, reason) {
        // TODO: Toon eindscherm
    }
}
