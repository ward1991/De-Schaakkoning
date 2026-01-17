/**
 * ChessAI klasse - Implementeert minimax met alpha-beta pruning
 * Met optimalisaties voor betere performance en bug fixes
 */

export class ChessAI {
    constructor(difficulty = 'medium') {
        this.difficulty = difficulty;

        // Diepte voor verschillende moeilijkheidsgraden
        this.depths = {
            'easy': 2,      // Kijkt 2 zetten vooruit
            'medium': 3,    // Kijkt 3 zetten vooruit
            'hard': 4,       // Kijkt 4 zetten vooruit
            'jurgen': 6     // JURGEN
        };

        // Stuk waardes voor evaluatie
        this.pieceValues = {
            'pawn': 100,
            'knight': 320,
            'bishop': 330,
            'rook': 500,
            'queen': 900,
            'king': 20000
        };

        // Positie bonussen voor pionnen
        this.pawnPositionBonus = [
            [0,  0,  0,  0,  0,  0,  0,  0],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [5,  5, 10, 25, 25, 10,  5,  5],
            [0,  0,  0, 20, 20,  0,  0,  0],
            [5, -5,-10,  0,  0,-10, -5,  5],
            [5, 10, 10,-20,-20, 10, 10,  5],
            [0,  0,  0,  0,  0,  0,  0,  0]
        ];

        // Positie bonussen voor paarden
        this.knightPositionBonus = [
            [-50,-40,-30,-30,-30,-30,-40,-50],
            [-40,-20,  0,  0,  0,  0,-20,-40],
            [-30,  0, 10, 15, 15, 10,  0,-30],
            [-30,  5, 15, 20, 20, 15,  5,-30],
            [-30,  0, 15, 20, 20, 15,  0,-30],
            [-30,  5, 10, 15, 15, 10,  5,-30],
            [-40,-20,  0,  5,  5,  0,-20,-40],
            [-50,-40,-30,-30,-30,-30,-40,-50]
        ];

        this.nodesSearched = 0;
    }

    /**
     * Zoek de beste zet voor de AI
     */
    findBestMove(board, game) {
        console.log(`AI denkt na... (${this.difficulty} - diepte ${this.depths[this.difficulty]})`);

        const startTime = Date.now();
        const depth = this.depths[this.difficulty];
        const aiColor = game.currentPlayer;

        this.nodesSearched = 0;

        let bestMove = null;
        let bestValue = -Infinity;
        let alpha = -Infinity;
        let beta = Infinity;

        // Krijg alle mogelijke zetten
        const allMoves = this.getAllPossibleMoves(board, aiColor, game);

        if (allMoves.length === 0) {
            console.error('Geen geldige zetten!');
            return null;
        }

        // Voor 'easy' mode: voeg wat randomness toe
        if (this.difficulty === 'easy' && Math.random() < 0.3) {
            const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
            console.log('Easy mode: random zet!');
            return randomMove;
        }

        // OPTIMALISATIE: Sorteer zetten (betere move ordering = meer pruning)
        this.orderMoves(allMoves, board);

        // Evalueer elke mogelijke zet
        for (const move of allMoves) {
            // Simuleer de zet
            const moveState = this.simulateMove(board, move);

            // Minimax met alpha-beta pruning
            const value = this.minimax(board, game, depth - 1, alpha, beta, false, aiColor);

            // Herstel de zet
            this.undoMove(board, move, moveState);

            // Update beste zet
            if (value > bestValue) {
                bestValue = value;
                bestMove = move;
            }

            alpha = Math.max(alpha, value);
        }

        const endTime = Date.now();

        console.log(`AI vond beste zet in ${endTime - startTime}ms`);
        console.log(`Nodes searched: ${this.nodesSearched}, Waarde: ${bestValue}`);

        return bestMove;
    }

    /**
     * Minimax algoritme met alpha-beta pruning
     */
    minimax(board, game, depth, alpha, beta, isMaximizing, aiColor) {
        this.nodesSearched++;

        // Base case: maximale diepte bereikt
        if (depth === 0) {
            return this.evaluateBoard(board, aiColor);
        }

        const currentColor = isMaximizing ? aiColor : (aiColor === 'white' ? 'black' : 'white');
        const moves = this.getAllPossibleMoves(board, currentColor, game);

        // Geen zetten beschikbaar
        if (moves.length === 0) {
            if (game.isInCheck(currentColor, board)) {
                // Schaakmat - hoe eerder hoe beter/slechter
                return isMaximizing ? (-100000 - depth * 100) : (100000 + depth * 100);
            } else {
                // Pat (gelijkspel)
                return 0;
            }
        }

        // OPTIMALISATIE: Sorteer zetten voor betere pruning
        if (depth > 1) {
            this.orderMoves(moves, board);
        }

        if (isMaximizing) {
            let maxEval = -Infinity;

            for (const move of moves) {
                const moveState = this.simulateMove(board, move);
                const eval_score = this.minimax(board, game, depth - 1, alpha, beta, false, aiColor);
                this.undoMove(board, move, moveState);

                maxEval = Math.max(maxEval, eval_score);
                alpha = Math.max(alpha, eval_score);

                // Alpha-beta pruning
                if (beta <= alpha) {
                    break;
                }
            }

            return maxEval;
        } else {
            let minEval = Infinity;

            for (const move of moves) {
                const moveState = this.simulateMove(board, move);
                const eval_score = this.minimax(board, game, depth - 1, alpha, beta, true, aiColor);
                this.undoMove(board, move, moveState);

                minEval = Math.min(minEval, eval_score);
                beta = Math.min(beta, eval_score);

                // Alpha-beta pruning
                if (beta <= alpha) {
                    break;
                }
            }

            return minEval;
        }
    }

