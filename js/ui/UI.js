/**
 * UI klasse - Beheert de gebruikersinterface
 * Verantwoordelijk voor: event handling, updates, meldingen
 */

export class UI {
    constructor() {
        this.playerInfoElement = document.getElementById('player-info');
        this.moveHistoryElement = document.getElementById('move-history');
        this.setupEventListeners();
    }

    /**
     * Stel alle event listeners in
     */
    setupEventListeners() {
        // Event listeners worden nu in GameController geregeld
    }

    /**
     * Update de speler informatie
     */
    updatePlayerInfo(currentPlayer, isCheck = false) {
        const playerName = currentPlayer === 'white' ? 'Wit' : 'Zwart';
        const checkText = isCheck ? ' - <span style="color: #ff6b6b;">SCHAAK!</span>' : '';

        this.playerInfoElement.innerHTML = `
            <div style="background: rgba(255, 214, 7, 0.1); border: 2px solid #ffd607; border-radius: 10px; padding: 15px; text-align: center;">
                <h3 style="color: #ffd607; margin: 0 0 10px 0;">Aan de beurt:</h3>
                <p style="font-size: 1.5rem; margin: 0; color: #fff;">
                    ${playerName}${checkText}
                </p>
            </div>
        `;
    }

    /**
     * Update de zet geschiedenis
     */
    updateMoveHistory(moves) {
        if (moves.length === 0) {
            this.moveHistoryElement.innerHTML = '<p style="color: #888;">Nog geen zetten</p>';
            return;
        }

        const historyHTML = moves.map((move, index) => {
            return `<div style="padding: 5px; border-bottom: 1px solid rgba(255, 214, 7, 0.2);">
                ${index + 1}. ${move.from} → ${move.to}
            </div>`;
        }).join('');

        this.moveHistoryElement.innerHTML = `
            <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 214, 7, 0.3); border-radius: 8px; padding: 10px; max-height: 200px; overflow-y: auto;">
                <h4 style="color: #ffd607; margin: 0 0 10px 0;">Zetten</h4>
                ${historyHTML}
            </div>
        `;
    }

    /**
     * Toon een melding
     */
    showMessage(message, type = 'info') {
        const colors = {
            info: '#4a9eff',
            success: '#4ade80',
            warning: '#fbbf24',
            error: '#ef4444'
        };

        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: #000;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        messageDiv.textContent = message;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    /**
     * Toon game over scherm
     */
    showGameOver(winner, reason) {
        const winnerText = winner === 'draw' ? 'Remise!' : `${winner === 'white' ? 'Wit' : 'Zwart'} wint!`;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>🏆 Spel Afgelopen!</h2>
                </div>
                <div class="modal-body" style="text-align: center;">
                    <h3 style="font-size: 2.5rem; color: #ffd607; margin: 20px 0;">${winnerText}</h3>
                    <p style="font-size: 1.2rem; margin-bottom: 30px;">${reason}</p>
                    <button id="btn-new-game-modal" class="control-btn" style="width: 100%;">
                        Nieuw Spel
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('btn-new-game-modal').addEventListener('click', () => {
            modal.remove();
            document.getElementById('btn-new-game').click();
        });
    }
}
