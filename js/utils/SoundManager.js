/**
 * SoundManager klasse - Beheert geluidseffecten
 * Verantwoordelijk voor: afspelen van geluiden tijdens het spel
 */

export class SoundManager {
    constructor() {
        this.sounds = {
            move: new Audio('assets/sounds/move.ogg')
        };

        // Preload de geluiden
        Object.values(this.sounds).forEach(sound => {
            sound.load();
        });
    }

    /**
     * Speel het zet geluid af
     */
    playMove() {
        this.playSound('move');
    }

    /**
     * Speel een specifiek geluid af
     */
    playSound(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            // Reset het geluid naar het begin als het al speelt
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.warn('Kon geluid niet afspelen:', error);
            });
        }
    }

    /**
     * Zet volume in voor alle geluiden (0.0 - 1.0)
     */
    setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = Math.max(0, Math.min(1, volume));
        });
    }

    /**
     * Zet geluiden aan of uit
     */
    mute(shouldMute) {
        Object.values(this.sounds).forEach(sound => {
            sound.muted = shouldMute;
        });
    }
}
