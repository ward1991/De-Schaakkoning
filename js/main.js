/**
 * Main entry point voor De Schaakkoning
 * Initialiseert het spel en koppelt alle modules
 */

import { Game } from './game/Game.js';
import { Board } from './board/Board.js';
import { UI } from './ui/UI.js';

// Wacht tot de DOM geladen is
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

/**
 * Initialiseert het schaakspel
 */
function initializeGame() {
    console.log('De Schaakkoning wordt geladen...');
    
    // TODO: Initialiseer het spel
    // const game = new Game();
    // const board = new Board();
    // const ui = new UI();
    
    console.log('Spel geïnitialiseerd!');
}
