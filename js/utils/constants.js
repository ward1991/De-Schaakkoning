/**
 * Constanten voor De Schaakkoning
 */

// Kleuren
export const COLORS = {
    WHITE: 'white',
    BLACK: 'black'
};

// Stuk types
export const PIECE_TYPES = {
    KING: 'king',
    QUEEN: 'queen',
    ROOK: 'rook',
    BISHOP: 'bishop',
    KNIGHT: 'knight',
    PAWN: 'pawn'
};

// Spelstatus
export const GAME_STATES = {
    PLAYING: 'playing',
    CHECK: 'check',
    CHECKMATE: 'checkmate',
    STALEMATE: 'stalemate',
    DRAW: 'draw'
};

// Bord afmetingen
export const BOARD_SIZE = 8;

// Startpositie in FEN notatie
export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
