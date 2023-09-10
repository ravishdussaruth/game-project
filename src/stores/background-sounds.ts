import { defineStore } from 'pinia';

export const useBackgroundSoundStore = defineStore('background-sound', {
  state: () => ({
    sounds: {
      menu: 'src/assets/sounds/menu.mp3',
      hover: 'src/assets/sounds/button.mp3',
      click: 'src/assets/sounds/button_click.mp3',
      mountain: 'src/assets/sounds/mountain.mp3',
      netherplace: 'src/assets/sounds/netherplace.mp3',
    },

    playing: []
  }),

  actions: {
    async playOnly(sound: string, volume = 0.05) {
      const beat = new Audio(this.sounds[sound]);
      beat.volume = volume;

      await beat.play();

      return beat;
    },

    async play(sound: string, volume = 0.05) {
      this.stopAll();
      const beat = await this.playOnly(sound, volume);

      this.addSoundToList(sound, beat);

      return beat;
    },

    addSoundToList(sound: name, audio: HTMLAudioElement) {
      const index = this.playing.findIndex(music => music.name === sound);

      if (index === -1) {
        this.playing.push({
          name: sound,
          audio
        });

        return;
      }

      this.playing.splice(index, 1);
    },

    async startMenuAudio() {
      this.play('menu', 0.05);
    },

    stopAll() {
      this.playing.forEach((music) => {
        music.audio.pause();
        music.audio.currentTime = 0;
      });
    },

    async buttonHover() {
      await this.playOnly('hover', 0.2, false);
    },

    async buttonClick() {
      await this.playOnly('click', 0.2, false);
    }
  }
});
