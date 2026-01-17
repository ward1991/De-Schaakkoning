import { Game } from './game/Game.js';
import { Board } from './board/Board.js';
import { UI } from './ui/UI.js';
import { BoardRenderer } from './board/BoardRenderer.js';
import { GameController } from './game/GameController.js';

// Globale variabelen
let game = null;
let board = null;
let ui = null;
let boardRenderer = null;
let gameController = null;
let gameMode = null; // 'pvp' of 'ai'
let difficulty = null; // 'easy', 'medium', 'hard'

// Wacht tot de DOM geladen is
document.addEventListener('DOMContentLoaded', () => {
    initializeMenus();
});

/**
 * Initialiseert de menu's
 */
function initializeMenus() {
    console.log('De Schaakkoning menu wordt geladen...');
    
    // Main menu buttons
    document.getElementById('btn-pvp').addEventListener('click', () => {
        startGame('pvp');
    });
    
    document.getElementById('btn-ai').addEventListener('click', () => {
        showDifficultyMenu();
    });
    
    // Difficulty menu buttons
    document.getElementById('btn-easy').addEventListener('click', () => {
        startGame('ai', 'easy');
    });
    
    document.getElementById('btn-medium').addEventListener('click', () => {
        startGame('ai', 'medium');
    });
    
    document.getElementById('btn-hard').addEventListener('click', () => {
        startGame('ai', 'hard');
    });

    document.getElementById('btn-jurgen').addEventListener('click', () => {
        startGame('ai', 'jurgen');
    });
    
    document.getElementById('btn-back-to-main').addEventListener('click', () => {
        showMainMenu();
    });
    
    // Game controls
    document.getElementById('btn-new-game').addEventListener('click', () => {
        if (confirm('Weet je zeker dat je een nieuw spel wilt starten?')) {
            startGame(gameMode, difficulty);
        }
    });
    
    document.getElementById('btn-back-to-menu').addEventListener('click', () => {
        if (confirm('Weet je zeker dat je terug wilt naar het menu?')) {
            showMainMenu();
        }
    });

    // Rules buttons
    document.getElementById('btn-rules').addEventListener('click', () => {
        showRulesModal();
    });

    document.getElementById('btn-rules-ingame')?.addEventListener('click', () => {
        showRulesModal();
    });

    document.getElementById('btn-close-rules').addEventListener('click', () => {
        hideRulesModal();
    });

    document.getElementById('btn-close-rules-bottom').addEventListener('click', () => {
        hideRulesModal();
    });

    // Undo button
    document.getElementById('btn-undo')?.addEventListener('click', () => {
        if (gameController) {
            gameController.undo();
        }
    });
}

/**
 * Toont het regels modal
 */
function showRulesModal() {
    document.getElementById('rules-modal').classList.remove('hidden');
}

/**
 * Verbergt het regels modal
 */
function hideRulesModal() {
    document.getElementById('rules-modal').classList.add('hidden');
}

/**
 * Toont het hoofdmenu
 */
function showMainMenu() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('difficulty-menu').classList.add('hidden');
    document.getElementById('game-container').classList.add('hidden');
}

/**
 * Toont het moeilijkheidsgraad menu
 */
function showDifficultyMenu() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('difficulty-menu').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
}

/**
 * Start het spel met de gekozen instellingen
 */
function startGame(mode, diff = null) {
    console.log(`Spel starten: ${mode}${diff ? ` - ${diff}` : ''}`);
    
    gameMode = mode;
    difficulty = diff;
    
    // Verberg menu's en toon het spel
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('difficulty-menu').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    
    // Initialiseer het spel
    initializeGame();
}

/**
 * Initialiseert het schaakspel
 */
function initializeGame() {
    console.log('De Schaakkoning wordt geladen...');

    // Initialiseer het spel
    game = new Game(gameMode, difficulty);
    board = new Board();
    ui = new UI();
    boardRenderer = new BoardRenderer('chess-board');

    // Zet stukken op startpositie en render het bord
    board.setupInitialPosition();
    boardRenderer.render(board);

    // Initialiseer de game controller voor interactiviteit
    gameController = new GameController(game, board, boardRenderer, ui);

    console.log('Spel geïnitialiseerd!');
}
