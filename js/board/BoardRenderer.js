
export class BoardRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
  
    render(board) {
        this.container.innerHTML = ''; // Maak container leeg
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                this.renderSquare(row, col, piece);
            }
        }

    }

    renderSquare(row, col, piece) {

        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
        square.dataset.row = row;
        square.dataset.col = col;

        if (piece) {
            const pieceImg = document.createElement('img');
            pieceImg.src = `assets/images/pieces/${piece.color}_${piece.type}.png`;
            pieceImg.classList.add('piece');
            square.appendChild(pieceImg);
        }

        this.container.appendChild(square);
    }


    highlightSelected(row, col) {
        const square = this.container.querySelector(`div.square[data-row='${row}'][data-col='${col}']`);
        if (square) {
            square.classList.add('selected');
        }   

    }


    showValidMoves(moves) {
        moves.forEach(move => {
            const square = this.container.querySelector(`div.square[data-row='${move.row}'][data-col='${move.col}']`);
            if (square) {
                square.classList.add('valid-move');
            }
        });
    }

    clearHighlights() {
        const highlightedSquares = this.container.querySelectorAll('.selected, .valid-move');
        highlightedSquares.forEach(square => {
            square.classList.remove('selected', 'valid-move');
        });
    }
}
