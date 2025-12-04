import { Game } from './game/Game.js';
import { Board } from './board/Board.js';
import { UI } from './ui/UI.js';
import { BoardRenderer } from './board/BoardRenderer.js';

// Wacht tot de DOM geladen is
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

/**
 * Initialiseert het schaakspel
 */
function initializeGame() {
    console.log('De Schaakkoning wordt geladen...');
    
    // Initialiseer het spel
    const game = new Game();
    const board = new Board();
    const ui = new UI();
    const boardRenderer = new BoardRenderer('chess-board');
    
    // Zet stukken op startpositie en render het bord
    board.setupInitialPosition();
    boardRenderer.render(board);
    
    console.log('Spel geïnitialiseerd!');
}
