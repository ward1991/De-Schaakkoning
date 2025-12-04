/**
 * BoardRenderer klasse - Rendert het schaakbord naar de DOM
 * Verantwoordelijk voor: visuele weergave van het bord
 */

export class BoardRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    /**
     * Render het complete bord
     */
    render(board) {
        // TODO: Render het bord met alle stukken
    }

    /**
     * Render een enkel vakje
     */
    renderSquare(row, col, piece) {
        // TODO: Render een vakje
    }

    /**
     * Markeer geselecteerd vakje
     */
    highlightSelected(row, col) {
        // TODO: Highlight selectie
    }

    /**
     * Toon geldige zetten
     */
    showValidMoves(moves) {
        // TODO: Toon mogelijke zetten
    }

    /**
     * Verwijder alle highlights
     */
    clearHighlights() {
        // TODO: Verwijder highlights
    }
}