    /**
     * Sorteer zetten voor betere alpha-beta pruning
     * (Captures eerst, dan centrum controle)
     */
    orderMoves(moves, board) {
        moves.sort((a, b) => {
            const targetA = board.getPiece(a.to.row, a.to.col);
            const targetB = board.getPiece(b.to.row, b.to.col);

            // Captures eerst
            const captureScoreA = targetA ? this.pieceValues[targetA.type] : 0;
            const captureScoreB = targetB ? this.pieceValues[targetB.type] : 0;

            if (captureScoreA !== captureScoreB) {
                return captureScoreB - captureScoreA;
            }

            // Dan centrum controle (rijen 3,4,5 en kolommen 3,4,5)
            const centerScoreA = this.getCenterScore(a.to.row, a.to.col);
            const centerScoreB = this.getCenterScore(b.to.row, b.to.col);

            return centerScoreB - centerScoreA;
        });
    }

    /**
     * Krijg centrum score voor een vakje
     */
    getCenterScore(row, col) {
        const centerRows = [3, 4];
        const centerCols = [3, 4];

        if (centerRows.includes(row) && centerCols.includes(col)) return 2;
        if ((row >= 2 && row <= 5) && (col >= 2 && col <= 5)) return 1;
        return 0;
    }

    /**
     * Evalueer de bordpositie
     */
    evaluateBoard(board, aiColor) {
        let score = 0;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (!piece) continue;

                let pieceValue = this.pieceValues[piece.type];

                // Voeg positie bonus toe
                if (piece.type === 'pawn') {
                    const bonusRow = piece.color === 'white' ? row : 7 - row;
                    pieceValue += this.pawnPositionBonus[bonusRow][col];
                } else if (piece.type === 'knight') {
                    pieceValue += this.knightPositionBonus[row][col];
                }

                // Tel op of af afhankelijk van kleur
                if (piece.color === aiColor) {
                    score += pieceValue;
                } else {
                    score -= pieceValue;
                }
            }
        }

        return score;
    }

    /**
     * Krijg alle mogelijke legale zetten voor een kleur
     */
    getAllPossibleMoves(board, color, game) {
        const moves = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (!piece || piece.color !== color) continue;

                const possibleMoves = piece.getPossibleMoves(row, col, board);

                // Filter illegale zetten
                for (const move of possibleMoves) {
                    // Valideer dat de zet binnen het bord blijft
                    if (move.row < 0 || move.row > 7 || move.col < 0 || move.col > 7) {
                        continue;
                    }

                    // Speciale check voor koning
                    if (piece.type === 'king') {
                        const tempPiece = board.getPiece(move.row, move.col);
                        board.setPiece(move.row, move.col, piece);
                        board.setPiece(row, col, null);

                        const underAttack = game.isSquareUnderAttack(move.row, move.col, color, board);

                        board.setPiece(row, col, piece);
                        board.setPiece(move.row, move.col, tempPiece);

                        if (underAttack) continue;
                    }

                    // Simuleer de zet om te checken of het legaal is
                    const originalPiece = board.getPiece(move.row, move.col);
                    board.setPiece(move.row, move.col, piece);
                    board.setPiece(row, col, null);

                    const wouldBeInCheck = game.isInCheck(color, board);

                    board.setPiece(row, col, piece);
                    board.setPiece(move.row, move.col, originalPiece);

                    if (!wouldBeInCheck) {
                        moves.push({
                            from: { row, col },
                            to: { row: move.row, col: move.col },
                            piece: piece
                        });
                    }
                }
            }
        }

        return moves;
    }

    /**
     * Simuleer een zet op het bord - retourneert state voor undo
     */
    simulateMove(board, move) {
        const capturedPiece = board.getPiece(move.to.row, move.to.col);
        const originalHasMoved = move.piece.hasMoved;

        board.setPiece(move.to.row, move.to.col, move.piece);
        board.setPiece(move.from.row, move.from.col, null);

        // Markeer als bewogen (voor pion/koning/toren regels)
        move.piece.hasMoved = true;

        return {
            capturedPiece: capturedPiece,
            originalHasMoved: originalHasMoved
        };
    }

    /**
     * Herstel een zet
     */
    undoMove(board, move, moveState) {
        board.setPiece(move.from.row, move.from.col, move.piece);
        board.setPiece(move.to.row, move.to.col, moveState.capturedPiece);

        // Herstel hasMoved status
        move.piece.hasMoved = moveState.originalHasMoved;
    }
}