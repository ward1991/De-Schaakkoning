/**
 * Controls klasse - Beheert de spelknoppen
 * Verantwoordelijk voor: nieuw spel, opgeven, remise aanbieden, etc.
 */

export class Controls {
    constructor(gameContainer) {
        this.container = gameContainer;
    }

    /**
     * Render de control knoppen
     */
    render() {
        // TODO: Maak knoppen voor spelbesturing
    }

    /**
     * Nieuw spel knop handler
     */
    onNewGame(callback) {
        // TODO: Koppel callback aan nieuw spel knop
    }

    /**
     * Opgeven knop handler
     */
    onResign(callback) {
        // TODO: Koppel callback aan opgeven knop
    }

    /**
     * Zet ongedaan maken handler
     */
    onUndo(callback) {
        // TODO: Koppel callback aan undo knop
    }
}
