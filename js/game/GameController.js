/**
 * GameController - Coördineert het spel tussen Board, Game en UI
 * Bevat nu AI integratie!
 */

import {ChessAI} from '../ai/ChessAI.js';

export class GameController {
    constructor(game, board, boardRenderer, ui) {
        this.game = game;
        this.board = board;
        this.boardRenderer = boardRenderer;
        this.ui = ui;
        this.selectedSquare = null;
        this.selectedPiece = null;
        this.moveStack = []; // Voor undo functionaliteit
        this.isAIThinking = false;

        // Initialiseer AI als het een AI spel is
        if (this.game.gameMode === 'ai') {
            this.ai = new ChessAI(this.game.difficulty);
            console.log(`AI geïnitialiseerd: ${this.game.difficulty}`);
        }

        this.setupEventListeners();
        this.updateUI();
    }

    /**
     * Setup click event listeners op het schaakbord
     */
    setupEventListeners() {
        const boardElement = document.getElementById('chess-board');

        boardElement.addEventListener('click', (e) => {
            // Blokkeer input als AI aan het denken is
            if (this.isAIThinking) {
                console.log('AI is aan het denken...');
                return;
            }

            const square = e.target.closest('.square');
            if (!square) return;

            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);

            this.handleSquareClick(row, col);
        });
    }

    /**
     * Behandel klik op een vakje
     */
    handleSquareClick(row, col) {
        // In AI mode: alleen wit kan spelen
        if (this.game.gameMode === 'ai' && this.game.currentPlayer === 'black') {
            return;
        }

        const piece = this.board.getPiece(row, col);

        // Als er al een stuk geselecteerd is
        if (this.selectedSquare) {
            // Probeer de zet uit te voeren
            if (this.tryMove(this.selectedSquare.row, this.selectedSquare.col, row, col)) {
                this.selectedSquare = null;
                this.selectedPiece = null;
                this.boardRenderer.clearHighlights();

                // Als het een AI spel is en het spel niet voorbij is, laat de AI een zet doen
                if (this.game.gameMode === 'ai' && !this.game.checkGameEnd()) {
                    this.makeAIMove();
                }
            } else {
                // Als het klikken op een eigen stuk is, selecteer dat stuk
                if (piece && piece.color === this.game.currentPlayer) {
                    this.selectSquare(row, col, piece);
                } else {
                    // Deselecteer
                    this.selectedSquare = null;
                    this.selectedPiece = null;
                    this.boardRenderer.clearHighlights();
                    this.boardRenderer.render(this.board);
                }
            }
        } else {
            // Selecteer een stuk als het van de huidige speler is
            if (piece && piece.color === this.game.currentPlayer) {
                this.selectSquare(row, col, piece);
            }
        }
    }

    /**
     * Laat de AI een zet maken
     */
    async makeAIMove() {
        this.isAIThinking = true;
        this.ui.showMessage('AI is aan het denken...', 'info');
        const startTime = Date.now();
        // Kleine delay voor betere UX
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const move = this.ai.findBestMove(this.board, this.game);

            if (move) {
                console.log(`AI zet: ${move.from.row},${move.from.col} -> ${move.to.row},${move.to.col}`);

                // Voer de AI zet uit
                this.tryMove(move.from.row, move.from.col, move.to.row, move.to.col, true);

                // Highlight de AI zet
                this.board.highlightLastMove(
                    move.from.row,
                    move.from.col,
                    move.to.row,
                    move.to.col
                );
            } else {
                console.error('AI kon geen zet vinden!');
            }
        } catch (error) {
            console.error('AI fout:', error);
        }
        const endTime = Date.now();
        this.ui.showMessage(`AI vond beste zet in ${endTime - startTime}ms, depth = ${this.ai.depths[this.ai.difficulty]}`, 'success');

        this.isAIThinking = false;
    }

    /**
     * Selecteer een vakje
     */
    selectSquare(row, col, piece) {
        this.selectedSquare = { row, col };
        this.selectedPiece = piece;

        // Render het bord opnieuw en highlight het geselecteerde vakje
        this.boardRenderer.render(this.board);
        this.boardRenderer.highlightSelected(row, col);

        // Toon geldige zetten
        const validMoves = this.getValidMoves(row, col, piece);
        this.boardRenderer.showValidMoves(validMoves);
    }

    /**
     * Probeer een zet uit te voeren
     */
    tryMove(fromRow, fromCol, toRow, toCol, isAIMove = false) {
        const piece = this.board.getPiece(fromRow, fromCol);
        const targetPiece = this.board.getPiece(toRow, toCol);

        // Kan niet naar hetzelfde vakje bewegen
        if (fromRow === toRow && fromCol === toCol) {
            return false;
        }

        // Kan niet eigen stuk slaan
        if (targetPiece && targetPiece.color === piece.color) {
            return false;
        }

        // Valideer de zet met echte bewegingsregels
        const validMoves = piece.getPossibleMoves(fromRow, fromCol, this.board);
        const isValidMove = validMoves.some(move => move.row === toRow && move.col === toCol);

        if (!isValidMove) {
            if (!isAIMove) console.log('Ongeldige zet!');
            return false;
        }

        // SPECIALE VALIDATIE VOOR KONING: mag niet naar vakje onder aanval
        if (piece.type === 'king') {
            const tempOriginalPiece = this.board.getPiece(toRow, toCol);
            this.board.setPiece(toRow, toCol, piece);
            this.board.setPiece(fromRow, fromCol, null);

            const underAttack = this.game.isSquareUnderAttack(toRow, toCol, piece.color, this.board);

            this.board.setPiece(fromRow, fromCol, piece);
            this.board.setPiece(toRow, toCol, tempOriginalPiece);

            if (underAttack) {
                if (!isAIMove) this.ui.showMessage('De koning kan niet naar een vakje onder aanval!', 'error');
                return false;
            }
        }

        // KRITIEK: Controleer of deze zet schaak opheft indien nodig
        const originalPiece = this.board.getPiece(toRow, toCol);
        this.board.setPiece(toRow, toCol, piece);
        this.board.setPiece(fromRow, fromCol, null);

        const stillInCheck = this.game.isInCheck(this.game.currentPlayer, this.board);

        this.board.setPiece(fromRow, fromCol, piece);
        this.board.setPiece(toRow, toCol, originalPiece);

        if (this.game.isInCheck(this.game.currentPlayer, this.board)) {
            if (stillInCheck) {
                if (!isAIMove) this.ui.showMessage('Je staat SCHAAK! Deze zet lost het niet op!', 'error');
                return false;
            }
        } else {
            if (stillInCheck) {
                if (!isAIMove) this.ui.showMessage('Deze zet zet je eigen koning schaak!', 'error');
                return false;
            }
        }

        // Sla de zet op voor undo
        const moveData = {
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: piece,
            capturedPiece: targetPiece,
            hadMoved: piece.hasMoved
        };
        this.moveStack.push(moveData);

        // Voer de zet uit
        this.game.makeMove(this.board, fromRow, fromCol, toRow, toCol);

        // Markeer dat het stuk bewogen heeft
        piece.setMoved();

        // DIRECT het bord renderen zodat de zet zichtbaar is
        this.boardRenderer.render(this.board);

        // Voeg zet toe aan geschiedenis
        const moveNotation = `${this.getSquareName(fromRow, fromCol)}-${this.getSquareName(toRow, toCol)}`;
        this.game.addMove({ from: this.getSquareName(fromRow, fromCol), to: this.getSquareName(toRow, toCol) });

        // Wissel van speler
        this.game.switchPlayer();

        // Controleer op schaak/schaakmat
        const isCheck = this.game.isInCheck(this.game.currentPlayer, this.board);
        const isCheckmate = this.game.isCheckmate(this.game.currentPlayer, this.board);

        if (isCheckmate) {
            this.game.gameState = 'checkmate';
            const winner = this.game.currentPlayer === 'white' ? 'black' : 'white';
            this.ui.showGameOver(winner, 'Schaakmat!');
        }

        // Update UI
        this.updateUI();

        console.log(`Zet: ${moveNotation}, Nu aan de beurt: ${this.game.currentPlayer}`);

        return true;
    }

    /**
     * Maak de laatste zet ongedaan
     */
    undo() {
        if (this.moveStack.length === 0) {
            this.ui.showMessage('Geen zetten om ongedaan te maken', 'warning');
            return;
        }

        // In AI mode: maak 2 zetten ongedaan (speler + AI)
        const undoCount = this.game.gameMode === 'ai' && this.moveStack.length >= 2 ? 2 : 1;

        for (let i = 0; i < undoCount; i++) {
            if (this.moveStack.length === 0) break;

            const moveData = this.moveStack.pop();

            // Herstel de zet
            this.board.setPiece(moveData.from.row, moveData.from.col, moveData.piece);
            this.board.setPiece(moveData.to.row, moveData.to.col, moveData.capturedPiece);

            // Herstel hasMoved status
            moveData.piece.hasMoved = moveData.hadMoved;

            // Wissel terug van speler
            this.game.switchPlayer();

            // Verwijder laatste zet uit geschiedenis
            this.game.moveHistory.pop();
        }

        // Reset game state
        this.game.gameState = 'playing';

        // Update UI
        this.boardRenderer.render(this.board);
        this.updateUI();

        this.ui.showMessage('Zet ongedaan gemaakt', 'info');
    }

    /**
     * Update de UI
     */
    updateUI() {
        const isCheck = this.game.isInCheck(this.game.currentPlayer, this.board);
        this.ui.updatePlayerInfo(this.game.currentPlayer, isCheck);
        this.ui.updateMoveHistory(this.game.moveHistory);
    }

    /**
     * Krijg schaaknotatie voor een vakje
     */
    getSquareName(row, col) {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const rank = 8 - row;
        return files[col] + rank;
    }

    /**
     * Krijg geldige zetten voor een stuk (rekening houdend met schaak)
     */
    getValidMoves(row, col, piece) {
        const possibleMoves = piece.getPossibleMoves(row, col, this.board);
        const validMoves = [];

        for (const move of possibleMoves) {
            if (piece.type === 'king') {
                const tempOriginalPiece = this.board.getPiece(move.row, move.col);
                this.board.setPiece(move.row, move.col, piece);
                this.board.setPiece(row, col, null);

                const underAttack = this.game.isSquareUnderAttack(move.row, move.col, piece.color, this.board);

                this.board.setPiece(row, col, piece);
                this.board.setPiece(move.row, move.col, tempOriginalPiece);

                if (underAttack) continue;
            }

            const originalPiece = this.board.getPiece(move.row, move.col);
            this.board.setPiece(move.row, move.col, piece);
            this.board.setPiece(row, col, null);

            const wouldBeInCheck = this.game.isInCheck(this.game.currentPlayer, this.board);

            this.board.setPiece(row, col, piece);
            this.board.setPiece(move.row, move.col, originalPiece);

            if (!wouldBeInCheck) {
                validMoves.push(move);
            }
        }

        return validMoves;
    }
}